import { useEffect, useState } from 'react';
import { registerFrame } from '../utils/rafLoop';
import { NAV_IDS } from '../data/content';

interface HeaderState {
  isDark: boolean;
  activeId: string | null;
  showTop: boolean;
}

export function useHeaderState(heroEl: HTMLElement | null): HeaderState {
  const [state, setState] = useState<HeaderState>({
    isDark: true,
    activeId: null,
    showTop: false,
  });

  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => n !== null
    );

    const unregister = registerFrame(() => {
      const y = window.scrollY + window.innerHeight * 0.35;

      let active: string | null = null;
      sections.forEach((s, i) => {
        if (s.offsetTop <= y) active = NAV_IDS[i];
      });

      const dk = heroEl ? heroEl.getBoundingClientRect().bottom > 72 : false;
      const top = window.scrollY > 700;

      setState((prev) => {
        if (prev.isDark === dk && prev.activeId === active && prev.showTop === top) {
          return prev;
        }
        return { isDark: dk, activeId: active, showTop: top };
      });
    });

    return unregister;
  }, [heroEl]);

  return state;
}