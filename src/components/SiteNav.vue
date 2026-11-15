<script setup>
const links = [
  ['特性', '#features'],
  ['群对战', '#telegram'],
  ['全部功能', '#all-features'],
  ['截图', '#gallery'],
  ['架构', '#stack'],
  ['快速开始', '#start'],
  ['联系', '#contact'],
];
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="#top" aria-label="回到顶部">
        <span class="brand-seal">连</span>
        <span class="brand-text">
          <strong>连珠</strong>
          <small>好友五子棋</small>
        </span>
      </a>

      <nav class="nav-links" aria-label="页面目录">
        <a v-for="[label, href] in links" :key="href" :href="href">{{ label }}</a>
      </nav>

      <a class="nav-badge" href="#deploy">
        <span class="nav-badge-dot" aria-hidden="true"></span>
        GitHub Pages
      </a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgb(18 13 10 / 72%);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgb(201 162 39 / 14%);
}

.nav-inner {
  display: flex;
  gap: 28px;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.brand {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}

.brand-seal {
  display: grid;
  width: 38px;
  height: 38px;
  font-family: var(--serif);
  font-size: 20px;
  color: var(--paper);
  place-items: center;
  background: var(--vermilion);
  border-radius: 6px;
  box-shadow: 0 6px 18px rgb(179 58 45 / 32%);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-text strong {
  font-family: var(--serif);
  font-size: 18px;
  letter-spacing: 0.12em;
}

.brand-text small {
  color: var(--text-muted);
  font-size: 11px;
  letter-spacing: 0.14em;
}

.nav-links {
  display: flex;
  gap: 26px;
  font-size: 14px;
  color: var(--text-muted);
}

.nav-links a {
  position: relative;
  padding: 4px 0;
  transition: color 0.25s var(--ease);
}

.nav-links a::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: '';
  background: var(--vermilion-2);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease);
}

.nav-links a:hover {
  color: var(--text);
}

.nav-links a:hover::after {
  transform: scaleX(1);
}

.nav-badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 8px 14px;
  font-size: 12px;
  color: var(--text-muted);
  border: 1px solid rgb(201 162 39 / 24%);
  border-radius: 999px;
}

.nav-badge-dot {
  width: 6px;
  height: 6px;
  background: #7fbf8a;
  border-radius: 50%;
  box-shadow: 0 0 10px rgb(127 191 138 / 80%);
}

@media (max-width: 860px) {
  .nav-links {
    display: none;
  }
}

@media (max-width: 520px) {
  .nav-badge {
    display: none;
  }
}
</style>
