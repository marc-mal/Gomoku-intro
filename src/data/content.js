/**
 * 站点文案与截图清单的唯一来源。
 *
 * 所有事实来自仓库文档与真实运行截图；不确定的数字不写。
 */
export const stats = [
  { value: '3', unit: '端', label: '玩家端 · 服务端 · 管理后台' },
  { value: '15×15', unit: '', label: '连珠棋盘' },
  { value: '3', unit: '档', label: '人机难度' },
  { value: '26', unit: '项', label: '后台权限点' },
];

export const features = [
  {
    seal: '局',
    title: '双人同屏',
    desc: '一部设备，两人轮流落子。黑方在上、白方在下，信息朝向各自玩家；当前棋局保存在这台设备。',
    tags: ['离线', '免登录', '本机存档'],
  },
  {
    seal: '机',
    title: '人机对战',
    desc: '简单、中等、终极三档难度，你执黑先行、电脑执白。终极难度在 Web Worker 里多步推演，界面始终不卡。',
    tags: ['三档难度', 'Web Worker', '真房间'],
  },
  {
    seal: '友',
    title: '好友联机',
    desc: '10 位房间号或 Telegram 深链进房，WebSocket 实时同步；每方 10 分钟、每步 60 秒，支持观战与语音喝彩。',
    tags: ['WebSocket', '10 位房间号', '60 秒一步'],
  },
  {
    seal: '谱',
    title: '服务端权威',
    desc: '落子只提交索引，棋盘由服务端按棋谱重建。悔棋、求和、认输、超时判负都走同一套协议，棋谱落库可回看。',
    tags: ['服务端权威', '棋谱落库', '超时判负'],
  },
  {
    seal: '名',
    title: '棋手社交',
    desc: '棋手名片、段位星数、每日一题、称号衣柜、排行榜与成就；终局生成战报 PNG，可直接分享给好友。',
    tags: ['段位', '每日一题', '战报 PNG'],
  },
  {
    seal: '营',
    title: '运营后台',
    desc: '用户、房间、题库、台词、段位、公告、发奖、棋币兑换码、提现、角色权限、站点配置与审计日志。',
    tags: ['RBAC', '26 权限点', '审计'],
  },
  {
    seal: '信',
    title: 'Telegram 群对战',
    desc: '群里发送 /pk 直接建桌，Bot 用发起人的 Telegram 身份开局；群友点「加入对局」进同一张桌，落座、观战、喝彩。',
    tags: ['/pk 建房', 'Mini App 深链', '群友围观'],
  },
  {
    seal: '币',
    title: '棋币与押注',
    desc: '兑换码获取棋币，押注局托管押金，提现走后台审核；押注与提现都能在站点配置里一键关闭。',
    tags: ['兑换码', '押金托管', '可关闭'],
  },
];

/** 功能全景 —— 按使用路径分四组，覆盖玩家端、社交、后台与平台集成。 */
export const featureGroups = [
  {
    seal: '弈',
    title: '对局',
    items: [
      '双人同屏：一部设备轮流落子',
      '人机三档难度：简单 / 中等 / 终极',
      '好友联机：10 位房间号与深链回房',
      '观战与 WebSocket 实时同步',
      '计时与超时判负：每方 10 分钟、每步 60 秒',
      '悔棋 / 求和 / 认输 / 离开座位',
      '棋谱回看与导出',
      '棋盘主题与棋子皮肤',
    ],
  },
  {
    seal: '友',
    title: '社交与成长',
    items: [
      '棋手名片：胜局 / 胜率 / 最高连胜 / 棋币',
      '段位星数与排行榜',
      '每日一题',
      '称号衣柜与头像框',
      '成就册',
      '同桌比分与历史交手',
      '本桌擂台与观众喝彩',
      '战报 PNG 生成与分享',
    ],
  },
  {
    seal: '营',
    title: '运营后台',
    items: [
      '用户与房间管理',
      '题库与台词管理',
      '段位调整与批量发奖',
      '公告管理',
      '棋币兑换码与提现审核',
      '管理员、角色与 26 个权限点',
      '站点配置与定时任务',
      '数据清理与审计日志',
    ],
  },
  {
    seal: '联',
    title: '平台与集成',
    items: [
      'Telegram 群对战：/pk 群内建房',
      'Bot 命令与「加入对局」按钮',
      'Mini App 深链：startapp=room_{id}',
      '群友观战与语音喝彩',
      '棋币钱包与押注托管',
      'MySQL / Redis 双存储',
      '内存实现：测试无需外部存储',
      'REST + WebSocket 协议',
      '服务端权威状态机',
    ],
  },
];

