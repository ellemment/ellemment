// #app/interface/portfolio/career.tsx

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import  CareerCompany  from "#app/interface/portfolio/career-section";
import { NoiseFilter } from "#app/interface/shared/noise-filter";


interface ShowcaseProps {
  subheading?: string;
  heading?: string;
  variant?: 'default' | 'overlay-headline' | 'overlay-content';
  children?: React.ReactNode;
  overlayContent?: React.ReactNode;
}

interface OverlayCopyProps {
  subheading?: string;
  heading?: string;
  children?: React.ReactNode;
}

export const Career = () => {
  return (
    <div className="bg-background">
      <CareerParallax
        subheading=" "
        heading="Background"
        variant="overlay-headline"
    
      >
        <CareerCompany />
      </CareerParallax>
    </div>
  );
};

const CareerParallax = ({ 
  children, 
  subheading, 
  heading, 
  variant = 'default',
  overlayContent 
}: ShowcaseProps) => {
  return (
    <div>
      <div className="relative h-[200vh]">
        <CareerContent>
          {children}
        </CareerContent>
        <AnimatePresence mode="sync">
          {variant === 'overlay-headline' && subheading && heading && (
            <CareerOverlay heading={heading} subheading={subheading} />
          )}
          {variant === 'overlay-content' && overlayContent && (
            <CareerOverlay>
              {overlayContent}
            </CareerOverlay>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};  



const CareerContent = ({ children }: { children?: React.ReactNode }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "center start"],
  });

  const isLargeScreen = typeof window !== 'undefined' 
    ? window.matchMedia('(min-width: 768px)').matches 
    : false;

  const scale = useTransform(scrollYProgress, [0.5, 1], isLargeScreen ? [1, 0.80] : [1, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.5, 1], isLargeScreen ? [0, 48] : [0, 0]);

  return (
    <>
      <NoiseFilter />
      <motion.div
        style={{
          scale,
          borderRadius,
        }}
        ref={targetRef}
        className="sticky top-0 z-0 overflow-hidden h-screen"
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: '#AEAEB2',
            filter: 'url(#noise)',
            opacity: 0.8,
            mixBlendMode: 'multiply'
          }}
        />
        {children}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: `inset(${Math.min(scrollYProgress.get() * 2 * 100, 100)}% 0 0 0)`,
          }}
        />
      </motion.div>
    </>
  );
};


const CareerOverlay = ({ subheading, heading, children }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -250]);

  return (
    <motion.div
      style={{
        y,
      }}
      ref={targetRef}
      className="absolute bg-background left-0 top-0 flex h-screen w-full flex-col items-start justify-center text-inherit"
    >
      {children || (
        <div className="w-full max-w-5xl mx-auto px-2 md:px-6">
          <h2 className="text-4xl md:text-5xl font-semibold leading-relaxed tracking-tight">{heading}</h2>
          <p className="text-2xl">{subheading}</p>
        </div>
      )}
    </motion.div>
  );
};

