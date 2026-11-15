<script setup>
import { telegramSteps } from '../data/content';
</script>

<template>
  <section id="telegram" class="section telegram">
    <div class="container">
      <div class="tg-panel">
        <div class="tg-copy">
          <p class="eyebrow eyebrow--tg">Telegram 群对战</p>
          <h2>在群里开一桌，<br /><em>群友一起下。</em></h2>
          <p class="tg-lede">
            不用一个个拉私聊。群里发一条 <code>/pk</code>，Bot 直接建一张棋桌；
            群友点「加入对局」就能落到同一张桌前，落座、开局、围观都在群里完成。
          </p>

          <ul class="tg-tags">
            <li>群内建房</li>
            <li>Mini App 深链</li>
            <li>观战与喝彩</li>
            <li>战报分享</li>
          </ul>

          <div class="tg-actions">
            <a class="btn btn--tg" href="#contact">购买源码</a>
            <a class="btn btn--ghost" href="#gallery">看联机截图</a>
          </div>
        </div>

        <ol class="tg-steps">
          <li v-for="(step, index) in telegramSteps" :key="step.title">
            <span class="step-no">0{{ index + 1 }}</span>
            <div class="step-body">
              <strong>{{ step.title }}</strong>
              <p>{{ step.desc }}</p>
              <code v-if="step.code !== ''">{{ step.code }}</code>
            </div>
          </li>
        </ol>
      </div>

      <p class="tg-note">
        <span aria-hidden="true">※</span>
        部署提示：Mini App 需要 HTTPS 域名；Bot Token、用户名与代理在后台「Telegram 机器人」页配置。
      </p>
    </div>
  </section>
</template>

<style scoped>
.telegram {
  padding-top: 8px;
}

.tg-panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
  gap: clamp(30px, 5vw, 70px);
  overflow: hidden;
  padding: clamp(30px, 5vw, 64px);
  background:
    radial-gradient(720px 420px at 88% 4%, rgb(90 169 201 / 18%), transparent 62%),
    radial-gradient(420px 300px at 0% 100%, rgb(179 58 45 / 10%), transparent 60%),
    linear-gradient(150deg, #1d1a17, #14100c 70%);
  border: 1px solid rgb(90 169 201 / 30%);
  border-radius: var(--radius-lg);
  box-shadow:
    0 34px 80px rgb(0 0 0 / 46%),
    inset 0 0 0 1px rgb(255 255 255 / 3%);
}

.tg-panel::before {
  position: absolute;
  top: -70px;
  right: -50px;
  width: 250px;
  height: 250px;
  pointer-events: none;
  content: '';
  background: radial-gradient(circle, rgb(90 169 201 / 14%), transparent 68%);
  border-radius: 50%;
}

.eyebrow--tg {
  color: #77bfdc;
}

.tg-copy h2 {
  margin-top: 18px;
  font-size: clamp(30px, 4.2vw, 52px);
  line-height: 1.24;
  color: var(--paper);
}

.tg-copy h2 em {
  font-style: normal;
  color: #8dcbe4;
  text-shadow: 0 0 30px rgb(90 169 201 / 28%);
}

.tg-lede {
  max-width: 540px;
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.95;
  color: var(--text-muted);
}

.tg-lede code {
  padding: 1px 7px;
  font-family: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  font-size: 0.92em;
  color: #8dcbe4;
  background: rgb(90 169 201 / 12%);
  border: 1px solid rgb(90 169 201 / 24%);
  border-radius: 4px;
}

.tg-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.tg-tags li {
  padding: 4px 11px;
  font-size: 12px;
  color: #a8cddd;
  background: rgb(90 169 201 / 8%);
  border: 1px solid rgb(90 169 201 / 24%);
  border-radius: 999px;
}

.tg-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.btn--tg {
  color: #f2f8fa;
  background: linear-gradient(135deg, #3f93b7, #2b7191);
  box-shadow: 0 14px 34px rgb(63 147 183 / 26%);
}

.btn--tg:hover {
  box-shadow: 0 18px 42px rgb(63 147 183 / 38%);
}

.tg-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tg-steps li {
  position: relative;
  display: flex;
  gap: 18px;
  padding: 0 0 26px;
}

.tg-steps li:last-child {
  padding-bottom: 0;
}

/* 竖向流程线：只连在相邻步骤之间 */
.tg-steps li:not(:last-child)::after {
  position: absolute;
  top: 34px;
  bottom: 6px;
  left: 17px;
  width: 1px;
  content: '';
  background: linear-gradient(180deg, rgb(90 169 201 / 40%), rgb(90 169 201 / 8%));
}

.step-no {
  display: grid;
  width: 35px;
  height: 35px;
  font-family: var(--serif);
  font-size: 12px;
  color: #9dd2e5;
  flex-shrink: 0;
  letter-spacing: 0.08em;
  place-items: center;
  background: rgb(90 169 201 / 10%);
  border: 1px solid rgb(90 169 201 / 34%);
  border-radius: 50%;
}

.step-body {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
}

.step-body strong {
  display: block;
  font-family: var(--serif);
  font-size: 18px;
  color: var(--paper);
}

.step-body p {
  margin-top: 7px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-muted);
}

.step-body code {
  display: inline-block;
  max-width: 100%;
  margin-top: 9px;
  padding: 3px 9px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  font-size: 11.5px;
  color: #8dcbe4;
  white-space: nowrap;
  background: rgb(90 169 201 / 10%);
  border: 1px solid rgb(90 169 201 / 22%);
  border-radius: 5px;
}

.tg-note {
  display: flex;
  gap: 10px;
  align-items: baseline;
  max-width: 760px;
  margin-top: 18px;
  padding-left: 6px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--text-muted);
}

.tg-note span {
  color: #77bfdc;
}

@media (max-width: 900px) {
  .tg-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .tg-steps li {
    gap: 14px;
  }

  .step-body strong {
    font-size: 16px;
  }
}
</style>
