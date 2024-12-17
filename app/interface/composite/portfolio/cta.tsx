// #app/interface/composite/portfolio/cta.tsx
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform, type MotionValue, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

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
    <div className="bg-secondary mx-auto">
      <ReactLenis
        root
        options={{
          lerp: 0.1,
        }}
      >
        <ParallaxContainer />
        <div className="h-[1rem]"></div>
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
    <div ref={containerRef} className="bg-secondary">
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Handle the initial check
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    
    // Check on mount
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5],
    [0.80, 1, 1, 1]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5],
    ["5rem 5rem 5rem 5rem",  "1.5rem 1.5rem 1.5rem 1.5rem", "1rem 1rem 1rem 1rem", "0.5rem 0.5rem 0.5rem 0.5rem"]
  );

  const marginStyle = isSmallScreen ? '0rem' : 'auto';

  return (
    <motion.div
      style={{
        scale,
        borderRadius,
        height: '50vh',
        position: 'sticky',
        top: 0,
        margin: marginStyle,
        marginRight: isSmallScreen ? '1rem' : undefined,
        marginLeft: isSmallScreen ? '1rem' : undefined,
      }}
      ref={targetRef}
      className="z-0 overflow-hidden bg-background max-w-7xl mx-auto flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};
  