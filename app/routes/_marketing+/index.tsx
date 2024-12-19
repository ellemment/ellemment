// #app/routes/_marketing+/index.tsx

import { useState, useEffect } from 'react';
import Landing from '#app/interface/portfolio/landing';
import { Showcase } from '#app/interface/portfolio/showcase';
import { Stack } from '#app/interface/portfolio/stack';

// Utility function for debounce with proper TypeScript types
const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  ms: number
) => {
  let timer: NodeJS.Timeout;
  
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null!;
      fn(...args);
    }, ms);
  };
};

export default function IndexRoute() {
  const [dimensions, setDimensions] = useState({
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    width: typeof window !== 'undefined' ? window.innerWidth : 1200
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <div className='min-h-screen bg-black'>
      <Landing dimensions={dimensions} />
      <Showcase />
      <Stack />
    </div>
  );
}