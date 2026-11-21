import { useState } from 'react';
import { SERVICES, SERVICE_IMAGES } from '../data/content'; // Removed SERVICE_OPTIONS since no buttons
import type { ServicesInfo } from '../hooks/useSiteData';

interface ServicesProps {
  onRequestService: (service: string) => void;
  servicesData: ServicesInfo | null;
}

export default function Services({ onRequestService, servicesData }: ServicesProps) {
  // State to track which service image is hovered or active (optional)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleRequest = (index: number) => {
    // Fallback logic if you still want to trigger contact form
    const serviceName = SERVICES[index]?.title || 'General Inquiry';
    onRequestService(serviceName);
    
    // Scroll to contact
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('name')?.focus({ preventScroll: true });
    }, 700);
  };

  return (
    <section id="services">
      <div className="sp">
        {/* Header Section - Pinanatili para malinaw kung ano ang section */}
        <div className="sl" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p className="eb">Services</p>
          <h2>Our Technical Expertise</h2>
          <p>Click an image to request this service.</p>
        </div>

        {/* Picture Only Grid Layout */}
        <div className="pg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {SERVICE_IMAGES.map((src, i) => {
            // Map images to services. If more images than services, use modulo or check bounds
            const svc = SERVICES[i]; 
            if (!svc) return null;

            return (
              <figure key={src} className="fd pg-item">
                <button 
                  type="button" 
                  className="pg-card picture-only" 
                  onClick={() => handleRequest(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  aria-label={`Request ${svc.title}`}
                >
                  <span className="pg-media">
                    <img
                      src={src}
                      alt={svc.title} // Added alt text for accessibility
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                      }}
                    />
                  </span>
                  
                  {/* Optional: Overlay Title on Hover (kung gusto mo ng hint kung ano ang picture) */}
                  {/* Tinanggal ko ito kung strict "picture only", pero pwede mong i-uncomment kung need */}
                  {/* 
                  <div className={`overlay ${activeIndex === i ? 'visible' : ''}`}>
                     <span>{svc.title}</span>
                  </div> 
                  */}
                </button>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}