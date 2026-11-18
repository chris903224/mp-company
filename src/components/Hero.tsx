import { useRef, useImperativeHandle, type Ref } from 'react';
import { HERO_STAGES } from '../data/content';
import { useHero } from '../hooks/useHero';
import HeroObject from './HeroObject';
import StageDetail from './StageDetail';

interface HeroProps {
  ref?: Ref<HTMLElement>;
}

export default function Hero({ ref }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const zmRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hlRefs = useRef<Array<HTMLDivElement | null>>([]);
  const objRef = useRef<HTMLDivElement | null>(null);

  // Blank ref para sa planRef na tinanggal na natin (para walang error)
  const planRef = useRef<SVGSVGElement | null>(null);

  useImperativeHandle(ref, () => sectionRef.current as HTMLElement, []);

  const { isLive, showFirst, activeStep, goToStep } = useHero({
    sectionRef,
    pinRef,
    zmRefs,
    hlRefs,
    objRef,
    planRef,
  });

  const sectionClass = ['seq', isLive ? 'live' : '', showFirst ? 'a1' : '']
    .filter(Boolean)
    .join(' ');

  const ctaTabIndex = isLive && !showFirst ? -1 : 0;

  return (
    <section ref={sectionRef} className={sectionClass} id="home" aria-label="Image walkthrough">
      <div className="pin" ref={pinRef}>
        {HERO_STAGES.map((stage, i) => (
          <article key={stage.name} className="stg" data-name={stage.name}>
            <div
              className="zm"
              ref={(el) => {
                zmRefs.current[i] = el;
              }}
            >
              <img
                src={stage.img}
                alt={stage.alt}
                width={stage.width}
                height={stage.height}
                decoding="async"
                fetchPriority={stage.fetchpriority}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
            </div>

            <div
              className="hl"
              ref={(el) => {
                hlRefs.current[i] = el;
              }}
            >
              {i === 0 ? (
                <div className="wrap stx">
                  <div className="hc">
                    <h1 className="a">{stage.title}</h1>
                    <p className="a">{stage.body}</p>
                    <StageDetail index={i} compact />
                    <div className="cta a">
                      <a className="btn btn-p" href="#services" tabIndex={ctaTabIndex}>
                        Explore Our Services
                      </a>
                      <a className="btn" href="#contact" tabIndex={ctaTabIndex}>
                        Request a Quote
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="wrap stx">
                  <div className="hc">
                    <p className="eb">{stage.eyebrow}</p>
                    <h2>{stage.title}</h2>
                    <p>{stage.body}</p>
                    <StageDetail index={i} />
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}

        <nav className="sqn" aria-label="Walkthrough steps">
          {HERO_STAGES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Go to step ${i + 1} of ${HERO_STAGES.length}: ${s.name}`}
              aria-current={activeStep === i ? 'step' : undefined}
              onClick={() => goToStep(i)}
            >
              <i></i>
            </button>
          ))}
        </nav>

        {/* Ibinalik natin si HeroObject para lumabas ang mga transparent images */}
        <HeroObject containerRef={objRef} isLive={isLive} />
      </div>
    </section>
  );
}