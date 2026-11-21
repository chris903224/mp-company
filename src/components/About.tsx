
import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import {
  BUSINESS_INFO,
  MISSION_VISION,
  VALUES,
} from '../data/content';

/* ---------- Copy and Links ---------- */

const CONTACT_HREF = '/#contact';

const MAP_HREF =
  'https://maps.app.goo.gl/FMQM6CuwvztCVcep6';

/* ---------- Company Expertise ---------- */

const EXPERTISE = [
  {
    title: 'Network Infrastructure',
    body: 'Structured cabling installation, cable termination, LAN configuration, routers, switches, and connectivity solutions designed to support reliable network performance.',
  },
  {
    title: 'CCTV & Security Systems',
    body: 'Supply, installation, and configuration of indoor and outdoor surveillance systems to help businesses and property owners monitor and protect their premises.',
  },
  {
    title: 'IT Equipment & Hardware',
    body: 'Sourcing and supply of desktop computers, laptops, peripherals, networking devices, and essential technology equipment for different operational needs.',
  },
  {
    title: 'Installation & Technical Setup',
    body: 'Equipment installation, system configuration, connectivity testing, and technical implementation based on each client’s requirements.',
  },
];

/* ---------- Helpers ---------- */

type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
};

function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
}: RevealProps) {
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

/* ---------- Split Section Helper ---------- */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="ab-sec ab-split"
      aria-labelledby={id}
    >
      <Reveal>
        <h2 id={id}>{title}</h2>
      </Reveal>

      <div>{children}</div>
    </section>
  );
}

/* ---------- About Page ---------- */

export default function About() {
  return (
    <section className="ab" id="about">
      <div className="wrap">

        {/* =================================
            INTRODUCTION
        ================================= */}

        <div className="ab-intro">
          <Reveal>
            <span className="ab-eyebrow">
              ABOUT {BUSINESS_INFO.name.toUpperCase()}
            </span>

            <h2>
              Technology solutions built around your needs.
            </h2>

            <p className="lead">
              {BUSINESS_INFO.name} is an IT solutions and
              hardware provider committed to helping businesses
              and individuals meet their technology needs.
              We specialize in network infrastructure, CCTV
              and security systems, and IT hardware supply,
              delivering practical solutions that support
              connectivity, security, and productivity.
            </p>
          </Reveal>
        </div>

        {/* =================================
            COMPANY IMAGE
        ================================= */}

        <Reveal className="ab-photo">
          <img
            src="image.png"
            alt="MP Micro IT Solutions at work"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden';
            }}
          />
        </Reveal>

        {/* =================================
            MISSION & VISION
        ================================= */}

        <section
          className="ab-sec ab-pillars"
          aria-label="Company mission and vision"
        >
          {MISSION_VISION.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 100}
            >
              <span className="ab-eyebrow">
                {item.title}
              </span>

              <h3>{item.heading}</h3>

              <p>{item.body}</p>
            </Reveal>
          ))}
        </section>

        {/* =================================
            COMPANY EXPERTISE
        ================================= */}

        <Section
          id="ab-do"
          title="What we do"
        >
          <ul className="ab-list">
            {EXPERTISE.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
              >
                <h3>{item.title}</h3>

                <p>{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* =================================
            COMPANY VALUES
        ================================= */}

        <Section
          id="ab-why"
          title="What sets us apart"
        >
          <ul className="ab-vals">
            {VALUES.map((value, i) => (
              <Reveal
                as="li"
                key={value.title}
                delay={i * 70}
              >
                <b>{value.title}</b>

                <span>{value.body}</span>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* =================================
            BUSINESS LOCATION
        ================================= */}

        <Section
          id="ab-location"
          title="Visit our office"
        >
          <Reveal>
            <h3>{BUSINESS_INFO.name}</h3>

            <p>
              {BUSINESS_INFO.address}
            </p>

            <p>
              Our office is located in Santa Mesa, Manila.
              Contact us to discuss your project, service
              requirements, or IT equipment needs.
            </p>

            <div className="ab-actions">
              <a
                className="ab-btn"
                href={MAP_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                View our location
              </a>
            </div>
          </Reveal>
        </Section>

        {/* =================================
            CALL TO ACTION
        ================================= */}

        <Reveal className="ab-sec ab-cta">
          <div>
            <span className="ab-eyebrow">
              LET'S WORK TOGETHER
            </span>

            <h2>
              Let's build a better technology setup.
            </h2>

            <p>
              Tell us about your business, property, or
              equipment requirements. MP Micro IT Solutions
              is ready to help you explore practical
              technology solutions for your needs.
            </p>
          </div>

          <div className="ab-actions">
            <a
              className="ab-btn ab-btn--primary"
              href={CONTACT_HREF}
            >
              Get in touch
            </a>

            <a
              className="ab-btn"
              href={MAP_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find us
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
