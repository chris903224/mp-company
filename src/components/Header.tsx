import { useEffect, type RefObject } from 'react';
import { useHeaderState } from '../hooks/useHeaderState';
import type { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  menuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  heroRef: RefObject<HTMLElement | null>;
}

// ✅ FIXED: Tamang href at id para sa bawat section
const NAV_LINKS = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#services', id: 'services', label: 'Services' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#contact', id: 'contact', label: 'Contact' },
] as const;

export default function Header({
  theme,
  onToggleTheme,
  menuOpen,
  onOpenMenu,
  onCloseMenu,
  heroRef,
}: HeaderProps) {
  const { isDark, activeId } = useHeaderState(heroRef.current);

  useEffect(() => {
    document.body.classList.toggle('lock', menuOpen);
    return () => document.body.classList.remove('lock');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseMenu();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, onCloseMenu]);

  const headerClass = [isDark ? 'dk' : '', menuOpen ? 'mo' : ''].filter(Boolean).join(' ');

  return (
    <header className={headerClass || undefined}>
      <div className="wrap bar">
        <nav aria-label="Main">
          <ul className={`menu${menuOpen ? ' open' : ''}`} id="menu">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={activeId === l.id ? 'location' : undefined}
                  onClick={onCloseMenu}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mq">
              <a href="#contact" onClick={onCloseMenu}>
                Get a Quote
              </a>
            </li>
          </ul>
        </nav>

        <a className="logo" href="#home" aria-label="MP Micro IT Solutions, home">
          MP Micro<small>IT Solutions</small>
        </a>

        <div className="rt">
          <button
            className="tg"
            type="button"
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="7.5" />
              <path d="M9 1.5v15a7.5 7.5 0 0 0 0-15z" fill="currentColor" />
            </svg>
          </button>

          <a className="q" href="#contact">
            Get a Quote
          </a>

          <button
            className="burger"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={menuOpen ? onCloseMenu : onOpenMenu}
          >
            <i></i>
            <i></i>
          </button>
        </div>
      </div>
    </header>
  );
}