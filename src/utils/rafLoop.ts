/**
 * Shared scroll/resize rAF scheduler.
 *
 * Mirrors the original vanilla script pattern:
 *   const hooks = [];
 *   let tk = false;
 *   function req() {
 *     if (!tk) {
 *       tk = true;
 *       requestAnimationFrame(() => {
 *         tk = false;
 *         hooks.forEach(f => f());
 *       });
 *     }
 *   }
 *   addEventListener("scroll", req, { passive: true });
 *   addEventListener("resize", req);
 *
 * Instead of a global array, subscribers register a callback and receive
 * an unsubscribe function. The window listeners are attached lazily when
 * the first subscriber arrives and removed when the last one leaves, so
 * StrictMode double-mounts are safe.
 */

type Frame = () => void;

const hooks = new Set<Frame>();
let scheduled = false;
let bound = false;

function flush() {
  scheduled = false;
  hooks.forEach((fn) => fn());
}

function request() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(flush);
}

function bind() {
  if (bound) return;
  bound = true;
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
}

function unbindIfEmpty() {
  if (hooks.size === 0 && bound) {
    bound = false;
    window.removeEventListener('scroll', request);
    window.removeEventListener('resize', request);
  }
}

/**
 * Register a frame callback that runs on every throttled scroll/resize tick.
 * Returns an unsubscribe function — call it on cleanup.
 *
 * A frame is also scheduled immediately on registration so the first paint
 * reflects the current scroll position (matches the original `req()` call
 * at the bottom of the vanilla script).
 */
export function registerFrame(fn: Frame): () => void {
  bind();
  hooks.add(fn);
  request();
  return () => {
    hooks.delete(fn);
    unbindIfEmpty();
  };
}