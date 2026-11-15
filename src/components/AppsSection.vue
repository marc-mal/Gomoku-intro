<script setup>
import { apps, stack } from '../data/content';
</script>

<template>
  <section id="apps" class="section section--tight">
    <div class="container">
      <header class="section-head section-head--dark">
        <p class="eyebrow">四个包，一条链路</p>
        <h2>规则只写一次，三端各自专注。</h2>
        <p class="lede">
          规则内核与协议常量集中在 <code>@gomoku/core</code>；玩家端负责界面与交互，
          服务端负责权威状态与持久化，管理后台负责运营。
        </p>
      </header>

      <div class="app-grid">
        <article
          v-for="(app, index) in apps"
          :key="app.name"
          v-reveal="index * 60"
          class="app-card"
          :class="{ 'app-card--core': index === 0 }"
        >
          <header class="app-head">
            <span class="app-index">0{{ index + 1 }}</span>
            <span class="app-role">{{ app.role }}</span>
          </header>
          <h3>{{ app.name }}</h3>
          <p>{{ app.desc }}</p>
          <ul class="tag-row tag-row--dark">
            <li v-for="item in app.stack" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>

      <div class="stack-line">
        <span class="stack-label">技术栈</span>
        <ul>
          <li v-for="item in stack" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.app-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.app-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px 22px;
  background:
    linear-gradient(160deg, rgb(255 255 255 / 5%), transparent 44%),
    rgb(33 24 18 / 72%);
  border: 1px solid rgb(201 162 39 / 16%);
  border-radius: var(--radius-md);
  transition:
    transform 0.3s var(--ease),
    border-color 0.3s var(--ease),
    background-color 0.3s var(--ease);
}

.app-card:hover {
  border-color: rgb(201 162 39 / 38%);
  transform: translateY(-4px);
}

.app-card--core {
  background:
    linear-gradient(160deg, rgb(179 58 45 / 22%), transparent 52%),
    rgb(45 26 18 / 82%);
  border-color: rgb(179 58 45 / 42%);
}

.app-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-index {
  font-family: var(--serif);
  font-size: 12px;
  color: var(--gold);
  letter-spacing: 0.18em;
}

.app-role {
  padding: 3px 9px;
  font-size: 11px;
  color: var(--text-muted);
  border: 1px solid rgb(201 162 39 / 22%);
  border-radius: 999px;
}

.app-card h3 {
  margin-top: 22px;
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 600;
  color: var(--paper);
  overflow-wrap: anywhere;
}

.app-card p {
  flex: 1;
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.85;
  color: var(--text-muted);
}

.app-card .tag-row {
  margin-top: 18px;
}

.stack-line {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 22px;
  align-items: center;
  margin-top: 34px;
  padding-top: 24px;
  border-top: 1px solid rgb(201 162 39 / 14%);
}

.stack-label {
  font-family: var(--serif);
  font-size: 13px;
  color: var(--gold);
  letter-spacing: 0.18em;
}

.stack-line ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stack-line li {
  padding: 3px 10px;
  font-size: 12px;
  color: var(--text-muted);
  background: rgb(255 255 255 / 4%);
  border: 1px solid rgb(201 162 39 / 14%);
  border-radius: 999px;
}

code {
  padding: 1px 6px;
  font-family: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  font-size: 0.92em;
  color: var(--gold);
  background: rgb(255 255 255 / 5%);
  border-radius: 4px;
}

@media (max-width: 1080px) {
  .app-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .app-grid {
    grid-template-columns: 1fr;
  }
}
</style>
