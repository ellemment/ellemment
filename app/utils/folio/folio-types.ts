// #app/utils/folio/folio-types.ts

// app/types/portfolio.ts

import type gsap from 'gsap';
import { type RefObject } from 'react';

export interface Dimensions {
  height: number;
  width: number;
}

export interface CaseStudy {
  id: number;
  subtitle: string;
  title: string;
  img: string;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  [key: string]: any;
}

export interface MenuState {
  menuOpened: boolean;
}

export interface NavItem {
  path: string;
  label: string;
}

export interface ContactInfo {
  label: string;
  items: string[];
  isLink?: boolean;
}

export interface AnimationRefs {
  navRef: RefObject<HTMLElement>;
  appRef: RefObject<HTMLElement>;
  menuButtonRef: RefObject<HTMLElement>;
  timeline: gsap.core.Timeline;
}