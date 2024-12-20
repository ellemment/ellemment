// #app/routes/_marketing+/index.tsx

import { useState, useEffect } from 'react';
import { Career } from '#app/interface/portfolio/career';
import Landing from '#app/interface/portfolio/landing';
import { Showcase } from '#app/interface/portfolio/showcase';

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
    <div className='min-h-screen bg-black'>
      <Landing dimensions={dimensions} />
      <Career />
      <Showcase />
  
    </div>
  );
}