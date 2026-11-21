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
import { useSiteData } from '../hooks/useSiteData';
import { SERVICES_LIST } from '../admin/adminData';

export default function HomePage() {
  const { theme, toggle } = useTheme();
  
  // Kinukuha natin lahat ng dynamic data, kasama na ang services
  const { projects, business, services, isLoading } = useSiteData();

  // Dynamic counts
  const serviceCount = SERVICES_LIST.length; 
  const uniqueClients = new Set(projects.map((p: any) => p.company?.trim()).filter(Boolean)).size;

  const [menuOpen, setMenuOpen] = useState(false);
  const [preferredService, setPreferredService] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

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
        <Hero 
          ref={heroRef} 
          serviceCount={serviceCount} 
          clientCount={uniqueClients > 0 ? uniqueClients : 3} 
        />
        <Ticker />
        <About />
        
        {/* ✅ Ipapasa natin ang services data */}
        <Services onRequestService={handleRequestService} servicesData={services} />
        
        <Projects projects={projects} isLoading={isLoading} />
        <Process />
        <Contact preferredService={preferredService} business={business} />
      </main>
      
      <Footer business={business} />
      <BackToTop show={showTop} />
    </>
  );
}