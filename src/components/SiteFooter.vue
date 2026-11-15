<template>
  <footer id="deploy" class="footer">
    <div class="container">
      <div class="footer-bottom">
        <div class="footer-brand">
          <span class="brand-seal">连</span>
          <div>
            <strong>连珠 · 好友五子棋</strong>
            <small>玩家端 · 服务端 · 管理后台</small>
          </div>
        </div>

        <nav class="footer-links" aria-label="页脚目录">
          <a href="#features">特性</a>
          <a href="#telegram">群对战</a>
          <a href="#all-features">全部功能</a>
          <a href="#gallery">截图</a>
          <a href="#stack">架构</a>
          <a href="#start">快速开始</a>
          <a href="#contact">联系</a>
        </nav>

        <p class="footer-meta">
          intro/ · Vue 3 + Vite<br />
          截图由 Playwright 生成 · © 2026 Gomoku
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 40px 0 48px;
  border-top: 1px solid rgb(201 162 39 / 14%);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 22px 40px;
  align-items: center;
  justify-content: space-between;
}

.footer-brand {
  display: flex;
  gap: 12px;
  align-items: center;
}

.brand-seal {
  display: grid;
  width: 36px;
  height: 36px;
  font-family: var(--serif);
  font-size: 18px;
  color: var(--paper);
  place-items: center;
  background: var(--vermilion);
  border-radius: 6px;
}

.footer-brand strong {
  display: block;
  font-family: var(--serif);
  font-size: 15px;
  letter-spacing: 0.08em;
}

.footer-brand small {
  color: var(--text-muted);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.footer-links {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: var(--text-muted);
}

.footer-links a:hover {
  color: var(--paper);
}

.footer-meta {
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--text-muted);
  text-align: right;
}

@media (max-width: 860px) {
  .footer-meta {
    text-align: left;
  }
}
</style>
