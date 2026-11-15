<script setup>
import { commands } from '../data/content';
import CopyBlock from './CopyBlock.vue';

const prerequisites = [
  { title: 'Node.js 20+ 与 pnpm', desc: '仓库的 engines 要求 Node >= 20，packageManager 固定 pnpm。' },
  { title: 'MySQL / Redis 可选', desc: '默认内存实现就能跑通；要落库棋谱、社交与后台数据时再接 MySQL。' },
  { title: 'SESSION_SECRET 必填', desc: '服务端缺少这个环境变量会启动即失败，先把 apps/server/.env 配好。' },
];
</script>

<template>
  <section id="start" class="section start">
    <div class="container start-grid">
      <div>
        <header class="section-head section-head--dark">
          <p class="eyebrow">快速开始</p>
          <h2>三条命令，<br />把三端跑起来。</h2>
          <p class="lede">
            core 与服务端是编译后运行的，改完源码要重新构建；玩家端与后台由 Vite 热更新。
          </p>
        </header>

        <ul class="prereq">
          <li v-for="item in prerequisites" :key="item.title">
            <strong>{{ item.title }}</strong>
            <p>{{ item.desc }}</p>
          </li>
        </ul>
      </div>

      <div class="start-code">
        <CopyBlock title="安装与构建" :code="commands.build" />
        <CopyBlock title="启动三端" :code="commands.run" />
        <CopyBlock title="环境变量（可选存储）" :code="commands.env" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.start {
  padding-top: 40px;
}

.start-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(32px, 5vw, 68px);
  align-items: start;
}

.start-grid > * {
  min-width: 0;
}

.prereq {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.prereq li {
  padding-left: 18px;
  border-left: 2px solid rgb(201 162 39 / 30%);
}

.prereq strong {
  font-family: var(--serif);
  font-size: 15px;
  color: var(--paper);
}

.prereq p {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-muted);
}

.start-code {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

@media (max-width: 900px) {
  .start-grid {
    grid-template-columns: 1fr;
  }
}
</style>
