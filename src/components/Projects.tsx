import { useEffect, useMemo, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { PROJECTS } from '../data/content';
import { useReveal } from '../hooks/useReveal';

/* ───────── Data ───────── */

// Display order. A project's own `category` wins; otherwise it is guessed from its text.
const CATEGORIES = [
  { id: 'network', label: 'Network Infrastructure', match: /cabl|network|\blan\b|fib(er|re)|rack|patch|switch|wi-?fi|router|terminat|conduit/i },
  { id: 'hardware', label: 'IT Hardware', match: /hardware|computer|laptop|desktop|\bpc\b|printer|monitor|workstation/i },
  { id: 'security', label: 'CCTV & Security', match: /cctv|camera|surveillance|security|access control|alarm|\bdvr\b|\bnvr\b/i },
];

const ITEMS = PROJECTS.map((p, index) => {
  const declared = ((p as { category?: string }).category ?? '').trim().toLowerCase();
  const text = `${p.alt} ${p.captionTitle} ${p.captionBody}`;
  const category =
    CATEGORIES.find((c) => c.id === declared || c.label.toLowerCase() === declared) ??
    [...CATEGORIES].reverse().find((c) => c.match.test(text)) ?? // most specific first
    CATEGORIES[0];
  return { index, img: p.img, alt: p.alt, title: p.captionTitle, body: p.captionBody, category };
});

type Item = (typeof ITEMS)[number];

// Only offer filters that have projects. With a single category, no filter bar at all.
const TABS = [{ id: 'all', label: 'All' }, ...CATEGORIES.filter((c) => ITEMS.some((i) => i.category.id === c.id))];

const ICONS = {
  prev: 'M19 12H5M11 6l-6 6 6 6',
  next: 'M5 12h14M13 6l6 6-6 6',
  close: 'M6 6l12 12M18 6L6 18',
};

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={d} />
  </svg>
);

const hideBroken = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = 'hidden';
};

/* ───────── Card ───────── */

function Card({ item, onOpen }: { item: Item; onOpen: (index: number) => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <figure ref={ref} className="fd pg-item">
      <button type="button" className="pg-card" onClick={() => onOpen(item.index)}>
        <span className="pg-media">
          <img src={item.img} alt="" loading="lazy" decoding="async" onError={hideBroken} />
        </span>
        <span className="pg-cap">
          <span className="pg-cat">{item.category.label}</span>
          <span className="pg-name">{item.title}</span>
          <span className="pg-desc">{item.body}</span>
        </span>
      </button>
    </figure>
  );
}

/* ───────── Page ───────── */

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? ITEMS : ITEMS.filter((i) => i.category.id === filter)),
    [filter],
  );
  const current = open === null ? null : ITEMS[open];
  const pos = current ? visible.findIndex((i) => i.index === current.index) : -1;

  // Open as a native modal and lock page scroll while it is showing.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open === null || !dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const step = (dir: 1 | -1) => {
    if (visible.length > 1) setOpen(visible[(pos + dir + visible.length) % visible.length].index);
  };

  return (
    <>
      <section className="ph" aria-labelledby="ph-title">
        <div className="wrap">
          <h1 id="ph-title" className="ph-title">
            <span>Engineering Technology.</span>
            <span>Delivering Solutions.</span>
          </h1>
          <p className="ph-lead">
            IT infrastructure, networking, hardware and security installations, delivered end to end.
          </p>
        </div>
      </section>

      <section className="pg" id="portfolio" aria-labelledby="pg-title">
        <div className="wrap">
          <div className="pg-head">
            <h2 id="pg-title" className="pg-title">Selected work</h2>
            {TABS.length > 2 && (
              <div className="pg-filters" role="group" aria-label="Filter projects">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="pg-filter"
                    aria-pressed={filter === t.id}
                    onClick={() => setFilter(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pg-grid" key={filter}>
            {visible.map((item) => (
              <Card key={item.img} item={item} onOpen={setOpen} />
            ))}
          </div>
        </div>

        <dialog
          ref={dialogRef}
          className="pg-dialog"
          aria-label={current?.title}
          onClose={() => setOpen(null)}
          onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
          }}
        >
          {current && (
            <div className="pg-panel">
              <img key={current.index} className="pg-dimg" src={current.img} alt={current.alt} onError={hideBroken} />
              <div className="pg-dinfo">
                <p className="pg-cat">{current.category.label}</p>
                <h2 className="pg-dtitle">{current.title}</h2>
                <p className="pg-ddesc">{current.body}</p>
                {visible.length > 1 && (
                  <div className="pg-dnav">
                    <button type="button" className="pg-step" onClick={() => step(-1)} aria-label="Previous project">
                      <Icon d={ICONS.prev} />
                    </button>
                    <span className="pg-dcount" aria-live="polite">{pos + 1} / {visible.length}</span>
                    <button type="button" className="pg-step" onClick={() => step(1)} aria-label="Next project">
                      <Icon d={ICONS.next} />
                    </button>
                  </div>
                )}
              </div>
              <button type="button" className="pg-close" onClick={() => dialogRef.current?.close()} aria-label="Close">
                <Icon d={ICONS.close} />
              </button>
            </div>
          )}
        </dialog>
      </section>
    </>
  );
}