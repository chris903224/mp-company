import { useState } from 'react';
import { SERVICES, SERVICE_IMAGES, SERVICE_OPTIONS } from '../data/content';

interface ServicesProps {
  onRequestService: (service: string) => void;
}

export default function Services({ onRequestService }: ServicesProps) {
  const [active, setActive] = useState(0);

  const handleRequest = (index: number) => {
    const option = SERVICE_OPTIONS[index] ?? SERVICE_OPTIONS[0];
    onRequestService(option);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('name')?.focus({ preventScroll: true });
    }, 700);
  };

  return (
    <section id="services">
      <div className="sp">
        <div className="simgs" aria-hidden="true">
          {SERVICE_IMAGES.map((src, i) => (
            <div key={src} className={`sim${active === i ? ' on' : ''}`}>
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
            </div>
          ))}
        </div>

        <div className="sl">
          <p className="eb">Services</p>
          <h2>Our Technical Expertise</h2>
          <p>Select a service to see what it covers.</p>

          <ul className="l" id="slist">
            {SERVICES.map((svc, i) => {
              const isOpen = active === i;
              return (
                <li key={svc.id} className={isOpen ? 'on' : undefined}>
                  <h3>
                    <button
                      className="si"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`sd${i}`}
                      onClick={() => setActive(i)}
                    >
                      {svc.title}
                    </button>
                  </h3>
                  <div className="sd" id={`sd${i}`}>
                    <div>
                      <ul>
                        {svc.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <button
                        className="btn rq"
                        type="button"
                        data-k={i}
                        onClick={() => handleRequest(i)}
                      >
                        Request this service
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}