/**
 * 源码购买联系方式 —— **预留位置**。
 *
 * 把真实 Telegram 账号链接填到 `url`（例如 `https://t.me/your_name`），
 * 把账号填到 `handle`；`url` 为空时页面会显示「链接待填写」。
 */
export const telegramContact = {
  eyebrow: '源码购买',
  title: '购买源码，请通过 Telegram 联系。',
  desc: '本页展示的是完整项目源码，包含玩家端、服务端与管理后台。添加 Telegram 账号即可咨询报价、演示与交付方式。',
  handle: '@marc_mal',
  url: 'https://t.me/marc_mal',
  pending: '链接待填写',
};

/** Telegram 群对战的三步流程（页面「群对战」区块用）。 */
export const telegramSteps = [
  {
    title: '群里发送 /pk',
    desc: 'Bot 以发起人的 Telegram 身份建一张待开局的棋桌；同一个群 30 分钟内复用未开局的房间。',
    code: '/pk',
  },
  {
    title: '群友点「加入对局」',
    desc: 'Bot 回复带按钮的消息，按钮通过 Mini App 深链把人带到同一张桌，不需要再手输房间号。',
    code: 'startapp=room_{id}',
  },
  {
    title: '落座 · 开局 · 围观',
    desc: '双方落座并准备后开局；群友可实时观战、语音与喝彩，终局生成战报 PNG。',
    code: '',
  },
];

export const apps = [
  {
    name: '@gomoku/core',
    role: '规则内核',
    desc: '棋盘、胜负判定、三三禁手、回放、AI 与协议常量。玩家端与服务端共用同一份规则，核心逻辑只写一次。',
    stack: ['TypeScript', '纯函数', '协议单一来源'],
  },
  {
    name: 'apps/player',
    role: '玩家端',
    desc: '本地同屏、人机对战、好友联机三种模式；Pinia 管理棋局与社交状态，AI 在 Web Worker 中运行。',
    stack: ['Vue 3', 'Pinia', 'Vite'],
  },
  {
    name: 'apps/server',
    role: '服务端',
    desc: 'NestJS 提供 REST 与 WebSocket，房间状态机、社交、榜单、后台接口与 Telegram Bot 都在这里。',
    stack: ['NestJS 12', 'REST + WS', 'MySQL / Redis'],
  },
  {
    name: 'apps/admin',
    role: '管理后台',
    desc: '基于 vue-vben-admin 与 Ant Design Vue；RBAC、审计、站点配置、数据清理、提现审核逐页落地。',
    stack: ['vue-vben-admin', 'Ant Design Vue', 'RBAC'],
  },
];

export const stack = [
  'Node.js 20+',
  'pnpm',
  'NestJS 12',
  'Vue 3',
  'Pinia',
  'Vite 6',
  'WebSocket',
  'Web Worker',
  'MySQL',
  'Redis',
  '@napi-rs/canvas',
];

