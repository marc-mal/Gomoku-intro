<script setup>
import { featureGroups } from '../data/content';
</script>

<template>
  <section id="all-features" class="section section--tight">
    <div class="container">
      <header class="section-head section-head--dark">
        <p class="eyebrow">功能全景</p>
        <h2>所有功能，摊开来看。</h2>
        <p class="lede">
          按对局、社交、后台与平台四组整理。每一组都对应仓库里已经实现的模块，
          不是规划中的功能清单。
        </p>
      </header>

      <div class="group-grid">
        <article v-for="(group, index) in featureGroups" :key="group.title" v-reveal="index * 50" class="group-card">
          <header class="group-head">
            <span class="group-seal" aria-hidden="true">{{ group.seal }}</span>
            <h3>{{ group.title }}</h3>
            <span class="group-count">{{ group.items.length }}</span>
          </header>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.group-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.group-card {
  display: flex;
  flex-direction: column;
  padding: 22px 22px 24px;
  background:
    linear-gradient(160deg, rgb(255 255 255 / 5%), transparent 46%),
    rgb(33 24 18 / 70%);
  border: 1px solid rgb(201 162 39 / 16%);
  border-radius: var(--radius-md);
}

.group-head {
  display: flex;
  gap: 12px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(201 162 39 / 14%);
}

.group-seal {
  display: grid;
  width: 32px;
  height: 32px;
  font-family: var(--serif);
  font-size: 16px;
  color: var(--gold);
  flex-shrink: 0;
  place-items: center;
  background: rgb(201 162 39 / 8%);
  border: 1px solid rgb(201 162 39 / 26%);
  border-radius: 5px;
  transform: rotate(-3deg);
}

.group-head h3 {
  font-size: 18px;
  color: var(--paper);
}

.group-count {
  margin-left: auto;
  font-family: var(--serif);
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.group-card ul {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 16px 0 0;
  padding: 0;
  font-size: 12.5px;
  line-height: 1.65;
  color: var(--text-muted);
  list-style: none;
}

.group-card li {
  display: flex;
  gap: 9px;
  align-items: baseline;
}

.group-card li::before {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  content: '';
  background: var(--gold);
  border-radius: 50%;
  opacity: 0.75;
}

@media (max-width: 1080px) {
  .group-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .group-grid {
    grid-template-columns: 1fr;
  }
}
</style>
