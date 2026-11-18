/* Shared types used across components, hooks, and data. */

export type Theme = 'light' | 'dark';

export interface HeroStage {
  name: string;
  img: string;
  alt: string;
  width: number;
  height: number;
  fetchpriority: 'high' | 'low';
  tag?: string;
  eyebrow?: string;
  title: string;
  body: string;
  primaryCta?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  bullets: string[];
}

export interface ProjectItem {
  img: string;
  alt: string;
  captionTitle: string;
  captionBody: string;
}

export interface StepItem {
  num: string;
  title: string;
  body: string;
}