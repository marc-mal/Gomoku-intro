#!/usr/bin/env node
/**
 * intro 站点截图脚本。
 *
 * 前置：三端都在跑（server 3000 / player 5173 / admin 5666），
 * 截图直接写进 `intro/public/shots/*.jpg`。
 *
 * 用法：
 *   node intro/scripts/capture.mjs
 *
 * playwright **不是项目依赖**（沿用 scripts/smoke-*.mjs 的解析顺序）：
 * ① PLAYWRIGHT_DIR → ② 项目 node_modules → ③ `%LOCALAPPDATA%/npm-cache/_npx/<hash>/node_modules`。
 */
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SHOT_DIR = join(ROOT, 'public', 'shots');

const PLAYER_URL = process.env.PLAYER_URL ?? 'http://localhost:5173';
const ADMIN_URL = process.env.ADMIN_URL ?? 'http://localhost:5666';
const API_URL = process.env.API_URL ?? 'http://localhost:3000';
const ADMIN_USER = process.env.ADMIN_USER ?? 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123';

const PLAYER_VIEWPORT = { width: 1440, height: 900 };
const ADMIN_VIEWPORT = { width: 1440, height: 900 };

/** 玩家端截图清单（文件名与站点 `src/data/content.js` 对应）。 */
const PLAYER_SHOTS = [
  ['player-home', '主厅'],
  ['player-ai-options', '人机难度'],
  ['player-ai-game', '人机对局'],
  ['player-local-game', '本地同屏'],
  ['player-online-waiting', '好友房间'],
  ['player-online-game', '联机对局'],
  ['player-result', '结算'],
  ['player-profile', '棋手名片'],
  ['player-daily', '每日一题'],
  ['player-wardrobe', '称号衣柜'],
];

/** 后台页面：路径 → 截图文件名（标题与 `scripts/smoke-admin.mjs` 的 PAGES 一致）。 */
const ADMIN_PAGES = [
  ['/overview', 'admin-overview'],
  ['/content/puzzles', 'admin-puzzles'],
  ['/content/phrases', 'admin-phrases'],
  ['/ops/users', 'admin-users'],
  ['/ops/rooms', 'admin-rooms'],
  ['/ops/ranks', 'admin-ranks'],
  ['/ops/announcements', 'admin-announcements'],
  ['/ops/rewards', 'admin-rewards'],
  ['/ops/coin-codes', 'admin-coin-codes'],
  ['/ops/withdrawal-methods', 'admin-withdrawal-methods'],
  ['/ops/withdrawal-orders', 'admin-withdrawal-orders'],
  ['/system/accounts', 'admin-accounts'],
  ['/system/roles', 'admin-roles'],
  ['/system/info', 'admin-info'],
  ['/system/settings', 'admin-settings'],
  ['/system/tasks', 'admin-tasks'],
  ['/system/data', 'admin-data'],
  ['/system/telegram', 'admin-telegram'],
  ['/system/audit', 'admin-audit'],
];

function resolvePlaywright() {
  const bases = [];
  if (process.env.PLAYWRIGHT_DIR) bases.push(process.env.PLAYWRIGHT_DIR);
  bases.push(ROOT);

  const npxCache = join(process.env.LOCALAPPDATA ?? '', 'npm-cache', '_npx');
  if (existsSync(npxCache)) {
    for (const entry of readdirSync(npxCache)) {
      const modules = join(npxCache, entry, 'node_modules');
      if (existsSync(join(modules, 'playwright'))) bases.push(modules);
    }
  }

  for (const base of bases) {
    try {
      return createRequire(join(base, 'noop.js'))('playwright');
    } catch {
      // 换下一个候选
    }
  }
  return null;
}

async function isUp(url) {
  try {
    await fetch(url, { signal: AbortSignal.timeout(3000) });
    return true;
  } catch {
    return false;
  }
}

