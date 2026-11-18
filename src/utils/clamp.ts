/**
 * Clamp a number into the 0..1 range.
 * Mirrors the original `cl()` helper in the vanilla script.
 */
export const clamp = (v: number): number => Math.max(0, Math.min(1, v));

/**
 * Smoothstep interpolation with automatic clamping.
 * Mirrors the original `sm(a, b, x)` helper in the vanilla script:
 *   const t = clamp((x - a) / (b - a));
 *   return t * t * (3 - 2 * t);
 */
export const smoothstep = (a: number, b: number, x: number): number => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};