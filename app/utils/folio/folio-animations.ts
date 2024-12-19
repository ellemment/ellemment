// app/types/portfolio.ts

import gsap from 'gsap';
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

export const homeAnimation = (completeAnimation: () => void) => {
  const tl = gsap.timeline();

  tl.from(".line span", 1.8, {
    y: 100,
    ease: "power4.out",
    delay: 1,
    skewY: 7,
    stagger: {
      amount: 0.3
    }
  })
  .to(".overlay-top", 1.6, {
    height: 0,
    ease: "expo.inOut",
    stagger: 0.4
  })
  .to(".overlay-bottom", 1.6, {
    width: 0,
    ease: "expo.inOut",
    delay: -0.8,
    stagger: {
      amount: 0.4
    }
  })
  .to(".intro-overlay", 0, {
    css: { display: "none" }
  })
  .from(".case-image img", 1.6, {
    scale: 1.4,
    ease: "expo.inOut",
    delay: -2,
    stagger: {
      amount: 0.4
    },
    onComplete: completeAnimation
  });

  return tl;
};