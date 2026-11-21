import { useEffect, useMemo, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { useReveal } from '../hooks/useReveal';
import type { ProjectItem } from '../types';

/* ───────── HARDCODED LOCAL IMAGES ───────── */
// Gumamit ng "/" sa simula para mag-point sa public folder root
const HARDCODED_PROJECTS = [
  {
    id: '1',
    img: '/work-1.png', 
    alt: 'Network Cabling Project',
    captionTitle: 'Structured Cabling',
    captionBody: 'Professional network cabling setup.',
    category: 'network'
  },
  {
    id: '2',
    img: '/work-2.png', 
    alt: 'Server Rack Setup',
    captionTitle: 'Server Rack',
    captionBody: 'Organized server rack installation.',
    category: 'network'
  },
  {
    id: '3',
    img: '/work-3.png', 
    alt: 'CCTV Installation',
    captionTitle: 'CCTV Surveillance',
    captionBody: 'Security camera system setup.',
    category: 'security'
  },
  {
    id: '4',
    img: '/work-4.png', 
    alt: 'Security System',
    captionTitle: 'Access Control',
    captionBody: 'Modern security access points.',
    category: 'security'
  },
  {
    id: '5',
    img: '/work-5.png', 
    alt: 'IT Infrastructure',
    captionTitle: 'Tech Infrastructure',
    captionBody: 'Core IT infrastructure components.',
    category: 'network'
  }
];

/* ───────── Data ───────── */

const CATEGORIES = [
  { 
    id: 'network', 
    label: 'Network Infrastructure', 
    match: /cabl|network|\blan\b|fib(er|re)|rack|patch|switch|wi-?fi|router|terminat|conduit/i 
  },
  { 
    id: 'security', 
    label: 'CCTV & Security', 
    match: /cctv|camera|surveillance|security|access control|alarm|\bdvr\b|\bnvr\b/i 
  },
];

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

/* ───────── Card (Picture Only) ───────── */

function Card({ item, onOpen }: { item: any; onOpen: (index: number) => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <figure ref={ref} className="fd pg-item">
      <button type="button" className="pg-card picture-only" onClick={() => onOpen(item.index)}>
        <span className="pg-media">
          <img src={item.img} alt={item.alt} loading="lazy" decoding="async" onError={hideBroken} />
        </span>
      </button>
    </figure>
  );
}

/* ───────── Page ───────── */

interface ProjectsProps {
  projects: ProjectItem[]; 
  isLoading: boolean;
}

// FIXED: Ginamitan ng underscore (_) ang projects para di magka-warning na unused
// O pwede rin na tanggalin sa destructuring kung di talaga gagamitin: ({ isLoading }: ProjectsProps)
export default function Projects({ projects: _projects, isLoading }: ProjectsProps) {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // --- LOGIC: Use Hardcoded Local Data ---
  const ITEMS = useMemo(() => {
    return HARDCODED_PROJECTS.map((p, index) => {
      const categoryObj = CATEGORIES.find(c => c.id === p.category) || CATEGORIES[0];
      
      return { 
        index, 
        img: p.img, 
        alt: p.alt, 
        title: p.captionTitle, 
        body: p.captionBody, 
        category: categoryObj
      };
    });
  }, []); 

  const TABS = useMemo(() => {
    return [
      { id: 'all', label: 'All' }, 
      ...CATEGORIES.filter((c) => ITEMS.some((i) => i.category.id === c.id))
    ];
  }, [ITEMS]);

  const visible = useMemo(
    () => (filter === 'all' ? ITEMS : ITEMS.filter((i) => i.category.id === filter)),
    [filter, ITEMS],
  );
  
  const current = open === null ? null : ITEMS[open];
  const pos = current ? visible.findIndex((i) => i.index === current.index) : -1;

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

  if (isLoading && ITEMS.length === 0) {
    return (
      <section className="pg" id="portfolio">
        <div className="wrap" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--mut)' }}>
          Loading portfolio...
        </div>
      </section>
    );
  }

  if (ITEMS.length === 0) return null;

  return (
    <>
      <section className="ph" aria-labelledby="ph-title">
        <div className="wrap">
          <h1 id="ph-title" className="ph-title">
            <span>Engineering Technology.</span>
            <span>Delivering Solutions.</span>
          </h1>
          <p className="ph-lead">
            IT infrastructure, networking, and security installations, delivered end to end.
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

          {/* Grid: Picture Only */}
          <div className="pg-grid" key={filter}>
            {visible.map((item) => (
              <Card key={item.img + item.index} item={item} onOpen={setOpen} />
            ))}
          </div>
        </div>

        {/* Dialog: Picture Only with Controls */}
        <dialog
          ref={dialogRef}
          className="pg-dialog picture-only-mode"
          aria-label="Project Image Viewer"
          onClose={() => setOpen(null)}
          onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
          }}
        >
          {current && (
            <div className="pg-panel-fullscreen">
              <img 
                key={current.index} 
                className="pg-dimg-full" 
                src={current.img} 
                alt={current.alt} 
                onError={hideBroken} 
              />
              
              {visible.length > 1 && (
                <>
                  <button 
                    type="button" 
                    className="pg-nav-btn prev" 
                    onClick={(e) => { e.stopPropagation(); step(-1); }} 
                    aria-label="Previous image"
                  >
                    <Icon d={ICONS.prev} />
                  </button>
                  
                  <button 
                    type="button" 
                    className="pg-nav-btn next" 
                    onClick={(e) => { e.stopPropagation(); step(1); }} 
                    aria-label="Next image"
                  >
                    <Icon d={ICONS.next} />
                  </button>
                </>
              )}

              <button 
                type="button" 
                className="pg-close-btn" 
                onClick={() => dialogRef.current?.close()} 
                aria-label="Close viewer"
              >
                <Icon d={ICONS.close} />
              </button>
            </div>
          )}
        </dialog>
      </section>
    </>
  );
}