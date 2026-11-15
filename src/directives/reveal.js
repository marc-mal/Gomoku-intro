/**
 * 滚动进入视口时添加 `is-revealed`。
 *
 * 用共享的 IntersectionObserver 而不是每个组件各自建一个；
 * 元素一旦露出就取消观察，避免来回滚动时反复触发。
 */
let observer = null;

function getObserver() {
  if (observer === null) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
  }
  return observer;
}

export default {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed');
      return;
    }
    el.classList.add('reveal');
    if (typeof binding.value === 'number') el.style.transitionDelay = `${binding.value}ms`;
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
