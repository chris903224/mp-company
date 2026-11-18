import { useEffect, useState, type RefObject } from 'react';
import { PROJECTS } from '../data/content';
import { clamp } from '../utils/clamp';
import { registerFrame } from '../utils/rafLoop';

interface UseProjectsArgs {
  sectionRef: RefObject<HTMLElement | null>;
  figureRefs: RefObject<Array<HTMLElement | null>>;
}

export function useProjects({ sectionRef, figureRefs }: UseProjectsArgs) {
  const [isLive, setIsLive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    setIsLive(true);

    const N = PROJECTS.length;

    const unregister = registerFrame(() => {
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return;

      const pos = clamp(-r.top / (r.height - window.innerHeight)) * (N - 1);

      figureRefs.current?.forEach((f, i) => {
        if (!f) return;
        const d = i - pos;
        const o = Math.max(0, 1 - Math.abs(d) * 1.5);
        f.style.opacity = o.toFixed(3);
        f.style.visibility = o > 0.01 ? 'visible' : 'hidden';
        f.style.transform = `translate3d(${(d * 8).toFixed(1)}%,0,0)`;
      });

      const a = Math.round(pos);
      setActiveIndex((prev) => (prev === a ? prev : a));
    });

    return unregister;
  }, [sectionRef, figureRefs]);

  const goToPhoto = (i: number) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    const h = sec.offsetHeight - window.innerHeight;
    const target = top + (h * i) / (PROJECTS.length - 1) + 2;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return { isLive, activeIndex, goToPhoto };
}