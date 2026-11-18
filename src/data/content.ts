import type { HeroStage, ProjectItem, ServiceItem, StepItem } from '../types';

/* ---------- Business info ---------- */
export const BUSINESS = {
  phone: '+63 956 729 6257',
  phoneHref: 'tel:+639567296257',
  address: 'Donia Elena Tower, P. Sanchez St. corner 3rd St., Santa Mesa, Manila',
  hours: 'Monday – Friday, 8:00 AM – 5:00 PM',
  hoursShort: 'Mon – Fri, 8:00 AM – 5:00 PM',
  emailPending: '[Official business email: to be confirmed]',
  emailPendingShort: '[Email: to be confirmed]',
};

/* ---------- Nav ---------- */
export const NAV_IDS = ['about', 'services', 'walkthrough', 'process', 'contact'] as const;

/* ---------- Hero walkthrough ---------- */
export const HERO_STAGES: HeroStage[] = [
  {
    name: 'Glass Entrance',
    img: 'cctv.jpg',
    alt: 'Glass entrance of the office',
    width: 1920,
    height: 1080,
    fetchpriority: 'high',
    tag: 'Santa Mesa, Manila.',
    title: 'Reliable IT Solutions. Smarter Business Operations.',
    body: 'Network cabling, CCTV and security systems, and IT hardware supply for businesses, offices, and residential properties.',
    primaryCta: true,
  },
  {
    name: 'Reception and Main Hallway',
    img: 'router.jpg',
    alt: 'Reception area and main hallway',
    width: 1920,
    height: 1080,
    fetchpriority: 'low',
    eyebrow: 'Based in Santa Mesa',
    title: 'IT Services & Hardware Solutions.',
    body: 'Reliable network infrastructure, physical security systems, and essential IT equipment.',
  },
  {
    name: 'Collaborative Workspace',
    img: 'cabling.jpg',
    alt: 'Collaborative workspace',
    width: 1920,
    height: 1080,
    fetchpriority: 'low',
    eyebrow: 'Infrastructure',
    title: 'Structured Cabling & Connectivity.',
    body: 'Structured cabling, LAN setup, and cable management.',
  },
  {
    name: 'Technical Lab',
    img: 'computer.jpg',
    alt: 'Technical lab with network switches and a hardware workbench',
    width: 1920,
    height: 1080,
    fetchpriority: 'low',
    eyebrow: 'Deployment',
    title: 'Hardware & Security Systems.',
    body: 'IT hardware supply and CCTV installation.',
  },
];

/* ---------- Hero product objects (transparent PNG/WebP) ---------- */
export const HERO_OBJECT_IMAGES = [
  { src: 'object-01-cctv.png', alt: '' },
  { src: 'object-02-switch.png', alt: '' },
  { src: 'object-03-cabling.png', alt: '' },
  { src: 'object-04-hardware.png', alt: '' },
];

/* ---------- Ticker items ---------- */
export const TICKER_ITEMS = [
  'Network Cabling',
  'CCTV & Security Systems',
  'IT Hardware Supply',
  'Santa Mesa, Manila',
];

/* ---------- About values ---------- */
export const VALUES = [
  { title: 'Local Presence', body: 'Based in Santa Mesa, Manila.' },
  {
    title: 'Practical IT Solutions',
    body: 'Technology services focused on addressing real business and technical needs.',
  },
  {
    title: 'Integrated Services',
    body: 'Network cabling, security systems, and IT hardware from one provider.',
  },
  {
    title: 'Customer-Focused Solutions',
    body: 'Solutions designed around the specific requirements of each client.',
  },
];

/* ---------- Services ---------- */
export const SERVICES: ServiceItem[] = [
  {
    id: 'network',
    title: 'Network Cabling & Infrastructure',
    bullets: [
      'Structured cabling installation, termination, and layout design for offices and commercial spaces.',
      'Local Area Network (LAN) setup, router/switch configuration, and network troubleshooting.',
      'Cable management and connectivity optimization for stable internet and intranet performance.',
    ],
  },
  {
    id: 'hardware',
    title: 'IT Product Reselling & Hardware Supply',
    bullets: [
      'Sourcing and supply of desktop computers, laptops, networking peripherals, and office IT equipment.',
      'Provision of cabling materials, routers, switches, and surveillance accessories.',
      'Consultation on hardware specifications tailored to your budget and operational requirements.',
    ],
  },
  {
    id: 'cctv',
    title: 'CCTV & Security System Installation',
    bullets: [
      'Supply and professional installation of indoor and outdoor surveillance camera systems.',
      'DVR/NVR setup, hard drive configuration, and remote mobile/desktop viewing integration.',
      'System maintenance, camera realignment, and troubleshooting of existing security setups.',
    ],
  },
];

export const SERVICE_IMAGES = ['image6.png', 'image7.png', 'image8.png'];

/* ---------- Projects ---------- */
export const PROJECTS: ProjectItem[] = [
  {
    img: 'cabling-01.jpg',
    alt: 'Network rack',
    captionTitle: 'Network rack',
    captionBody: 'Patch panels with neatly dressed blue patch cabling.',
  },
  {
    img: 'cabling-02.jpg',
    alt: 'Cable run',
    captionTitle: 'Cable run',
    captionBody: 'Cabling laid out across the office floor before termination.',
  },
  {
    img: 'cabling-03.jpg',
    alt: 'Wall-mounted cabinet',
    captionTitle: 'Wall-mounted cabinet',
    captionBody: 'Patch panel and switch enclosure, mounted and wired.',
  },
  {
    img: 'cabling-04.jpg',
    alt: 'On-site installation',
    captionTitle: 'On-site installation',
    captionBody: 'Technicians pulling and terminating cable on location.',
  },
  {
    img: 'cabling-05.jpg',
    alt: 'Floor trunking outlet',
    captionTitle: 'Floor trunking outlet',
    captionBody: 'Labeled ports D17 and D18 on aluminum floor trunking.',
  },
  {
    img: 'cabling-06.jpg',
    alt: 'Window wall routing',
    captionTitle: 'Window wall routing',
    captionBody: 'Cable routed along the perimeter wall by the windows.',
  },
  {
    img: 'cabling-07.jpg',
    alt: 'Labeled wall outlets',
    captionTitle: 'Labeled wall outlets',
    captionBody: 'Ports D89 and D90, clearly marked for easy tracing.',
  },
  {
    img: 'cabling-08.jpg',
    alt: 'Outlet and cable drop',
    captionTitle: 'Outlet and cable drop',
    captionBody: 'Yellow patch cable on a surface-mounted outlet.',
  },
  {
    img: 'cabling-09.jpg',
    alt: 'Finished wall outlets',
    captionTitle: 'Finished wall outlets',
    captionBody: 'Network and power outlets installed flush on the wall.',
  },
];

/* ---------- Process ---------- */
export const STEPS: StepItem[] = [
  { num: '01', title: 'Initial Consultation', body: 'Understand the client’s technical requirements.' },
  { num: '02', title: 'Assessment', body: 'Evaluate the equipment, infrastructure, or technical issue.' },
  { num: '03', title: 'Implementation', body: 'Perform the agreed technical service or installation.' },
  { num: '04', title: 'Technical Assistance', body: 'Provide appropriate post-service support.' },
];

/* ---------- Contact form service options ---------- */
export const SERVICE_OPTIONS = [
  'Network Cabling & Infrastructure',
  'IT Product Reselling & Hardware Supply',
  'CCTV & Security System Installation',
  'Other / Not sure yet',
];