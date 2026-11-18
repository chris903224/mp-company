export const STAGES = [
  'Initial Consultation',
  'Assessment',
  'Implementation',
  'Technical Assistance',
];

export const SERVICES_LIST = [
  'Network & Infrastructure',
  'CCTV & Surveillance',
  'IT Technical Support',
  'Hardware & Software',
];

export interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceIndex: number;
  message: string;
  stage: number;
  date: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  icon: string;
  isSample: boolean;
}

// Business Info ay ginawang interface para ready sa DB
export interface BusinessInfo {
  id: number;
  label: string;
  icon: string;
  type: string;
  placeholder: string;
  value: string | null;
}