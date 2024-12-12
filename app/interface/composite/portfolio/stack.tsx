import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useInView, type MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { ScrollCard,  cardOrder } from '../portfolio-utils/stack-cards';

interface ComponentProps {
  scrollYProgress: MotionValue<number>;
}

interface ParallaxContentProps {
  children: React.ReactNode;
}

interface StackContainerProps {
  children: React.ReactNode;
}



const Copy = ({ scrollYProgress }: ComponentProps) => {
  const copyRef = useRef(null);
  const isInView = useInView(copyRef, { amount: 0.3 });
  
  const copyOpacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.35],
    [1, 1, 0]
  );
  
  return (
    <motion.div
      ref={copyRef}
      style={{
        opacity: copyOpacity,
      }}
      className="absolute inset-0 px-8 w-full z-50 flex items-center justify-center"
    >
      <h1 className="text-inherit z-50 text-5xl md:text-7xl font-bold text-center max-w-xl">
        How it is built message
      </h1>
    </motion.div>
  );
};

export const HorizontalCardScroll: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [finalPosition, setFinalPosition] = useState(0);

  useEffect(() => {
    const calculateScrollDistance = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Only scroll enough to bring the last card to the right edge
      const scrollDistance = Math.max(0, containerWidth - viewportWidth);
      
      // Convert to a percentage of the viewport width
      const position = Math.min(100, (scrollDistance / containerWidth) * 100);
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
    [0, 0.95], // Stop slightly before the end of the scroll to ensure last card stays visible
    ["0%", `-${finalPosition}%`]
  );

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          ref={containerRef}
          style={{ x }} 
          className="flex gap-4 md:gap-4 px-4"
        >
          {cardOrder.map((variant) => (
            <ScrollCard
              key={`scroll-card-${variant}`}
              variant={variant}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalCardScroll;

export const StackSection = () => {
  return (
    <div className="bg-secondary">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <ParallaxContainer />
      </ReactLenis>
    </div>
  );
};


export const ParallaxContainer = () => {
  const containerRef = useRef(null);
  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
  });

  return (
    <div ref={containerRef} className="bg-secondary">
      <ParallaxContent>
        {/* First section: Sticky container with copy */}
        <StackContainer>
          <Copy scrollYProgress={containerProgress} />
        </StackContainer>
        
        {/* Second section: Cards reveal and horizontal scroll */}
        <CardsSection />
      </ParallaxContent>
    </div>
  );
};

// New component to handle cards reveal and scroll
const CardsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });


  
  // Controls the vertical reveal of the entire cards section
  const y = useTransform(
    sectionProgress,
    [0, 0.1, 0.15],
    ["100%", "100%", "0%"]
  );

  const opacity = useTransform(
    sectionProgress,
    [0, 0.1, 0.15],
    [0, 0, 1]
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{ y, opacity }}
      className="relative"
    >
      <HorizontalCardScroll />
    </motion.div>
  );
};

// Update ParallaxContent to handle the full height needed
const ParallaxContent = ({ children }: ParallaxContentProps) => {
  return (
    <div>
      <div className="relative h-[400vh] bg-secondary">
        {children}
      </div>
    </div>
  );
};

// StickyContainer now only handles the initial sticky state with copy
const StackContainer = ({ children }: StackContainerProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Adjust scale to include exit animation
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1], // Added midpoint and exit point
    [0.80, 1, 1, 1] // Scale back to 0.85 at exit
  );


  return (
    <motion.div
      style={{
        scale,
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
      ref={targetRef}
      className="z-0 overflow-hidden bg-secondary flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

