// #app/interface/portfolio/showcase.tsx

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Skills from "#app/interface/portfolio/skills";


interface ShowcaseProps {
  subheading?: string;
  heading?: string;
  variant?: 'default' | 'overlay';
  children?: React.ReactNode;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

export const Showcase = () => {
  return (
    <div className="bg-background">
      <ShowcaseParallax
        subheading="Engineering"
        heading="Product Development"
        variant="overlay"
      >
        {/* Add your custom content here */}
        <Skills />
      </ShowcaseParallax>
      
      <ShowcaseParallax
        subheading="Design"
        heading="Product Design"
        variant="overlay"
      >
        {/* Add your custom content here */}
        <Skills />
      </ShowcaseParallax>
    </div>
  );
};

const ShowcaseParallax = ({ children, subheading, heading, variant = 'default' }: ShowcaseProps) => {
  return (
    <div>
      <div className="relative h-[200vh]">
        <StickyContent>
          {children}
        </StickyContent>
        {variant === 'overlay' && subheading && heading && (
          <ShowcaseOverlay heading={heading} subheading={subheading} />
        )}
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

  const scale = useTransform(scrollYProgress, [0.5, 1], isLargeScreen ? [1, 0.85] : [1, 1]);
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


const ShowcaseOverlay = ({ subheading, heading }: OverlayCopyProps) => {
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
      <div className="max-w-5xl container px-2 md:px-6">
      <p className="mb-2 text-start text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-start text-4xl font-bold md:text-7xl">{heading}</p>
      </div>
    </motion.div>
  );
};

