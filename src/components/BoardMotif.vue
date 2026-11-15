<script setup>
const lines = Array.from({ length: 15 }, (_, index) => 30 + index * 30);
const stars = [
  [3, 3],
  [3, 11],
  [11, 3],
  [11, 11],
  [7, 7],
];
const stones = [
  { x: 7, y: 7, side: 'black' },
  { x: 8, y: 8, side: 'white' },
  { x: 6, y: 8, side: 'black' },
  { x: 7, y: 9, side: 'white' },
  { x: 8, y: 7, side: 'black' },
  { x: 5, y: 6, side: 'white' },
];

const point = (n) => 30 + n * 30;
</script>

<template>
  <div class="board-scene">
    <div class="board-halo" aria-hidden="true"></div>

    <div class="board-frame">
      <svg class="board" viewBox="0 0 480 480" role="img" aria-label="十五乘十五五子棋棋盘示意图">
        <rect x="0" y="0" width="480" height="480" fill="#d7b07a" />

        <g stroke="#5b3a20" stroke-width="1.4" opacity="0.85">
          <line v-for="n in lines" :key="`v${n}`" :x1="n" y1="30" :x2="n" y2="450" />
          <line v-for="n in lines" :key="`h${n}`" x1="30" :y1="n" x2="450" :y2="n" />
        </g>

        <rect x="26" y="26" width="428" height="428" fill="none" stroke="#5b3a20" stroke-width="3" />

        <g fill="#5b3a20">
          <circle v-for="[x, y] in stars" :key="`${x}-${y}`" :cx="point(x)" :cy="point(y)" r="4.4" />
        </g>

        <g>
          <circle
            v-for="stone in stones"
            :key="`${stone.x}-${stone.y}`"
            :cx="point(stone.x)"
            :cy="point(stone.y)"
            r="13.4"
            :fill="stone.side === 'black' ? '#17110d' : '#f7f2e7'"
            :stroke="stone.side === 'black' ? '#050403' : '#c9bda8'"
            stroke-width="1.2"
          />
          <circle
            v-for="stone in stones.filter((item) => item.side === 'black')"
            :key="`hl-${stone.x}-${stone.y}`"
            :cx="point(stone.x) - 4"
            :cy="point(stone.y) - 4"
            r="4"
            fill="#ffffff"
            opacity="0.16"
          />
        </g>
      </svg>

      <span class="frame-corner frame-corner--tl" aria-hidden="true"></span>
      <span class="frame-corner frame-corner--br" aria-hidden="true"></span>
    </div>

    <div class="board-seal" aria-hidden="true">连</div>

    <p class="board-caption">
      <span>黑先 · 白后</span>
      <span>五子连成一线</span>
    </p>
  </div>
</template>

<style scoped>
.board-scene {
  position: relative;
  display: grid;
  justify-items: center;
  padding: 26px 0 52px;
}

.board-halo {
  position: absolute;
  top: 8%;
  width: 78%;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgb(201 162 39 / 18%), transparent 66%);
  filter: blur(14px);
}

.board-frame {
  position: relative;
  width: min(430px, 100%);
  padding: 16px;
  background:
    repeating-linear-gradient(92deg, rgb(255 255 255 / 4%) 0 2px, transparent 2px 9px),
    linear-gradient(145deg, #6a472c, #3c2415 62%, #2a170d);
  border: 1px solid rgb(201 162 39 / 30%);
  border-radius: 14px;
  box-shadow:
    0 36px 80px rgb(0 0 0 / 58%),
    inset 0 0 0 1px rgb(255 255 255 / 8%);
  transform: rotate(-1.8deg);
  animation: board-float 9s ease-in-out infinite;
}

.board {
  width: 100%;
  border-radius: 7px;
  box-shadow: inset 0 0 24px rgb(74 52 35 / 35%);
}

.frame-corner {
  position: absolute;
  width: 26px;
  height: 26px;
  border-color: rgb(201 162 39 / 55%);
  border-style: solid;
}

.frame-corner--tl {
  top: 6px;
  left: 6px;
  border-width: 1px 0 0 1px;
}

.frame-corner--br {
  right: 6px;
  bottom: 6px;
  border-width: 0 1px 1px 0;
}

.board-seal {
  position: absolute;
  right: 2%;
  bottom: 22px;
  display: grid;
  width: 58px;
  height: 58px;
  font-family: var(--serif);
  font-size: 30px;
  color: #f6e8d2;
  place-items: center;
  background: var(--vermilion);
  border-radius: 8px;
  box-shadow: 0 12px 26px rgb(0 0 0 / 35%);
  transform: rotate(5deg);
}

.board-caption {
  display: flex;
  gap: 24px;
  margin-top: 26px;
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.16em;
}

.board-caption span + span::before {
  margin-right: 24px;
  color: var(--vermilion-2);
  content: '·';
}

@keyframes board-float {
  0%,
  100% {
    transform: rotate(-1.8deg) translateY(0);
  }

  50% {
    transform: rotate(-1deg) translateY(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .board-frame {
    animation: none;
  }
}

@media (max-width: 720px) {
  .board-seal {
    right: 0;
    bottom: 34px;
    width: 46px;
    height: 46px;
    font-size: 24px;
  }
}
</style>
