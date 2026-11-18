import { useEffect, useState, type RefObject } from 'react';
import { HERO_STAGES } from '../data/content';
import { clamp, smoothstep } from '../utils/clamp';
import { registerFrame } from '../utils/rafLoop';

/**
 * Fraction of the pinned scroll range used to travel between stages.
 * The remainder is a short "hold" on the last stage before the section unpins.
 */
const HOLD = 0.92;

/**
 * ONE shared timeline for every stage boundary (stage i → i+1).
 * `s` = scroll position minus i, so s runs 0 → 1 across the boundary.
 *
 * The background, the copy and the 3D object ALL read these same windows,
 * so they can never get out of step:
 *
 *   s 0.00 ─ 0.20   hold: stage i fully visible
 *   s 0.20 ─ 0.46   OUT : stage i copy + object fade away
 *   s 0.54 ─ 0.80   IN  : stage i+1 background + copy + object fade in TOGETHER
 *   s 0.80 ─ 1.00   hold: stage i+1 fully visible
 */
const OUT_START = 0.2;
const OUT_END = 0.46;
const IN_START = 0.54;
const IN_END = 0.8;

const outAmt = (s: number) => 1 - smoothstep(OUT_START, OUT_END, s);
const inAmt = (s: number) => smoothstep(IN_START, IN_END, s);

/** Hero object motion, art-directed in one place ("distance" = stage phase, 0 at rest, ±1 fully away). */
const OBJ = {
  rotateY: 38, // deg of turntable rotation per unit of phase
  rotateX: 5, // deg of pitch
  rotateZ: 2.5, // deg of roll
  shiftX: 64, // px of horizontal travel
  shiftY: 30, // px of vertical travel
  depth: 240, // px pushed back along Z when fully away
  scaleDrop: 0.07, // scale lost when fully away
  blur: 7, // px of focus-pull blur when fully away
  follow: 0.14, // 0..1 per 60fps frame: how quickly the view catches up with scroll
  tiltFollow: 0.08, // 0..1 per 60fps frame: pointer tilt smoothing
  tiltX: 5, // max pointer pitch (deg)
  tiltY: 9, // max pointer yaw (deg)
} as const;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface UseHeroArgs {
  sectionRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
  zmRefs: RefObject<Array<HTMLDivElement | null>>;
  hlRefs: RefObject<Array<HTMLDivElement | null>>;
  objRef: RefObject<HTMLDivElement | null>;
  planRef: RefObject<SVGSVGElement | null>;
}

