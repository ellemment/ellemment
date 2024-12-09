// #app/interface/composite/portfolio/stack.tsx

// #app/interface/composite/playground/smooth-scroll.tsx

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


interface TextParallaxContentProps {
  children: React.ReactNode;
}

interface StickyContainerProps {
  children: React.ReactNode;
}



export const StackSection = () => {
  return (
    <div className="bg-background">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
    
        <ParallaxSection />
      </ReactLenis>
    </div>
  );
};







export const ParallaxSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <div className="bg-background">
      <TextParallaxContent>
         <Copy scrollYProgress={scrollYProgress} />
        <HorizontalScrollCarousel  />
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
  



const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: Card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};



const cards = [
  {
    url: "/imgs/abstract/1.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/imgs/abstract/2.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/imgs/abstract/3.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/abstract/6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/imgs/abstract/7.jpg",
    title: "Title 7",
    id: 7,
  },
];


const Copy = ({ scrollYProgress }: ComponentProps) => {
  const copyRef = useRef(null);
  const isInView = useInView(copyRef, { amount: 0.3 });
  
  const copyScale = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.3, 0.8], 
    [1, 1, 1, 0.5], 
    { ease: easeOut }
  );
  
  const copyOpacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.3, 0.8], 
    [1, 1, 1, 0], 
    { ease: easeOut }
  );
  
  return (
    <motion.div
      ref={copyRef}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -100 }}
      transition={{ 
        duration: 1.2,
        y: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1]
        },
        opacity: {
          duration: 1,
          ease: [0.33, 1, 0.68, 1]
        }
      }}
      style={{
        scale: copyScale,
        opacity: copyOpacity,
      }}
      className="absolute inset-0 px-8 w-full z-50 flex items-center justify-center"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isInView ? 0 : 1, y: isInView ? 0 : 100 }}
        transition={{ 
          duration: 1,
          delay: 0.2,
          ease: [0.33, 1, 0.68, 1]
        }}
        className="text-foreground z-50 text-5xl md:text-7xl font-bold text-center max-w-xl"
      >
        Photo gallery for artists
      </motion.h1>
    </motion.div>
  );
};