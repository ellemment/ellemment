// #app 

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// Add interfaces for component props

interface ShowcaseProps {
  imgUrl: string;
  subheading?: string;
  heading?: string;
  variant?: 'default' | 'overlay';
}

interface StickyImageProps {
  imgUrl: string;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

export const Showcase = () => {
  return (
    <div className="bg-background">
      <ShowcaseParallax
        imgUrl="https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D"
        subheading="Engineering"
        heading="Product Development"
        variant="overlay"
      />
      <ShowcaseParallax
        imgUrl="https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Design"
        heading="Product Design"
        variant="overlay"
      />
    </div>
  );
};

const ShowcaseParallax = ({ imgUrl, subheading, heading, variant = 'default' }: ShowcaseProps) => {
  return (
    <div>
      <div className="relative h-[200vh]">
        <StickyContent imgUrl={imgUrl} />
        {variant === 'overlay' && subheading && heading && (
          <ShowcaseOverlay heading={heading} subheading={subheading} />
        )}
      </div>
    </div>
  );
};  



const StickyContent = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "center start"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0.5, 1], [0, 48]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        scale,
        borderRadius,
      }}
      ref={targetRef}
      className="sticky top-0 z-0 overflow-hidden"
    >
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

