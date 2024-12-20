// #app/hooks/use-mobile.ts
import { useState, useEffect, useCallback } from 'react';

export interface BreakpointConfig {
  mobile: number;
  tablet?: number;
  desktop?: number;
}

const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
};

/**
 * Hook to detect device type based on screen width
 * @param config Optional breakpoint configuration
 * @returns Object containing boolean flags for different device types
 */
export function useBreakpoint(config: BreakpointConfig = DEFAULT_BREAKPOINTS) {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  const updateBreakpoint = useCallback(() => {
    const width = window.innerWidth;
    
    setBreakpoint({
      isMobile: width < config.mobile,
      isTablet: width >= config.mobile && width < (config.tablet ?? Infinity),
      isDesktop: width >= (config.desktop ?? config.tablet ?? config.mobile)
    });
  }, [config]);

  useEffect(() => {
    // Skip effect on server side
    if (typeof window === 'undefined') return;

    // Initial check
    updateBreakpoint();

    // Setup media query listeners
    const mobileQuery = window.matchMedia(`(max-width: ${config.mobile - 1}px)`);
    const tabletQuery = config.tablet 
      ? window.matchMedia(`(min-width: ${config.mobile}px) and (max-width: ${config.tablet - 1}px)`)
      : null;
    const desktopQuery = config.desktop
      ? window.matchMedia(`(min-width: ${config.desktop}px)`)
      : null;

    // Modern event listener
    const handler = () => updateBreakpoint();

    mobileQuery.addEventListener('change', handler);
    tabletQuery?.addEventListener('change', handler);
    desktopQuery?.addEventListener('change', handler);

    // Add resize listener as backup
    window.addEventListener('resize', handler);

    return () => {
      mobileQuery.removeEventListener('change', handler);
      tabletQuery?.removeEventListener('change', handler);
      desktopQuery?.removeEventListener('change', handler);
      window.removeEventListener('resize', handler);
    };
  }, [config, updateBreakpoint]);

  return breakpoint;
}

/**
 * Simplified hook that only returns isMobile status
 * @param breakpoint Optional mobile breakpoint in pixels
 * @returns Boolean indicating if device is mobile
 */
export function useIsMobile(breakpoint = DEFAULT_BREAKPOINTS.mobile) {
  const { isMobile } = useBreakpoint({ mobile: breakpoint });
  return isMobile;
}

export default useBreakpoint;