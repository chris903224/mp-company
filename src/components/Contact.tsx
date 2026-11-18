import { BUSINESS } from '../data/content';
import ContactForm from './ContactForm';

interface ContactProps {
  preferredService: string | null;
}

export default function Contact({ preferredService }: ContactProps) {
  return (
    <section className="ct" id="contact">
      <div className="wrap cg">
        <div>
          <p className="eb">Contact</p>
          <h2>Let’s Build a Better Technology Setup.</h2>
          <p style={{ color: 'var(--mu)', maxWidth: '46ch' }}>
            Need network cabling, a CCTV system, or IT equipment? Get in touch with MP Micro IT
            Solutions.
          </p>
          <ul className="info">
            <li>
              <span>Address</span>
              <span>{BUSINESS.address}</span>
            </li>
            <li>
              <span>Phone</span>
              <span>
                <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
              </span>
            </li>
            <li>
              <span>Email</span>
              <span className="ph">{BUSINESS.emailPending}</span>
            </li>
            <li>
              <span>Hours</span>
              <span>{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>
        <ContactForm preferredService={preferredService} />
      </div>
    </section>
  );
}