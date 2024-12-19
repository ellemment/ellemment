// app/utils/folio-hooks.ts

import { gsap } from 'gsap';
import { useState, useEffect, useCallback, type RefObject } from 'react';
import { type Dimensions, type MenuState } from './folio-types';

export const useWindowSize = (): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 0
  });

  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    ms: number
  ) => {
    let timer: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 1000);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

export const useMenuState = (
  dimensions: Dimensions,
  _navRef: RefObject<HTMLElement>,
  _appRef: RefObject<HTMLElement>
) => {
  const [menuState, setMenuState] = useState<MenuState>({ menuOpened: false });
  const timeline = gsap.timeline();

  const toggleMenu = useCallback((opened: boolean) => {
    setMenuState({ menuOpened: opened });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const vh = dimensions.height * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, [dimensions.height]);

  return {
    menuState,
    toggleMenu,
    timeline,
  };
};

export const useAnimation = (
  completeCallback: () => void,
  dependencies: readonly any[] = []
) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!dependencies[0]) return;

    gsap.to('body', {
      duration: 0,
      css: { visibility: 'visible' }
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        completeCallback();
      }
    });

    return () => {
      timeline.kill();
    };
  }, [completeCallback, dependencies]);

  return isAnimating;
};