export const shotGroups = [
  {
    id: 'player',
    label: '玩家端',
    note: '10 张 · 本地真实运行',
    shots: [
      { file: 'player-home', title: '主厅', desc: '双人同屏 / 挑战电脑 / 好友对战，三种模式与规则选择。' },
      { file: 'player-ai-options', title: '人机难度', desc: '简单、中等、终极三档，按自己的节奏练手。' },
      { file: 'player-ai-game', title: '人机对局', desc: '服务端建真房间，落子、计时与电脑应手实时同步。' },
      { file: 'player-local-game', title: '双人同屏', desc: '上下分屏、黑先白后，一部设备两人对弈。' },
      { file: 'player-online-waiting', title: '好友房间', desc: '双方落座，等待准备；房主可把邀请发到 Telegram。' },
      { file: 'player-online-game', title: '联机对局', desc: '黑方行棋，双方棋盘与计时保持同步。' },
      { file: 'player-result', title: '本局战报', desc: '认输结束、胜负判定与再来一局，都在一张结算卡里。' },
      { file: 'player-profile', title: '棋手名片', desc: '胜局、胜率、最高连胜与棋币余额。' },
      { file: 'player-daily', title: '每日一题', desc: '每日一手成五的棋题，可在棋盘上直接作答。' },
      { file: 'player-wardrobe', title: '称号衣柜', desc: '头像框、佩戴称号与成就册。' },
    ],
  },
  {
    id: 'admin',
    label: '管理后台',
    note: '21 张 · 登录后逐页',
    shots: [
      { file: 'admin-login', title: '登录', desc: '账号密码 + 滑块验证，版权文案来自站点配置。' },
      { file: 'admin-overview', title: '概览', desc: '注册用户、封禁、活跃房间、排位局数与段位榜。' },
      { file: 'admin-puzzles', title: '题库管理', desc: '每日一题的增删改查。' },
      { file: 'admin-phrases', title: '台词管理', desc: '语音台词与音频资源。' },
      { file: 'admin-users', title: '用户管理', desc: '封禁、解封与棋币余额调整。' },
      { file: 'admin-rooms', title: '房间管理', desc: '在线房间总览与解散。' },
      { file: 'admin-ranks', title: '段位榜管理', desc: '强制调整段位，必留审计。' },
      { file: 'admin-announcements', title: '公告管理', desc: '公告的发布与维护。' },
      { file: 'admin-rewards', title: '发奖管理', desc: '批量加星与授予成就。' },
      { file: 'admin-coin-codes', title: '棋币兑换码', desc: '生成、查看与作废兑换码。' },
      { file: 'admin-withdrawal-methods', title: '提现方式', desc: '币种、汇率、限额与日配额。' },
      { file: 'admin-withdrawal-orders', title: '提现订单', desc: '审核通过或驳回，理由必填。' },
      { file: 'admin-accounts', title: '管理员', desc: '后台账号与角色分配。' },
      { file: 'admin-roles', title: '角色权限', desc: '权限点组合，内置角色受保护。' },
      { file: 'admin-info', title: '系统信息', desc: '运行时健康与脱敏后的配置，只读。' },
      { file: 'admin-settings', title: '站点配置', desc: '版权、押注档位与提现开关。' },
      { file: 'admin-tasks', title: '定时任务', desc: '运行记录与手动触发。' },
      { file: 'admin-data', title: '数据清理', desc: '白名单表清空，不可逆，需确认串。' },
      { file: 'admin-telegram', title: 'Telegram 机器人', desc: 'Token、用户名、Mini App 与代理配置。' },
      { file: 'admin-audit', title: '审计日志', desc: '谁在什么时候改了什么。' },
      { file: 'admin-profile', title: '个人中心', desc: '查看身份与修改本人密码。' },
    ],
  },
];

export const commands = {
  build: `# 安装依赖
pnpm install

# core 与服务端是编译后运行的，改完要重新构建
pnpm --filter @gomoku/core build
pnpm --filter @gomoku/server build`,
  run: `# 三个终端分别启动
cd apps/server && node dist/main.js   # :3000
cd apps/player && npx vite            # :5173
cd apps/admin && pnpm dev:antd        # :5666`,
  env: `# apps/server/.env（必需）
SESSION_SECRET=change-me
PORT=3000

# 可选：持久化与多进程
MYSQL_URL=mysql://root:密码@127.0.0.1:3306/gomoku
REDIS_URL=redis://127.0.0.1:6379`,
};
