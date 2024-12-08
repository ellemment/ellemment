// #app/interface/composite/playground/smooth-scroll.tsx

import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiMapPin  } from "react-icons/fi";


interface MessageItemProps {
  title: string;
  date: string;
  location: string;
}

interface TextParallaxContentProps {
  children: React.ReactNode;
}

interface StickyContainerProps {
  children: React.ReactNode;
}

const SECTION_HEIGHT = 500;

export const HeroSection = () => {
  return (
    <div className="bg-background">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
        <ParallaxSection />
      </ReactLenis>
    </div>
  );
};


const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterArea />
    </div>
  );
};

const CenterArea = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(
    scrollY, 
    [0, 2000],
    [1, 0.75],
    {
      ease: (t) => {
        const x = Math.max(0, Math.min(1, t));
        return 1 - Math.pow(1 - x, 3);
      }
    }
  );
  
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 300],
    [1, 0],
    {
      ease: (t) => {
        const x = Math.max(0, Math.min(1, t));
        return 1 - Math.pow(1 - x, 3);
      }
    }
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-background flex flex-col items-center justify-center"
      style={{ 
        opacity,
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: "1000",
        WebkitTransformStyle: "preserve-3d",
        transform: 'translate3d(0,0,0)'
      }}
      initial={false}
    >
      <motion.div
        style={{ 
          scale,
          willChange: 'transform',
          transformOrigin: "center center",
          WebkitBackfaceVisibility: "hidden",
          WebkitPerspective: "1000",
          WebkitTransformStyle: "preserve-3d",
          transform: 'translate3d(0,0,0)'
        }}
        className="flex flex-col items-center"
        initial={false}
        layoutDependency={false}
      >
        <h1 className="text-primary text-6xl md:text-7xl lg:text-9xl font-bold mb-4 [transform-style:preserve-3d] [backface-visibility:hidden] [perspective:1000px]">
          Dony Alior
        </h1>
        <div className="flex items-center gap-4 [transform-style:preserve-3d] [backface-visibility:hidden] [perspective:1000px]">
          <h2 className="text-primary/50 text-lg md:text-xl lg:text-2xl font-light">
            Product Engineer
          </h2>
          <div className="border border-border px-3 py-1 rounded-md">
            <span className="text-primary/50 text-lg md:text-xl lg:text-2xl font-light">
              Front End
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};



const Message = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-7xl px-4 py-48 text-foreground"
    >
      <MessageItem title="NG-21" date="Dec 9th" location="Florida" />
      <MessageItem title="Starlink" date="Dec 20th" location="Texas" />
      <MessageItem title="Starlink" date="Jan 13th" location="Florida" />
      <MessageItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <MessageItem title="NROL-186" date="Mar 1st" location="California" />
      <MessageItem title="GOES-U" date="Mar 8th" location="California" />
      <MessageItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

const MessageItem = ({ title, date, location }: MessageItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

export const ParallaxSection = () => {
  return (
    <div className="bg-background">
      <TextParallaxContent>
        <Message />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ children }: TextParallaxContentProps) => {
  return (
    <div>
      <div className="relative h-[150vh] bg-background">
        <StickyContainer>{children}</StickyContainer>
      </div>
    </div>
  );
};

const StickyContainer = ({ children }: StickyContainerProps) => {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: exitProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.85, 1, 1, 0.85]
  );

  const inset = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [`${IMG_PADDING}px`, '0px', '0px', `${IMG_PADDING}px`]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ["3rem", "0rem", "0rem", "3rem"]
  );

  const opacity = useTransform(exitProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        height: '100vh',
        top: 0,
        left: inset,
        right: inset,
        scale,
        borderRadius,
        position: 'sticky',
      }}
      ref={targetRef}
      className="z-0 overflow-hidden bg-foreground"
    >
      <motion.div
        style={{
          opacity,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
  
