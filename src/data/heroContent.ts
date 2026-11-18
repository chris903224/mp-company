/**
 * Detail layer for each hero stage — what MP Micro IT Solutions does, why it
 * matters, and how the work is done.
 *
 * ORDER: one entry per stage, in the same order as HERO_STAGES in
 * `data/content.ts`. Matches the live page:
 *   0 → Overview, 1 → IT Services & Hardware Solutions,
 *   2 → Structured Cabling & Connectivity, 3 → Hardware & Security Systems.
 * If you reorder the stages, reorder the entries below too.
 *
 * ACCURACY: this is draft copy written from the hero text only. Read every
 * sentence and edit anything that isn't true for your business.
 *
 * STATS: only add numbers you can stand behind (years in business, number of
 * installations, etc.). A stage with no `stats` simply shows none.
 */

export interface HeroStagePoint {
  /** Short pillar name, e.g. "Site survey" */
  label: string;
  /** One sentence that explains it */
  text: string;
}

export interface HeroStageStat {
  /** The number or short value, e.g. "15+" */
  value: string;
  /** What it measures, e.g. "Years in business" */
  label: string;
}

export interface HeroStageDetail {
  /** 1–2 sentences explaining the service in plain language */
  purpose: string;
  /** Exactly three pillars read best */
  points: HeroStagePoint[];
  /** Optional proof points */
  stats: HeroStageStat[];
}

export const HERO_DETAILS: HeroStageDetail[] = [
  // 0 — Overview (shown in compact mode: stats only)
  {
    purpose: '',
    points: [],
    stats: [
      { value: '3', label: 'Core service lines' },
      { value: '3', label: 'Client types served' },
    ],
  },

  // 1 — IT Services & Hardware Solutions (overview of the three service lines)
  {
    purpose:
      'MP Micro IT Solutions looks after the technology your business relies on every day: the cabling behind the walls, the cameras at the door, and the computers on your desks.',
    points: [
      { label: 'Network infrastructure', text: 'Structured cabling, LAN setup and cable management for offices and commercial spaces.' },
      { label: 'Physical security', text: 'CCTV and security systems planned around your actual site.' },
      { label: 'IT equipment', text: 'Computers, networking gear and peripherals matched to your work and budget.' },
    ],
    stats: [],
  },

  // 2 — Structured Cabling & Connectivity
  {
    purpose:
      'A fast, stable network starts with clean cabling. We plan, install and test network cabling so your office stays connected without constant downtime.',
    points: [
      { label: 'Site survey', text: 'We check the layout, cable routes and equipment needs before we quote.' },
      { label: 'Clean installation', text: 'Organized, labeled cable runs and tidy rack work that are easy to maintain.' },
      { label: 'Tested & documented', text: 'Every run is tested, so problems are caught before you start using it.' },
    ],
    stats: [],
  },

  // 3 — Hardware & Security Systems
  {
    purpose:
      'We supply the IT hardware your team needs and install CCTV that protects your people, property and inventory, covering entrances, corridors and blind spots.',
    points: [
      { label: 'Right-fit hardware', text: 'Specifications matched to what your team actually does.' },
      { label: 'Coverage planning', text: 'Camera types and positions chosen for the areas that matter most.' },
      { label: 'Setup & support', text: 'Help with installation, configuration and questions after you buy.' },
    ],
    stats: [],
  },
];