async function apiJson(path, { method = 'GET', token = '', body } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token === '' ? {} : { Authorization: `Bearer ${token}` }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${method} ${path} -> ${response.status}`);
  return data;
}

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

const playwright = resolvePlaywright();
if (playwright === null) {
  fail(
    '找不到 playwright。先跑一次 `npx playwright@latest --version` 把它装进 npx 缓存，' +
      '或用 PLAYWRIGHT_DIR 指向已有安装目录。',
  );
}

for (const [label, url] of [
  ['server', `${API_URL}/api/health`],
  ['player', PLAYER_URL],
  ['admin', ADMIN_URL],
]) {
  if (!(await isUp(url))) fail(`${label} 没起来（${url} 连不通）`);
}

mkdirSync(SHOT_DIR, { recursive: true });

const { chromium } = playwright;
const browser = await chromium.launch();

/** 统一截图规格：JPEG / 质量 85。`fullPage` 只给需要滚动到底的后台页面。 */
async function shot(page, name, { fullPage = true } = {}) {
  await page.screenshot({ path: join(SHOT_DIR, `${name}.jpg`), type: 'jpeg', quality: 85, fullPage });
  console.log(`  ✓ ${name}.jpg`);
}

/** 冻结过渡动画 —— 截图只保留稳定终态。 */
async function freeze(page) {
  await page.addStyleTag({
    content: '*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}',
  });
}

async function waitForFonts(page) {
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());
}

/** 玩家端：点击棋盘格（在线局单击即落子）。 */
async function clickCell(page, index) {
  await page.locator(`.cell[data-index="${index}"]`).click({ force: true });
}

/** 玩家端：双人同屏需要「双击同一位置」确认。 */
async function dropLocal(page, index) {
  await clickCell(page, index);
  await page.waitForTimeout(180);
  await clickCell(page, index);
  await page.waitForTimeout(260);
}

/** 等轮到玩家（在线/AI 局）。 */
async function waitMyTurn(page) {
  await page
    .waitForFunction(() => document.querySelector('#turn-banner')?.textContent?.includes('轮到你'), null, {
      timeout: 8000,
    })
    .catch(() => {});
}

/**
 * 双方准备 → 开局。`ready` 是幂等动作，但点中「已准备」的禁用按钮不会发请求；
 * 这里按房间真实状态补点，避免因上一步座位动作未结束而漏掉一次准备。
 */
async function ensurePlaying(pageA, pageB, tokenA, roomId) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const { room } = await apiJson(`/api/rooms/${roomId}`, { token: tokenA });
    if (room.status === 'playing') return;
    for (const page of [pageA, pageB]) {
      const ready = page.locator('[data-ready]');
      if ((await ready.count()) === 0) continue;
      if (await ready.isDisabled()) continue;
      if ((await ready.innerText()).trim() !== '准备') continue;
      await ready.click({ force: true });
      await page.waitForTimeout(800);
    }
  }
  const { room } = await apiJson(`/api/rooms/${roomId}`, { token: tokenA });
  if (room.status !== 'playing') throw new Error(`双方准备后仍是 ${room.status}`);
}

async function playerShots(aToken, bToken) {
  console.log('玩家端：');

  const ctx = await browser.newContext({ viewport: PLAYER_VIEWPORT });
  await ctx.addInitScript(({ token }) => localStorage.setItem('gomoku-session', token), { token: aToken });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`[console] ${message.text()}`);
  });

  // 1. 主厅
  await page.goto(PLAYER_URL, { waitUntil: 'networkidle' });
  await freeze(page);
  await waitForFonts(page);
  await page.waitForTimeout(600);
  await shot(page, 'player-home', { fullPage: false });

  // 2. 人机难度
  await page.locator('input[value="ai"]').check({ force: true });
  await page.waitForTimeout(500);
  await shot(page, 'player-ai-options', { fullPage: false });

  // 3. 人机对局（服务端建真房间）
  await page.locator('#start-game').click({ force: true });
  await page.waitForSelector('.cell', { timeout: 10000 });
  await page.waitForTimeout(1400);
  for (const index of [112, 96, 128]) {
    await waitMyTurn(page);
    await clickCell(page, index);
    await page.waitForTimeout(1100);
  }
  await shot(page, 'player-ai-game', { fullPage: false });

  // 4. 结算（认输 → 自动打开战报）
  await page.locator('#more').click();
  await page.waitForTimeout(500);
  await page.locator('[data-resign]').click();
  await page.waitForTimeout(400);
  await page.locator('[data-confirm="resign"]').click();
  // 战报弹窗在结果产生 2400ms 后打开（onlineSession.showResult 的定时器）。
  await page.waitForTimeout(3400);
  await shot(page, 'player-result', { fullPage: false });

  // 5. 本地同屏
  await page.goto(PLAYER_URL, { waitUntil: 'networkidle' });
  await page.locator('#start-game').click({ force: true });
  await page.waitForSelector('.cell');
  for (const index of [112, 113, 97, 98]) await dropLocal(page, index);
  await page.waitForTimeout(400);
  await shot(page, 'player-local-game', { fullPage: false });

  // 6. 称号衣柜（本地局 → #more → 衣柜）
  await page.locator('#more').click();
  await page.waitForTimeout(500);
  await page.locator('[data-social="wardrobe"]').click();
  await page.waitForTimeout(900);
  await shot(page, 'player-wardrobe', { fullPage: false });
  await page.keyboard.press('Escape');

  // 7. 棋手名片
  await page.goto(PLAYER_URL, { waitUntil: 'networkidle' });
  await page.locator('[data-social="profile"]').click();
  await page.waitForTimeout(1000);
  await shot(page, 'player-profile', { fullPage: false });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // 8. 每日一题
  await page.locator('[data-social="daily"]').click();
  await page.waitForTimeout(1100);
  await shot(page, 'player-daily', { fullPage: false });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // 9. 好友房间（A 建房 → A 落座 → B 落座 → 双方未准备）
  await page.goto(PLAYER_URL, { waitUntil: 'networkidle' });
  await page.locator('input[value="friend"]').check({ force: true });
  await page.waitForTimeout(400);
  await page.locator('#start-game').click({ force: true });
  await page.waitForTimeout(3200);
  const roomId = new URL(page.url()).searchParams.get('room') ?? '';
  if (roomId === '') throw new Error('好友房间建房失败（地址栏没有 ?room=）');

  await page.locator('[data-seat="1"]').click({ force: true });
  await page.waitForTimeout(1200);

  const bCtx = await browser.newContext({ viewport: PLAYER_VIEWPORT });
  await bCtx.addInitScript(({ token }) => localStorage.setItem('gomoku-session', token), { token: bToken });
  const bPage = await bCtx.newPage();
  await bPage.goto(`${PLAYER_URL}/?room=${encodeURIComponent(roomId)}`, { waitUntil: 'networkidle' });
  await freeze(bPage);
  await bPage.waitForSelector('[data-seat="2"]', { timeout: 8000 });
  await bPage.locator('[data-seat="2"]').click({ force: true });
  await bPage.waitForTimeout(1400);
  await page.waitForTimeout(800);
  await shot(page, 'player-online-waiting', { fullPage: false });

  // 10. 联机对局（双方准备 → 交替落子）
  await ensurePlaying(page, bPage, aToken, roomId);
  await page.waitForFunction(() => document.querySelector('#turn-banner')?.textContent?.includes('行棋'), null, {
    timeout: 10000,
  });
  await clickCell(page, 112);
  await page.waitForTimeout(1000);
  await bPage.locator('.cell[data-index="113"]').click({ force: true });
  await page.waitForTimeout(1000);
  await clickCell(page, 96);
  await page.waitForTimeout(1000);
  await bPage.locator('.cell[data-index="97"]').click({ force: true });
  await page.waitForTimeout(900);
  await shot(page, 'player-online-game', { fullPage: false });

  await bCtx.close();
  await ctx.close();

  if (errors.length > 0) console.warn(`  ⚠ 玩家端记录到 ${errors.length} 条页面异常（截图仍保留）`);
}

async function adminShots() {
  console.log('管理后台：');
  const ctx = await browser.newContext({ viewport: ADMIN_VIEWPORT });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`[console] ${message.text()}`);
  });

  await page.goto(`${ADMIN_URL}/auth/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
  await freeze(page);
  await waitForFonts(page);
  await shot(page, 'admin-login', { fullPage: false });

  await page.fill('input[name=username]', ADMIN_USER);
  await page.fill('input[name=password]', ADMIN_PASSWORD);

  // 滑块验证：拖到轨道右端（同 scripts/smoke-admin.mjs）。
  const slider = page.locator('div.cursor-move').first();
  if ((await slider.count()) === 0) throw new Error('登录页没找到滑块（div.cursor-move）');
  const box = await slider.boundingBox();
  const track = await slider.evaluate((el) => el.parentElement.getBoundingClientRect().width);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + track, box.y + box.height / 2, { steps: 25 });
  await page.mouse.up();
  await page.waitForTimeout(900);

  await page.evaluate(() => {
    const button = [...document.querySelectorAll('button')].find((el) => (el.textContent ?? '').trim() === '登录');
    if (button) button.click();
  });
  await page.waitForTimeout(7000);
  if (page.url().includes('/auth/login')) throw new Error(`后台登录失败，仍停在 ${page.url()}`);

  for (const [path, name] of ADMIN_PAGES) {
    await page.goto(`${ADMIN_URL}${path}`, { waitUntil: 'domcontentloaded' });
    await freeze(page);
    await page.waitForTimeout(2600);
    await shot(page, name);
  }

  // 个人中心（不在侧边栏，必须单独走一次）
  await page.goto(`${ADMIN_URL}/profile`, { waitUntil: 'domcontentloaded' });
  await freeze(page);
  await page.waitForTimeout(2000);
  await shot(page, 'admin-profile', { fullPage: false });

  if (errors.length > 0) console.warn(`  ⚠ 后台记录到 ${errors.length} 条页面异常（截图仍保留）`);
  await ctx.close();
}

try {
  const a = await apiJson('/api/session', { method: 'POST', body: {} });
  const b = await apiJson('/api/session', { method: 'POST', body: {} });

  await playerShots(a.token, b.token);
  await adminShots();

  const missing = [...PLAYER_SHOTS.map(([name]) => name), ...ADMIN_PAGES.map(([, name]) => name), 'admin-login', 'admin-profile']
    .filter((name) => !existsSync(join(SHOT_DIR, `${name}.jpg`)));
  if (missing.length > 0) throw new Error(`缺截图：${missing.join(', ')}`);

  console.log(`\n✓ 截图完成（玩家 ${PLAYER_SHOTS.length} 张 / 后台 ${ADMIN_PAGES.length + 2} 张）`);
} catch (error) {
  console.error(`\n✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
} finally {
  await browser.close().catch(() => {});
}
