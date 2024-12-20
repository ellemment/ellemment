// #app/routes/_marketing+/index.tsx

import { useState, useEffect } from 'react';
import { Career } from '#app/interface/portfolio/career';
import Hero from '#app/interface/portfolio/hero';
import { Skills } from '#app/interface/portfolio/skills';
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
    height: 800,
    width: 1200
  });

  useEffect(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    });

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
    <>
      <Hero dimensions={dimensions} />
      <Career />
      <Skills />
      <Stack />
      <div className='h-25vh'></div>
    </>
  );
}