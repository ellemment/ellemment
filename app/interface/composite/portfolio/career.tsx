// #app/interface/composite/playground/smooth-scroll.tsx

import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import React, { useRef } from "react";
import { FiMapPin  } from "react-icons/fi";


interface ScheduleItemProps {
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



export const CareerSection = () => {
  return (
    <div className="bg-background">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <CareerVelocity />
        <Career />
      </ReactLenis>
    </div>
  );
};




export const CareerVelocity = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["45deg", "-45deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -4000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  return (
    <section
      ref={targetRef}
      className="h-svh bg-background flex"
    >
      <div className="flex justify-center items-center">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-[12rem] lg:text-[16rem] font-black leading-[0.85] md:text-9xl md:leading-[0.85]"
        >
          Building Products and Systems 
        </motion.p>
      </div>
    </section>
  );
};



const Career = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-7xl px-4 py-48 text-foreground"
    >
      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
      <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
      <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
      <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
      <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
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
        <Career />
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
  


