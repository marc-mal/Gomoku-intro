<script setup>
import { computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  shots: { type: Array, required: true },
  index: { type: Number, required: true },
});
const emit = defineEmits(['close', 'update:index']);

const current = computed(() => props.shots[props.index]);

function next() {
  emit('update:index', (props.index + 1) % props.shots.length);
}

function prev() {
  emit('update:index', (props.index - 1 + props.shots.length) % props.shots.length);
}

function onKeydown(event) {
  if (event.key === 'Escape') emit('close');
  if (event.key === 'ArrowRight') next();
  if (event.key === 'ArrowLeft') prev();
}

let previousOverflow = '';

onMounted(() => {
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.body.style.overflow = previousOverflow;
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div class="lightbox" role="dialog" aria-modal="true" :aria-label="`${current.title}截图预览`">
      <div class="lightbox-bar">
        <span class="count">{{ index + 1 }} / {{ shots.length }}</span>
        <span class="title">{{ current.title }}</span>
        <div class="bar-actions">
          <a :href="current.src" target="_blank" rel="noreferrer">原图 ↗</a>
          <button type="button" aria-label="关闭预览" @click="emit('close')">×</button>
        </div>
      </div>

      <button class="nav nav--prev" type="button" aria-label="上一张" @click="prev">‹</button>

      <div class="stage" @click.self="emit('close')">
        <img :src="current.src" :alt="`${current.title} —— ${current.desc}`" />
      </div>

      <button class="nav nav--next" type="button" aria-label="下一张" @click="next">›</button>

      <footer class="lightbox-caption">
        <strong>{{ current.title }}</strong>
        <p>{{ current.desc }}</p>
      </footer>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  padding: 18px clamp(16px, 4vw, 56px) 22px;
  background: rgb(10 7 5 / 94%);
  backdrop-filter: blur(14px);
  animation: fade-in 0.25s var(--ease);
}

.lightbox-bar {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(201 162 39 / 14%);
}

.count {
  font-family: var(--serif);
  font-size: 12px;
  color: var(--gold);
  letter-spacing: 0.14em;
}

.title {
  font-family: var(--serif);
  font-size: 16px;
  color: var(--paper);
}

.bar-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.bar-actions a {
  padding: 5px 12px;
  font-size: 12px;
  color: var(--text-muted);
  border: 1px solid rgb(201 162 39 / 24%);
  border-radius: 999px;
}

.bar-actions a:hover {
  color: var(--paper);
}

.bar-actions button {
  display: grid;
  width: 34px;
  height: 34px;
  font-size: 22px;
  line-height: 1;
  color: var(--text-muted);
  place-items: center;
  background: transparent;
  border: 1px solid rgb(201 162 39 / 24%);
  border-radius: 50%;
}

.bar-actions button:hover {
  color: var(--paper);
  border-color: var(--gold);
}

.stage {
  display: grid;
  min-height: 0;
  padding: 20px clamp(44px, 8vw, 110px);
  place-items: center;
}

.stage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid rgb(201 162 39 / 22%);
  border-radius: 10px;
  box-shadow: 0 30px 80px rgb(0 0 0 / 55%);
}

.nav {
  position: fixed;
  top: 50%;
  display: grid;
  width: 44px;
  height: 44px;
  font-size: 32px;
  line-height: 1;
  color: var(--text-muted);
  place-items: center;
  background: rgb(33 24 18 / 72%);
  border: 1px solid rgb(201 162 39 / 24%);
  border-radius: 50%;
  transform: translateY(-50%);
}

.nav:hover {
  color: var(--paper);
  border-color: var(--gold);
}

.nav--prev {
  left: 14px;
}

.nav--next {
  right: 14px;
}

.lightbox-caption {
  padding-top: 12px;
  text-align: center;
  border-top: 1px solid rgb(201 162 39 / 14%);
}

.lightbox-caption strong {
  font-family: var(--serif);
  font-size: 15px;
  color: var(--paper);
}

.lightbox-caption p {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--text-muted);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 720px) {
  .stage {
    padding: 14px 0;
  }

  .nav {
    width: 38px;
    height: 38px;
    font-size: 26px;
  }

  .nav--prev {
    left: 6px;
  }

  .nav--next {
    right: 6px;
  }
}
</style>
