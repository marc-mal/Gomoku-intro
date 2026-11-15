<script setup>
import { computed, ref } from 'vue';
import { shotGroups } from '../data/content';
import LightBox from './LightBox.vue';

const activeGroup = ref(shotGroups[0].id);
const activeIndex = ref(null);

const base = import.meta.env.BASE_URL;
const groups = shotGroups.map((group) => ({
  ...group,
  shots: group.shots.map((shot, index) => ({
    ...shot,
    src: `${base}shots/${shot.file}.jpg`,
    no: String(index + 1).padStart(2, '0'),
  })),
}));

const currentGroup = computed(() => groups.find((group) => group.id === activeGroup.value) ?? groups[0]);

function switchGroup(id) {
  activeGroup.value = id;
  activeIndex.value = null;
}

function openShot(index) {
  activeIndex.value = index;
}
</script>

<template>
  <section id="gallery" class="section gallery">
    <div class="container">
      <header class="gallery-head">
        <div>
          <p class="eyebrow">真实截图</p>
          <h2>先看它跑起来的样子。</h2>
          <p class="gallery-lede">
            玩家端与后台都是本机启动后逐页截取，没有示意图；点开任意一张可放大查看。
          </p>
        </div>

        <div class="tabs" role="tablist" aria-label="截图分组">
          <button
            v-for="group in groups"
            :key="group.id"
            class="tab"
            :class="{ 'is-active': group.id === activeGroup }"
            role="tab"
            :aria-selected="group.id === activeGroup"
            @click="switchGroup(group.id)"
          >
            <span>{{ group.label }}</span>
            <small>{{ group.shots.length }}</small>
          </button>
        </div>
      </header>

      <p class="gallery-note">{{ currentGroup.note }} · 点击图片放大</p>

      <div class="shot-grid">
        <button
          v-for="(shot, index) in currentGroup.shots"
          :key="shot.file"
          v-reveal="index * 30"
          class="shot-card"
          type="button"
          :aria-label="`查看${shot.title}截图`"
          @click="openShot(index)"
        >
          <span class="shot-media">
            <img :src="shot.src" :alt="`${shot.title} —— ${shot.desc}`" loading="lazy" decoding="async" />
            <span class="shot-no">{{ shot.no }}</span>
          </span>
          <span class="shot-copy">
            <strong>{{ shot.title }}</strong>
            <span>{{ shot.desc }}</span>
          </span>
        </button>
      </div>
    </div>

    <LightBox
      v-if="activeIndex !== null"
      :shots="currentGroup.shots"
      :index="activeIndex"
      @close="activeIndex = null"
      @update:index="activeIndex = $event"
    />
  </section>
</template>

<style scoped>
.gallery {
  padding-top: 30px;
}

.gallery-head {
  display: flex;
  gap: 32px;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 18px;
}

.gallery-head h2 {
  margin-top: 16px;
  font-size: clamp(30px, 4vw, 50px);
  line-height: 1.2;
  color: var(--text);
}

.gallery-lede {
  max-width: 520px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: var(--text-muted);
}

.tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: rgb(255 255 255 / 4%);
  border: 1px solid rgb(201 162 39 / 18%);
  border-radius: 999px;
}

.tab {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 9px 18px;
  font-size: 14px;
  color: var(--text-muted);
  background: transparent;
  border: 0;
  border-radius: 999px;
  transition:
    color 0.25s var(--ease),
    background-color 0.25s var(--ease);
}

.tab small {
  font-size: 11px;
  opacity: 0.7;
}

.tab.is-active {
  color: var(--paper);
  background: var(--vermilion);
  box-shadow: 0 8px 18px rgb(179 58 45 / 30%);
}

.gallery-note {
  margin-bottom: 26px;
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.shot-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.shot-card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: left;
  background: rgb(33 24 18 / 74%);
  border: 1px solid rgb(201 162 39 / 16%);
  border-radius: 14px;
  transition:
    transform 0.3s var(--ease),
    border-color 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
}

.shot-card:hover {
  border-color: rgb(201 162 39 / 42%);
  box-shadow: 0 20px 44px rgb(0 0 0 / 40%);
  transform: translateY(-5px);
}

.shot-media {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--ink-950);
  border-radius: 9px;
}

.shot-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s var(--ease);
}

.shot-card:hover .shot-media img {
  transform: scale(1.025);
}

.shot-no {
  position: absolute;
  top: 8px;
  left: 8px;
  display: grid;
  width: 30px;
  height: 22px;
  font-family: var(--serif);
  font-size: 11px;
  color: var(--paper);
  letter-spacing: 0.1em;
  place-items: center;
  background: rgb(18 13 10 / 72%);
  border: 1px solid rgb(201 162 39 / 24%);
  border-radius: 5px;
  backdrop-filter: blur(6px);
}

.shot-copy {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 13px 6px 5px;
}

.shot-copy strong {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 600;
  color: var(--paper);
}

.shot-copy span {
  display: -webkit-box;
  overflow: hidden;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text-muted);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@media (max-width: 1080px) {
  .shot-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .gallery-head {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .shot-grid {
    grid-template-columns: 1fr;
  }
}
</style>
