// #app/interface/composite/portfolio/cta.tsx




import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform, type MotionValue, easeOut, useInView } from "framer-motion";
import React, { useRef } from "react";


interface Card {
  id: number;
  url: string;
  title: string;
}

interface ComponentProps {
  scrollYProgress: MotionValue<number>;
}


interface ParallaxContentProps {
  children: React.ReactNode;
}

interface StickyContainerProps {
  children: React.ReactNode;
}



export const CTA = () => {
  return (
    <div className="bg-background">
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








const Copy = ({ scrollYProgress }: ComponentProps) => {
  const copyRef = useRef(null);
  const isInView = useInView(copyRef, { amount: 0.3 });
  
  const copyOpacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.35],
    [1, 1, 1]
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
        CTA and Footer
      </h1>
    </motion.div>
  );
};




export const ParallaxContainer = () => {
  const containerRef = useRef(null);
  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
  });

  return (
    <div ref={containerRef} className="bg-background">
      <ParallaxContent>
        {/* First section: Sticky container with copy */}
        <StickyContainer>
          <Copy scrollYProgress={containerProgress} />
        </StickyContainer>
      </ParallaxContent>
    </div>
  );
};

// New component to handle cards reveal and scroll

// Update ParallaxContent to handle the full height needed
const ParallaxContent = ({ children }: ParallaxContentProps) => {
  return (
    <div>
      <div className="bg-secondary">
        {children}
      </div>
    </div>
  );
};

// StickyContainer now only handles the initial sticky state with copy
const StickyContainer = ({ children }: StickyContainerProps) => {
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

  // Adjust border radius to match scale animation, affecting only top borders
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.8, 1],
    ["5rem 5rem 0 0", "4rem 4rem 0 0", "2rem 2rem 0 0", "2rem 2rem 0 0", "1rem 1rem 0 0"] 
  );

  return (
    <motion.div
      style={{
        scale,
        borderRadius,
        height: '50vh',
        position: 'sticky',
        top: 0,
      }}
      ref={targetRef}
      className="z-0 overflow-hidden bg-background flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};
  