import { useState, useEffect, type RefObject } from 'react';
import { HERO_OBJECT_IMAGES } from '../data/content';

interface HeroObjectProps {
  containerRef: RefObject<HTMLDivElement | null>;
  isLive: boolean;
}

export default function HeroObject({ containerRef, isLive }: HeroObjectProps) {
  const [hasLoaded, setHasLoaded] = useState(false);

  // I-check agad kung naka-cache na ang image para hindi mag-flash ang floor plan
  useEffect(() => {
    if (!containerRef.current) return;
    const imgs = containerRef.current.querySelectorAll('img');
    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        setHasLoaded(true);
      }
    });
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={`obj${hasLoaded ? ' hasobj' : ''}`}
      id="obj"
      aria-hidden="true"
      style={isLive ? undefined : { display: 'none' }}
    >
      {HERO_OBJECT_IMAGES.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={900}
          height={900}
          decoding="async"
          onLoad={() => setHasLoaded(true)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
          }}
        />
      ))}
    </div>
  );
}