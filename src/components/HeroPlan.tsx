import type { RefObject } from 'react';

interface HeroPlanProps {
  svgRef: RefObject<SVGSVGElement | null>;
}

export default function HeroPlan({ svgRef }: HeroPlanProps) {
  return (
    <svg
      ref={svgRef}
      className="plan"
      id="plan"
      viewBox="0 0 300 170"
      aria-hidden="true"
      focusable="false"
    >
      <g className="g1">
        <path pathLength={1} d="M150.0 28.0 L263.1 84.6 L150.0 141.1 L36.9 84.6 Z" />
        <path pathLength={1} d="M100.5 52.7 L171.2 88.1" />
        <path pathLength={1} d="M220.7 63.4 L171.2 88.1" />
        <path pathLength={1} d="M142.9 74.0 L79.3 105.8" />
        <path pathLength={1} d="M142.9 102.2 L185.4 123.5" />
      </g>
      <g className="g2">
        <ellipse cx="160.6" cy="58.1" rx="4" ry="2" />
        <ellipse cx="203.0" cy="93.4" rx="4" ry="2" />
        <ellipse cx="89.9" cy="79.3" rx="4" ry="2" />
        <ellipse cx="132.3" cy="114.6" rx="4" ry="2" />
        <ellipse cx="142.9" cy="88.1" rx="4" ry="2" />
      </g>
      <g className="g3">
        <path pathLength={1} d="M142.9 88.1 L181.8 68.7 L160.6 58.1" />
        <path pathLength={1} d="M142.9 88.1 L178.3 105.8 L203.0 93.4" />
        <path pathLength={1} d="M142.9 88.1 L107.6 70.4 L89.9 79.3" />
        <path pathLength={1} d="M142.9 88.1 L111.1 104.0 L132.3 114.6" />
      </g>
      <g className="g4">
        <path pathLength={1} d="M142.9 83.2 L152.8 88.1 L142.9 93.1 L133.0 88.1 Z" />
        <path pathLength={1} d="M256.1 82.4 L261.7 85.3 L256.1 88.1 L250.4 85.3 Z" />
        <path pathLength={1} d="M256.1 85.3 L215.1 69.0 L210.8 102.2 Z" />
      </g>
    </svg>
  );
}