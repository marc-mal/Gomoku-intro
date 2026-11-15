<script setup>
import { stats } from '../data/content';
import BoardMotif from './BoardMotif.vue';

const meta = ['Telegram 群对战', 'NestJS 12', 'Vue 3', 'WebSocket', 'MySQL + Redis', 'AI in Web Worker'];
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">连珠 · 好友五子棋 · Telegram 群对战</p>
        <h1>一方棋盘，<br /><em>三端</em>相连。</h1>
        <p class="hero-lede">
          从双人同屏、人机对战到好友联机，再到 Telegram 群里的一桌棋和一整套运营后台。
          规则、协议与状态机在三端之间共用同一套实现。
        </p>

        <div class="hero-actions">
          <a class="btn btn--primary" href="#gallery">浏览真实截图</a>
          <a class="btn btn--ghost" href="#start">快速开始</a>
        </div>

        <ul class="hero-meta">
          <li v-for="item in meta" :key="item">{{ item }}</li>
        </ul>
      </div>

      <BoardMotif />
    </div>

    <div class="container">
      <dl class="stats">
        <div v-for="item in stats" :key="item.label" class="stat">
          <dt>
            <strong>{{ item.value }}</strong>
            <span v-if="item.unit">{{ item.unit }}</span>
          </dt>
          <dd>{{ item.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 76px 0 70px;
}

.hero::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background:
    radial-gradient(560px 360px at 18% 18%, rgb(201 162 39 / 7%), transparent 70%),
    radial-gradient(480px 320px at 86% 46%, rgb(179 58 45 / 8%), transparent 68%);
}

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 6vw, 84px);
  align-items: center;
}

.hero-copy h1 {
  margin-top: 20px;
  font-size: clamp(46px, 6.4vw, 88px);
  line-height: 1.08;
  letter-spacing: 0.01em;
}

.hero-copy h1 em {
  font-style: normal;
  color: var(--vermilion-2);
  text-shadow: 0 0 34px rgb(212 90 65 / 26%);
}

.hero-lede {
  max-width: 540px;
  margin-top: 26px;
  font-size: 17px;
  line-height: 1.95;
  color: var(--text-muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin: 38px 0 0;
  padding: 0;
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  list-style: none;
}

.hero-meta li {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.hero-meta li + li::before {
  width: 4px;
  height: 4px;
  content: '';
  background: var(--gold);
  border-radius: 50%;
  opacity: 0.7;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin: 74px 0 0;
  overflow: hidden;
  background: rgb(201 162 39 / 16%);
  border: 1px solid rgb(201 162 39 / 16%);
  border-radius: var(--radius-md);
}

.stat {
  padding: 24px 26px;
  background: rgb(24 18 14 / 82%);
}

.stat dt {
  display: flex;
  gap: 6px;
  align-items: baseline;
}

.stat strong {
  font-family: var(--serif);
  font-size: clamp(28px, 3.4vw, 42px);
  font-weight: 600;
  color: var(--paper);
}

.stat span {
  font-family: var(--serif);
  font-size: 14px;
  color: var(--gold);
}

.stat dd {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    max-width: 640px;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 42px;
  }
}

@media (max-width: 560px) {
  .hero {
    padding-top: 52px;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
