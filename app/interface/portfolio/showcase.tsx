// #app/interface/portfolio/showcase.tsx

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Skills from "#app/interface/portfolio/skills";


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

export const Showcase = () => {
  return (
    <div className="bg-background">
      <ShowcaseParallax
        subheading=" "
        heading="Stack"
        variant="overlay-headline"
    
      >
        <Skills />
      </ShowcaseParallax>
      
      <ShowcaseParallax
        subheading=" "
        heading="Projects"
        variant="overlay-headline"
      >
        <Skills />
      </ShowcaseParallax>
    </div>
  );
};

const ShowcaseParallax = ({ 
  children, 
  subheading, 
  heading, 
  variant = 'default',
  overlayContent 
}: ShowcaseProps) => {
  return (
    <div>
      <div className="relative h-[200vh]">
        <StickyContent>
          {children}
        </StickyContent>
        <AnimatePresence mode="sync">
          {variant === 'overlay-headline' && subheading && heading && (
            <ShowcaseOverlay heading={heading} subheading={subheading} />
          )}
          {variant === 'overlay-content' && overlayContent && (
            <ShowcaseOverlay>
              {overlayContent}
            </ShowcaseOverlay>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};  



const StickyContent = ({ children }: { children?: React.ReactNode }) => {
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
    <motion.div
      style={{
        scale,
        borderRadius,
      }}
      ref={targetRef}
      className="sticky top-0 z-0 overflow-hidden h-screen bg-[#AEAEB2]"
    >
      {children}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `inset(${Math.min(scrollYProgress.get() * 2 * 100, 100)}% 0 0 0)`,
        }}
      />
    </motion.div>
  );
};


const ShowcaseOverlay = ({ subheading, heading, children }: OverlayCopyProps) => {
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

