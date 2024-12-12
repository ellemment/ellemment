import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { ScrollCard, cardOrder } from '../portfolio-utils/stack-cards';


export const StackSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["50px", "0px"]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1]
  );

  return (
    <section ref={containerRef} className="bg-secondary">
      <HorizontalCardScroll />
    </section>
  );
};




export const HorizontalCardScroll: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [finalPosition, setFinalPosition] = useState(0);
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["50px", "0px"]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1]
  );

  useEffect(() => {
    const calculateScrollDistance = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      
      // Account for the right padding in the scroll distance
      const scrollDistance = containerWidth - viewportWidth;
      
      // Convert to a percentage
      const position = (scrollDistance / viewportWidth) * 100;
      setFinalPosition(position);
    };

    calculateScrollDistance();

    const resizeObserver = new ResizeObserver(calculateScrollDistance);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const x = useTransform(
    scrollYProgress,
    [0, 1], // Use full scroll range
    ["0%", `-${finalPosition}%`]
  );

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex flex-col items-center overflow-hidden h-screen">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="h-1/3 md:h-2/6 flex items-center justify-center"
        >
          <h2 className="text-4xl font-bold">How it is built</h2>
        </motion.div>
      
        <div className="h-2/3 md:h-4/6 w-full overflow-hidden">
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex gap-4 md:gap-8 px-4"
          >
            {cardOrder.map((variant) => (
              <div 
                key={`scroll-card-${variant}`}
                className="flex-shrink-0"
              >
                <ScrollCard
                  variant={variant}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="md:h-1/6 flex items-center justify-center">
         
        </div>
      </div>
    </section>
  );
};

export default HorizontalCardScroll;