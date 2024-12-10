// #app/interface/composite/portfolio/stack.tsx


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

interface StackContainerProps {
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
        <ParallaxContainer />
      </ReactLenis>
    </div>
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
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-inherit backdrop-blur-lg">
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
]; 


const Copy = ({ scrollYProgress }: ComponentProps) => {
  const copyRef = useRef(null);
  const isInView = useInView(copyRef, { amount: 0.3 });
  
  const copyOpacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.35],
    [1, 1, 0]
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
        How it is built message
      </h1>
    </motion.div>
  );
};


const HorizontalCardScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Simplified to only handle horizontal scroll
  const x = useTransform(
    scrollYProgress, 
    [0, 1],
    ["1%", "-50%"]
  );

    

  return (
    <section ref={targetRef} className="relative h-[300vh] transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          style={{ x }} 
          className="flex gap-4"
        >
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
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
        <StackContainer>
          <Copy scrollYProgress={containerProgress} />
        </StackContainer>
        
        {/* Second section: Cards reveal and horizontal scroll */}
        <CardsSection />
      </ParallaxContent>
    </div>
  );
};

// New component to handle cards reveal and scroll
const CardsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });


  
  // Controls the vertical reveal of the entire cards section
  const y = useTransform(
    sectionProgress,
    [0, 0.1, 0.15],
    ["100%", "100%", "0%"]
  );

  const opacity = useTransform(
    sectionProgress,
    [0, 0.1, 0.15],
    [0, 0, 1]
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{ y, opacity }}
      className="relative"
    >
      <HorizontalCardScroll />
    </motion.div>
  );
};

// Update ParallaxContent to handle the full height needed
const ParallaxContent = ({ children }: ParallaxContentProps) => {
  return (
    <div>
      <div className="relative h-[400vh] bg-background">
        {children}
      </div>
    </div>
  );
};

// StickyContainer now only handles the initial sticky state with copy
const StackContainer = ({ children }: StackContainerProps) => {
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

  // Adjust border radius to match scale animation
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.8, 1],
    ["4rem", "2rem", "0rem", "0rem", "0rem"] 
  );

  return (
    <motion.div
      style={{
        scale,
        borderRadius,
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
      ref={targetRef}
      className="z-0 overflow-hidden bg-secondary flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};
  