export function useHero({
  sectionRef,
  pinRef,
  zmRefs,
  hlRefs,
  objRef,
}: UseHeroArgs) {
  const [isLive, setIsLive] = useState(false);
  const [showFirst, setShowFirst] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    setIsLive(true);

    const N = HERO_STAGES.length;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

    // viewPos is the scroll position, eased. Background, copy AND object are all
    // rendered from this single value, which is what keeps them in sync.
    let inView = false;
    let primed = false; // snap on the first frame so nothing flies in on load
    let targetPos = 0;
    let viewPos = 0;
    let tiltX = 0;
    let tiltY = 0;
    let tgtX = 0;
    let tgtY = 0;
    let loop = 0;
    let last = 0;
    let imgs: HTMLImageElement[] = [];

    const collectImgs = () => {
      const el = objRef.current;
      if (el && (imgs.length === 0 || !el.contains(imgs[0]))) {
        imgs = Array.from(el.querySelectorAll<HTMLImageElement>('img'));
      }
      return imgs;
    };

    const renderAll = () => {
      const pos = viewPos;
      const objEl = objRef.current;
      const list = objEl ? collectImgs() : [];
      const activeIdx = Math.min(N - 1, Math.max(0, Math.round(pos)));
      let activePhase = 0;

      for (let i = 0; i < N; i++) {
        // Shared fade amounts for stage i
        const inV = i > 0 ? inAmt(pos - (i - 1)) : 1;
        const outV = i < N - 1 ? outAmt(pos - i) : 1;
        const vis = inV * outV; // overall visibility of copy + object
        const phase = inV - outV; // -1 arriving … 0 at rest … +1 leaving
        if (i === activeIdx) activePhase = phase;

        // 1. Background: fades IN in the same window as copy + object.
        //    The outgoing background stays underneath until the new one covers it.
        const z = zmRefs.current?.[i];
        if (z) {
          const covered = i < N - 1 && pos - i >= IN_END;
          const show = inV > 0.004 && !covered;
          const scale = 0.95 + 0.05 * inV + 0.1 * clamp((pos - i) / IN_END);
          z.style.opacity = inV.toFixed(3);
          z.style.visibility = show ? 'visible' : 'hidden';
          z.style.transform = `scale(${scale.toFixed(4)})`;
        }

        // 2. Copy
        const h = hlRefs.current?.[i];
        if (h) {
          const scale = (0.96 + 0.04 * inV) * (1 + 0.06 * (1 - outV));
          h.style.opacity = vis.toFixed(3);
          h.style.transform = `scale(${scale.toFixed(4)})`;
        }

        // 3. 3D hero object
        const im = list[i];
        if (!im) continue;

        if (vis < 0.004) {
          if (im.style.visibility !== 'hidden') {
            im.style.visibility = 'hidden';
            im.style.opacity = '0';
          }
          continue;
        }

        const d = phase;
        const near = Math.min(Math.abs(d), 1);
        const focus = 1 - near; // pointer tilt only affects the hero-facing object
        const tz = -OBJ.depth * easeOutCubic(near);
        const scale = 1 - near * OBJ.scaleDrop;

        im.style.visibility = 'visible';
        im.style.opacity = vis.toFixed(3);
        im.style.setProperty(
          '--blur',
          `${(smoothstep(0, 1, near) * OBJ.blur).toFixed(2)}px`,
        );
        im.style.transform =
          `translate3d(${(-d * OBJ.shiftX).toFixed(1)}px,` +
          `${(-d * OBJ.shiftY).toFixed(1)}px,${tz.toFixed(1)}px) ` +
          `rotateX(${(-d * OBJ.rotateX + tiltX * focus).toFixed(2)}deg) ` +
          `rotateY(${(d * OBJ.rotateY + tiltY * focus).toFixed(2)}deg) ` +
          `rotateZ(${(d * OBJ.rotateZ).toFixed(2)}deg) ` +
          `scale(${scale.toFixed(4)})`;
      }

      // 1 when resting on a stage, 0 midway — drives glow / contact light in CSS.
      objEl?.style.setProperty('--settle', (1 - clamp(Math.abs(activePhase))).toFixed(3));
    };

    // Frame-rate independent easing toward the scroll target + pointer tilt.
    const step = (t: number) => {
      loop = 0;
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 1 / 60);
      last = t;

      const kPos = 1 - Math.pow(1 - OBJ.follow, dt * 60);
      const kTilt = 1 - Math.pow(1 - OBJ.tiltFollow, dt * 60);

      const dp = targetPos - viewPos;
      viewPos = Math.abs(dp) < 0.0004 ? targetPos : viewPos + dp * kPos;
      tiltX += (tgtX - tiltX) * kTilt;
      tiltY += (tgtY - tiltY) * kTilt;

      renderAll();

      const settled =
        viewPos === targetPos &&
        Math.abs(tgtX - tiltX) < 0.01 &&
        Math.abs(tgtY - tiltY) < 0.01;

      if (!settled && inView) {
        loop = requestAnimationFrame(step);
      } else {
        last = 0;
      }
    };

    const kick = () => {
      if (!loop) loop = requestAnimationFrame(step);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!inView) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tgtY = nx * OBJ.tiltY;
      tgtX = -ny * OBJ.tiltX;
      kick();
    };
    const onPointerLeave = () => {
      tgtX = 0;
      tgtY = 0;
      kick();
    };

    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    const unregister = registerFrame(() => {
      const seq = sectionRef.current;
      const pin = pinRef.current;
      if (!seq || !pin) return;

      const r = seq.getBoundingClientRect();
      const range = seq.offsetHeight - pin.offsetHeight;
      if (r.bottom < -50 || r.top > window.innerHeight + 50) {
        inView = false;
        return;
      }
      inView = true;

      const p = range > 0 ? clamp(-r.top / range) : 0;
      const prog = clamp(p / HOLD);
      const pos = prog * (N - 1);

      // Exposed to CSS for the progress rail.
      seq.style.setProperty('--prog', prog.toFixed(4));

      targetPos = pos;
      if (!primed) {
        primed = true;
        viewPos = pos;
        renderAll();
      } else {
        kick();
      }

      // UI state follows the real scroll position
      const first = pos < 0.25;
      setShowFirst((prev) => (prev === first ? prev : first));

      const a = Math.round(pos);
      setActiveStep((prev) => (prev === a ? prev : a));
    });

    return () => {
      unregister();
      if (loop) cancelAnimationFrame(loop);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [sectionRef, pinRef, zmRefs, hlRefs, objRef]);

  const goToStep = (i: number) => {
    const seq = sectionRef.current;
    const pin = pinRef.current;
    if (!seq || !pin) return;

    const top = seq.getBoundingClientRect().top + window.scrollY;
    const range = seq.offsetHeight - pin.offsetHeight;
    const target = top + (range * HOLD * i) / (HERO_STAGES.length - 1) + 1;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return { isLive, showFirst, activeStep, goToStep };
}