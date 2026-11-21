import type { HeroStage, ServiceItem, StepItem } from '../types';

/* ---------- Navigation ---------- */
export const NAV_IDS = [
  'about',
  'services',
  'walkthrough',
  'process',
  'contact',
] as const;

/* ---------- Business Information ---------- */
export const BUSINESS_INFO = {
  name: 'MP Micro IT Solutions',
  address:
    'Doña Elena Tower, P. Sanchez Street corner 3rd Street, Santa Mesa, Manila, Metro Manila, Philippines.',
  location: 'Santa Mesa, Manila, Metro Manila',
  tagline: 'Reliable IT Infrastructure. Smarter Business Operations.',
  serviceArea:
    'Serving businesses, offices, and property owners across different locations.',
};

/* ---------- Mission & Vision ---------- */
export const MISSION_VISION = [
  {
    id: 'mission',
    title: 'Our Mission',
    heading: 'Delivering Technology That Moves Businesses Forward.',
    body: 'MP Micro IT Solutions is committed to providing reliable, innovative, and cost-effective IT solutions that help businesses and individuals improve connectivity, strengthen security, and enhance productivity. Through quality technical services, practical technology solutions, and customer-focused support, we aim to make technology more accessible and effective for every client.',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    heading: 'Building a More Connected and Technology-Driven Future.',
    body: 'To become a trusted IT solutions provider recognized for excellence, integrity, and innovation. We envision empowering businesses and individuals through dependable technology, continuous improvement, and lasting partnerships that support their growth in an evolving digital world.',
  },
];

/* ---------- Hero Walkthrough ---------- */
export const HERO_STAGES: HeroStage[] = [
  {
    name: 'Glass Entrance',
    img: 'cctv.jpg',
    alt: 'Professional business entrance representing reliable IT services',
    width: 1920,
    height: 1080,
    fetchpriority: 'high',
    tag: 'IT Solutions for Businesses & Properties',
    title: 'Reliable IT Infrastructure for Better Business Operations.',
    body: 'From network cabling and CCTV installation to IT hardware supply, we deliver practical technology solutions that help businesses stay connected, equipped, and secure.',
    primaryCta: true,
  },
  {
    name: 'Reception and Main Hallway',
    img: 'router.jpg',
    alt: 'Office networking equipment and connectivity infrastructure',
    width: 1920,
    height: 1080,
    fetchpriority: 'low',
    eyebrow: 'Network Solutions',
    title: 'Build a More Connected Workplace.',
    body: 'Establish dependable office connectivity through LAN installation, router and switch configuration, and network infrastructure solutions.',
  },
  {
    name: 'Collaborative Workspace',
    img: 'cabling.jpg',
    alt: 'Structured network cabling and organized cable infrastructure',
    width: 1920,
    height: 1080,
    fetchpriority: 'low',
    eyebrow: 'Network Infrastructure',
    title: 'Organized Cabling. Reliable Connectivity.',
    body: 'Structured cabling, network installation, and cable management designed to support your daily business operations and connectivity requirements.',
  },
  {
    name: 'Technical Lab',
    img: 'computer.jpg',
    alt: 'IT hardware and surveillance equipment prepared for installation',
    width: 1920,
    height: 1080,
    fetchpriority: 'low',
    eyebrow: 'Hardware & Security',
    title: 'Technology and Security Solutions in One Place.',
    body: 'Get essential IT equipment and CCTV systems to support workplace productivity, infrastructure, and property security.',
  },
];

/* ---------- Hero Floating Objects ---------- */
export const HERO_OBJECT_IMAGES = [
  { src: 'object-01-cctv.png', alt: '' },
  { src: 'object-02-switch.png', alt: '' },
  { src: 'object-03-cabling.png', alt: '' },
  { src: 'object-04-hardware.png', alt: '' },
];

/* ---------- Service Ticker ---------- */
export const TICKER_ITEMS = [
  'Network Infrastructure',
  'CCTV & Security Systems',
  'IT Hardware Supply',
  'Business & Residential Solutions',
];

/* ---------- About / Company Values ---------- */
export const VALUES = [
  {
    title: 'Strategically Located',
    body: 'Operating from Doña Elena Tower in Santa Mesa, Manila, with services available to businesses and clients across different locations.',
  },
  {
    title: 'Solutions Built Around Your Needs',
    body: 'We consider your technical requirements, available resources, and operational goals when recommending suitable IT solutions.',
  },
  {
    title: 'Connectivity & Security',
    body: 'We provide essential technology services covering network infrastructure, surveillance systems, and IT equipment.',
  },
  {
    title: 'Practical Technical Assistance',
    body: 'We prioritize clear communication, appropriate technical implementation, and assistance throughout the service process.',
  },
];

/* ---------- Services ---------- */
// UPDATED: Removed the "IT Product Reselling & Hardware Supply" item
export const SERVICES: ServiceItem[] = [
  {
    id: 'network',
    title: 'Network Cabling & Infrastructure',
    bullets: [
      'Structured cabling installation, cable termination, and network layout planning for offices, commercial establishments, and other properties.',
      'Local Area Network (LAN) installation, router and switch configuration, and network connectivity troubleshooting.',
      'Cable organization and infrastructure improvement to support reliable connections and easier network maintenance.',
    ],
  },
  {
    id: 'cctv',
    title: 'CCTV & Security System Installation',
    bullets: [
      'Supply and installation of indoor and outdoor CCTV cameras for offices, commercial establishments, and residential properties.',
      'DVR and NVR configuration, recording storage setup, and remote camera viewing through compatible mobile devices or computers.',
      'CCTV maintenance, camera positioning adjustments, and troubleshooting of existing surveillance systems.',
    ],
  },
];

/* ---------- Service Images ---------- */
// UPDATED: Removed the middle image associated with the deleted hardware service
export const SERVICE_IMAGES = [
  'image6.png', // Network Cabling
  'image8.png', // CCTV
];

/* ---------- Client Service Process ---------- */
export const STEPS: StepItem[] = [
  {
    num: '01',
    title: 'Consultation & Requirements',
    body: 'We discuss your project goals, technical concerns, preferred equipment, and the services you need to determine the right approach.',
  },
  {
    num: '02',
    title: 'Assessment & Planning',
    body: 'We evaluate your existing setup or installation requirements and identify suitable equipment, materials, and technical solutions.',
  },
  {
    num: '03',
    title: 'Installation & Implementation',
    body: 'We carry out the agreed installation, equipment setup, configuration, or technical service based on the approved requirements.',
  },
  {
    num: '04',
    title: 'Testing & Technical Assistance',
    body: 'We check the functionality of the implemented solution and provide appropriate technical assistance for post-service concerns.',
  },
];

/* ---------- Contact Service Options ---------- */
// UPDATED: Removed the hardware option
export const SERVICE_OPTIONS = [
  'Network Cabling & Infrastructure',
  'CCTV & Security System Installation',
  'Multiple IT Services',
  'Other / Not sure yet',
];