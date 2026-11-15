<script setup>
import { features } from '../data/content';
</script>

<template>
  <section id="features" class="section">
    <div class="container">
      <div class="paper-panel">
        <header class="section-head">
          <p class="eyebrow">玩法与能力</p>
          <h2>从第一手，<br />到一整座棋社。</h2>
          <p class="lede">
            棋盘规则保持简单，围绕它长出来的能力却覆盖了三种对局方式、社交与运营。
            下面每一条都在本机真实跑过，截图来自同一套代码。
          </p>
        </header>

        <div class="feature-grid">
          <article v-for="(item, index) in features" :key="item.title" v-reveal="index * 40" class="feature-card">
            <span class="seal" aria-hidden="true">{{ item.seal }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <ul class="tag-row">
              <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(228px, 1fr));
  gap: 18px;
}

.feature-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 24px 22px;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 62%), rgb(255 255 255 / 22%)),
    linear-gradient(180deg, #f8f1e2, #f0e5d1);
  border: 1px solid rgb(74 52 35 / 14%);
  border-radius: 14px;
  transition:
    transform 0.3s var(--ease),
    box-shadow 0.3s var(--ease),
    border-color 0.3s var(--ease);
}

.feature-card:hover {
  border-color: rgb(179 58 45 / 34%);
  box-shadow: 0 18px 36px rgb(74 52 35 / 14%);
  transform: translateY(-5px);
}

.feature-card .seal {
  display: grid;
  width: 38px;
  height: 38px;
  font-family: var(--serif);
  font-size: 19px;
  color: var(--vermilion);
  place-items: center;
  background: rgb(179 58 45 / 7%);
  border: 1px solid rgb(179 58 45 / 34%);
  border-radius: 6px;
  transform: rotate(-3deg);
}

.feature-card h3 {
  margin-top: 18px;
  font-size: 21px;
  color: var(--text-dark);
}

.feature-card p {
  flex: 1;
  margin-top: 10px;
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--text-dark-muted);
}

.feature-card .tag-row {
  margin-top: 18px;
}

@media (max-width: 720px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
