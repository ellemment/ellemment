// #app/interface/composite/playground/smooth-scroll.tsx

import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import React, { useRef } from "react";
import { FiMapPin  } from "react-icons/fi";
import { Icon } from "#app/interface/foundations/icons/icon";


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
      className="h-svh bg-background flex overflow-hidden"
    >
      <div className="flex justify-center items-center w-full">
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
      className="mx-auto max-w-7xl px-4 py-48 text-inherit"
    >
      <ScheduleItem title="Experience 1" date="Date" location="Company" />
      <ScheduleItem title="Experience 2" date="Date" location="Company" />
      <ScheduleItem title="Experience 3" date="Date" location="Company" />
      <ScheduleItem title="Experience 4" date="Date" location="Company" />
      <ScheduleItem title="Experience 5" date="Date" location="Company" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-border px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl inherit">{title}</p>
        <p className="text-sm uppercase text-inherit/50">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-inherit/50">
        <p>{location}</p>
        <Icon name="arrow-top-right" />
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
  


