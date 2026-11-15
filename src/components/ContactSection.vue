<script setup>
import { telegramContact } from '../data/content';
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="paper-panel">
        <div class="contact-copy">
          <p class="eyebrow">{{ telegramContact.eyebrow }}</p>
          <h2>{{ telegramContact.title }}</h2>
          <p class="contact-desc">{{ telegramContact.desc }}</p>

          <div class="tg-row">
            <span class="tg-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.9 4.3 18.7 19.6c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L3.6 10.8 0 9.7c-1-.3-1-1 .2-1.3L20.6 3.3c.8-.3 1.5.2 1.3 1Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div class="tg-text">
              <strong>{{ telegramContact.handle }}</strong>
              <small>Telegram 联系方式</small>
            </div>
          </div>

          <a v-if="telegramContact.url !== ''" class="btn btn--primary" :href="telegramContact.url" target="_blank" rel="noreferrer">
            通过 Telegram 联系
          </a>
          <span v-else class="pending-pill">
            <i aria-hidden="true"></i>
            {{ telegramContact.pending }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-copy h2 {
  margin-top: 16px;
  font-size: clamp(28px, 3.9vw, 46px);
  line-height: 1.24;
  color: var(--text-dark);
}

.contact-desc {
  max-width: 520px;
  margin-top: 16px;
  font-size: 14.5px;
  line-height: 1.9;
  color: var(--text-dark-muted);
}

.tg-row {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: 28px;
}

.tg-mark {
  display: grid;
  width: 46px;
  height: 46px;
  color: #2f7fa3;
  flex-shrink: 0;
  place-items: center;
  background: rgb(47 127 163 / 8%);
  border: 1px solid rgb(47 127 163 / 26%);
  border-radius: 50%;
}

.tg-mark svg {
  width: 22px;
  height: 22px;
}

.tg-text strong {
  display: block;
  font-family: var(--serif);
  font-size: 20px;
  color: var(--text-dark);
}

.tg-text small {
  color: var(--text-dark-muted);
  font-size: 11.5px;
  letter-spacing: 0.08em;
}

.pending-pill {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  margin-top: 22px;
  padding: 11px 20px;
  font-size: 13px;
  color: var(--text-dark-muted);
  background: rgb(255 255 255 / 36%);
  border: 1px dashed rgb(74 52 35 / 34%);
  border-radius: 999px;
}

.pending-pill i {
  width: 7px;
  height: 7px;
  background: var(--gold);
  border-radius: 50%;
}
</style>
