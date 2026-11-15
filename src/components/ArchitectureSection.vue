<script setup>
const apps = [
  {
    name: '玩家端',
    stack: 'Vue 3 · Pinia · Vite',
    points: ['棋盘交互与三种对局模式', '离线 AI 在 Web Worker 中运行', '棋手名片 / 每日一题 / 衣柜'],
  },
  {
    name: '服务端',
    stack: 'NestJS 12 · REST + WS',
    points: ['权威房间状态机与计时', '棋谱 / 社交 / 后台接口', 'Telegram Bot 与深链'],
  },
  {
    name: '管理后台',
    stack: 'vue-vben-admin · Ant Design Vue',
    points: ['运营页面与权限控制', '审计日志与站点配置', '提现审核与数据清理'],
  },
];

const storage = [
  { name: 'MySQL', desc: '棋谱 · 社交 · 后台数据' },
  { name: 'Redis', desc: '房间态 · 跨进程广播（可选）' },
  { name: 'Memory', desc: '单机默认 · 测试无需外部存储' },
];
</script>

<template>
  <section id="stack" class="section">
    <div class="container">
      <div class="paper-panel">
        <header class="section-head">
          <p class="eyebrow">架构</p>
          <h2>一套内核，三端复用。</h2>
          <p class="lede">
            玩家端不重写规则，服务端不信任客户端棋盘；三端通过明确的 HTTP / WebSocket 契约连接。
          </p>
        </header>

        <div class="arch">
          <div class="arch-row">
            <article v-for="(app, index) in apps" :key="app.name" class="arch-card" :class="{ 'is-server': index === 1 }">
              <span class="arch-step">0{{ index + 1 }}</span>
              <h3>{{ app.name }}</h3>
              <small>{{ app.stack }}</small>
              <ul>
                <li v-for="point in app.points" :key="point">{{ point }}</li>
              </ul>
            </article>

            <span class="arch-link arch-link--a" aria-hidden="true">
              <i></i>
              <em>HTTP · WS</em>
            </span>
            <span class="arch-link arch-link--b" aria-hidden="true">
              <i></i>
              <em>REST</em>
            </span>
          </div>

          <div class="arch-core">
            <div class="core-mark" aria-hidden="true">核</div>
            <div>
              <h3>@gomoku/core</h3>
              <p>棋盘 · 胜负 · 三三禁手 · 回放 · AI · 协议常量</p>
            </div>
            <span class="core-note">玩家端与服务端共用同一份规则</span>
          </div>

          <div class="arch-storage">
            <span class="storage-label">服务端持久化</span>
            <div v-for="item in storage" :key="item.name" class="storage-card">
              <strong>{{ item.name }}</strong>
              <small>{{ item.desc }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arch {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.arch-row {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 52px;
}

.arch-card {
  position: relative;
  padding: 22px 22px 20px;
  background: rgb(255 255 255 / 46%);
  border: 1px solid rgb(74 52 35 / 16%);
  border-radius: 14px;
}

.arch-card.is-server {
  border-color: rgb(179 58 45 / 40%);
  box-shadow: 0 14px 30px rgb(179 58 45 / 10%);
}

.arch-step {
  font-family: var(--serif);
  font-size: 11px;
  color: var(--vermilion);
  letter-spacing: 0.18em;
}

.arch-card h3 {
  margin-top: 6px;
  font-size: 22px;
  color: var(--text-dark);
}

.arch-card small {
  display: block;
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--text-dark-muted);
  letter-spacing: 0.02em;
}

.arch-card ul {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 14px 0 0;
  padding: 0;
  font-size: 12.5px;
  color: var(--text-dark-muted);
  list-style: none;
}

.arch-card li::before {
  margin-right: 8px;
  color: var(--vermilion);
  content: '·';
}

.arch-link {
  position: absolute;
  top: 50%;
  left: 33.33%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  width: 52px;
  font-size: 10px;
  color: var(--text-dark-muted);
  transform: translate(-50%, -50%);
}

.arch-link--b {
  left: 66.66%;
}

.arch-link i {
  position: relative;
  width: 34px;
  height: 1px;
  background: rgb(74 52 35 / 40%);
}

.arch-link i::before,
.arch-link i::after {
  position: absolute;
  top: -3px;
  width: 6px;
  height: 6px;
  content: '';
  border-top: 1px solid rgb(74 52 35 / 60%);
  border-right: 1px solid rgb(74 52 35 / 60%);
}

.arch-link i::before {
  left: 0;
  transform: rotate(-135deg);
}

.arch-link i::after {
  right: 0;
  transform: rotate(45deg);
}

.arch-link em {
  font-style: normal;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.arch-core {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 20px 24px;
  background:
    linear-gradient(100deg, rgb(179 58 45 / 10%), transparent 42%),
    #f6edda;
  border: 1px solid rgb(179 58 45 / 26%);
  border-radius: 14px;
}

.core-mark {
  display: grid;
  width: 42px;
  height: 42px;
  font-family: var(--serif);
  font-size: 20px;
  color: var(--paper);
  flex-shrink: 0;
  place-items: center;
  background: var(--vermilion);
  border-radius: 7px;
  transform: rotate(-3deg);
}

.arch-core h3 {
  font-size: 19px;
  color: var(--text-dark);
}

.arch-core p {
  margin-top: 3px;
  font-size: 12.5px;
  color: var(--text-dark-muted);
}

.core-note {
  margin-left: auto;
  font-size: 12px;
  color: var(--vermilion);
  text-align: right;
}

.arch-storage {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.storage-label {
  margin-right: 6px;
  font-family: var(--serif);
  font-size: 12px;
  color: var(--text-dark-muted);
  letter-spacing: 0.12em;
}

.storage-card {
  display: flex;
  gap: 8px;
  align-items: baseline;
  padding: 7px 14px;
  background: rgb(255 255 255 / 42%);
  border: 1px solid rgb(74 52 35 / 14%);
  border-radius: 999px;
}

.storage-card strong {
  font-family: var(--serif);
  font-size: 13px;
  color: var(--text-dark);
}

.storage-card small {
  font-size: 11.5px;
  color: var(--text-dark-muted);
}

@media (max-width: 860px) {
  .arch-row {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .arch-link {
    display: none;
  }

  .arch-core {
    align-items: flex-start;
  }

  .core-note {
    display: none;
  }
}
</style>
