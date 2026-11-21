import ContactForm from './ContactForm';
import type { BusinessInfo } from '../hooks/useSiteData';

interface ContactProps {
  preferredService: string | null;
  business: BusinessInfo | null;
}

export default function Contact({ preferredService, business }: ContactProps) {
  return (
    <section className="ct" id="contact">
      <div className="wrap cg">
        <div>
          <p className="eb">Contact</p>
          <h2>Let’s Build a Better Technology Setup.</h2>
          <p style={{ color: 'var(--mu)', maxWidth: '46ch' }}>
            Need network cabling, a CCTV system, or IT equipment? Get in touch with MP Micro IT Solutions.
          </p>
          <ul className="info">
            <li>
              <span>Address</span>
              <span>{business?.address || 'Donia Elena Tower, P. Sanchez St. corner 3rd St., Santa Mesa, Manila'}</span>
            </li>
            <li>
              <span>Phone</span>
              <span>
                <a href={`tel:${business?.phone?.replace(/\s/g, '') || '+639567296257'}`}>
                  {business?.phone || '+63 956 729 6257'}
                </a>
              </span>
            </li>
            <li>
              <span>Email</span>
              <span>
                {/* ✅ Naka-mailto link na at updated ang fallback email */}
                <a 
                  href={`mailto:${business?.email || 'mpmicroitsolutions@gmail.com'}`}
                  style={{ wordBreak: 'break-all' }} // Para hindi umapaw sa mobile
                >
                  {business?.email || 'mpmicroitsolutions@gmail.com'}
                </a>
              </span>
            </li>
            <li>
              <span>Hours</span>
              <span>{business?.hours || 'Monday – Friday, 8:00 AM – 5:00 PM'}</span>
            </li>
          </ul>
        </div>
        <ContactForm preferredService={preferredService} />
      </div>
    </section>
  );
}