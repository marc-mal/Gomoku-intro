<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  code: { type: String, required: true },
});

const copied = ref(false);
let timer = null;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
    }, 1600);
  } catch {
    copied.value = false;
  }
}
</script>

<template>
  <div class="copy-block">
    <div class="copy-head">
      <span>{{ title }}</span>
      <button type="button" @click="copy">{{ copied ? '已复制' : '复制' }}</button>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.copy-block {
  min-width: 0;
  overflow: hidden;
  background: #100b08;
  border: 1px solid rgb(201 162 39 / 18%);
  border-radius: 12px;
}

.copy-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 12px;
  color: var(--text-muted);
  background: rgb(255 255 255 / 3%);
  border-bottom: 1px solid rgb(201 162 39 / 12%);
}

.copy-head button {
  padding: 3px 10px;
  font-size: 11px;
  color: var(--gold);
  background: transparent;
  border: 1px solid rgb(201 162 39 / 28%);
  border-radius: 999px;
  transition:
    background-color 0.2s var(--ease),
    color 0.2s var(--ease);
}

.copy-head button:hover {
  color: var(--paper);
  background: rgb(201 162 39 / 12%);
}

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  font-size: 12.5px;
  line-height: 1.85;
  color: #d8c8ab;
}

code {
  font-family: inherit;
}
</style>
