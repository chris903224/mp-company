import { useCallback, useRef, useState } from 'react';
import SkipLink from '../components/SkipLink';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useTheme } from '../hooks/useTheme';
import { useHeaderState } from '../hooks/useHeaderState';

export default function HomePage() {
  const { theme, toggle } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [preferredService, setPreferredService] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  // `heroRef.current` is read once Header first mounts. It's the same DOM
  // node throughout the page's lifetime, so a single read is fine and
  // matches the original vanilla `$(".seq")` lookup.
  const { showTop } = useHeaderState(heroRef.current);

  const handleRequestService = useCallback((service: string) => {
    setPreferredService(service);
  }, []);

  return (
    <>
      <SkipLink />
      <Header
        theme={theme}
        onToggleTheme={toggle}
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen(true)}
        onCloseMenu={() => setMenuOpen(false)}
        heroRef={heroRef}
      />
      <main id="main">
        <Hero ref={heroRef} />
        <Ticker />
        <About />
        <Services onRequestService={handleRequestService} />
        <Projects />
        <Process />
        <Contact preferredService={preferredService} />
      </main>
      <Footer />
      <BackToTop show={showTop} />
    </>
  );
}