// src/admin/adminData.ts
export const STAGES = [
  'Initial Consultation',
  'Assessment',
  'Implementation',
  'Technical Assistance',
];

export const SERVICES_LIST = [
  'Network & Infrastructure',
  'CCTV & Surveillance',
  'Hardware & Software',
];

export interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceindex: number;
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

// ✅ Siguraduhing naka-export ito at may tamang properties
export interface BusinessInfo {
  id?: number;
  phone: string;
  email: string;
  hours: string;
  address: string;
}

// ✅ Siguraduhing naka-export ito
export interface ServicesInfo {
  network_desc: string;
  cctv_desc: string;
  hardware_desc: string;
}