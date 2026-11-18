import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import { VALUES } from '../data/content';

/* ───────── Copy and links: edit here, not in the JSX ───────── */

const CONTACT_HREF = '/#contact';
const MAP_HREF = 'https://maps.app.goo.gl/FMQM6CuwvztCVcep6';

const PILLARS = [
  {
    label: 'Mission',
    body: 'Dependable network, security and IT hardware solutions that keep businesses, offices and homes connected and protected.',
  },
  {
    label: 'Vision',
    body: 'To be the trusted local partner for practical, well-installed technology that works day after day.',
  },
];

const EXPERTISE = [
  { title: 'Network Infrastructure', body: 'Structured cabling, routers, switches and Wi-Fi, set up for stable connectivity.' },
  { title: 'Security Systems', body: 'CCTV and surveillance installed and configured to protect your premises.' },
  { title: 'IT Equipment', body: 'Computers, peripherals and networking hardware for offices and homes.' },
  { title: 'Installation & Setup', body: 'Every system tested and ready to use from day one.' },
];

/* ───────── Helpers ───────── */

type RevealProps = { as?: ElementType; className?: string; delay?: number; children: ReactNode };

function Reveal({ as: Tag = 'div', className = '', delay = 0, children }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`fd ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Numbered heading on the left, content on the right. */
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="ab-sec ab-split" aria-labelledby={id}>
      <Reveal>
        <h2 id={id}>{title}</h2>
      </Reveal>
      <div>{children}</div>
    </section>
  );
}

/* ───────── Page ───────── */

export default function About() {
  return (
    <section className="ab" id="about">
      <div className="wrap">
        {/* Intro */}
        <header className="ab-intro">
          <Reveal as="h2">Technology solutions built around your needs.</Reveal>
          <Reveal as="p" className="lead" delay={120}>
            MP Micro IT Solutions is an IT services and hardware provider in Santa Mesa, Manila. We
            set up reliable networks and security systems, and supply the equipment that keeps
            offices and homes running.
          </Reveal>
        </header>

        <Reveal className="ab-photo">
          <img
            src="image.png"
            alt="MP Micro IT Solutions at work"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const box = e.currentTarget.parentElement;
              if (box) box.style.display = 'none';
            }}
          />
        </Reveal>

        {/* Mission & vision */}
        <section className="ab-sec ab-pillars" aria-label="Mission and vision">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={i * 100}>
              <h3>{p.label}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </section>

        {/* What we do */}
        <Section id="ab-do" title="What we do">
          <ul className="ab-list">
            {EXPERTISE.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 70}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Why clients choose us */}
        <Section id="ab-why" title="Why clients choose us">
          <ul className="ab-vals">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 70}>
                <b>{v.title}</b>
                <span>{v.body}</span>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Call to action */}
        <Reveal className="ab-cta">
          <div>
            <h2>Let&rsquo;s plan your next setup.</h2>
            <p>Tell us what your office, property or equipment needs and we&rsquo;ll recommend the right solution.</p>
          </div>
          <div className="ab-actions">
            <a className="ab-btn ab-btn--primary" href={CONTACT_HREF}>
              Get in touch
            </a>
            <a className="ab-btn" href={MAP_HREF} target="_blank" rel="noopener noreferrer">
              Find us <span aria-hidden="true">&nearr;</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}