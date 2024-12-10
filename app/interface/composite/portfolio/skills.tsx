// #app/interface/composite/portfolio/skills.tsx

import { useScroll, useTransform, motion, useInView, type MotionValue, easeOut } from "framer-motion";
import { useRef } from "react";

interface ComponentProps {
  scrollYProgress: MotionValue<number>;
}

export const Skills = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  

  return (
    <>
      <section ref={targetRef} className="bg-background max-w-7xl mx-auto h-[350vh] px-2">
        <div className="h-screen sticky top-0 z-0 px-1 py-2 md:px-4 md:py-4 overflow-hidden">
          <Copy scrollYProgress={scrollYProgress} />
          <div className="h-full grid grid-rows-[2fr_2fr] gap-2">
            <Images scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </section>
    </>
  );
};

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
      className="absolute inset-0 px-8 w-full z-15 flex items-center justify-center"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -100 }}
        transition={{ 
          duration: 1,
          delay: 0.2,
          ease: [0.33, 1, 0.68, 1]
        }}
        className="text-inherit text-5xl md:text-7xl font-bold text-center max-w-xl"
      >
        Photo gallery for artists
      </motion.h1>
    </motion.div>
  );
};

const Images = ({ scrollYProgress }: ComponentProps) => {
  const topLeft = useRef(null);
  const topRight = useRef(null);
  const bottomLeft = useRef(null);
  const bottomRight = useRef(null);

  const bottomRightOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2],
    [0, 1, 1]
  );
  
  const bottomLeftOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.1, 0.2],
    [0, 1, 1]
  );
  
  const topRightOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.2],
    [0, 1, 1]
  );
  
  const topLeftOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.2, 0.2],
    [0, 1, 1]
  );

  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.5, 1]);
  const topLeftX = useTransform(scrollYProgress, [0.2, 0.8], ["-25%", "0%"]);
  const topLeftY = useTransform(scrollYProgress, [0.2, 0.8], ["-20%", "0%"]);
  const topRightX = useTransform(scrollYProgress, [0.2, 0.8], ["25%", "0%"]);
  const topRightY = useTransform(scrollYProgress, [0.2, 0.8], ["20%", "0%"]);
  const bottomLeftX = useTransform(scrollYProgress, [0.2, 0.8], ["-25%", "0%"]);
  const bottomLeftY = useTransform(scrollYProgress, [0.2, 0.8], ["-40%", "0%"]);
  const bottomRightX = useTransform(scrollYProgress, [0.2, 0.8], ["25%", "0%"]);
  const bottomRightY = useTransform(scrollYProgress, [0.2, 0.8], ["20%", "0%"]);

  return (
    <>
      <div className="grid grid-cols-5 gap-2 h-svh">
        <motion.div
          ref={topLeft}
          className="col-span-3 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(/texture-grid.jpg)",
            backgroundPosition: "center",
            zIndex: 20,
            scale,
            x: topLeftX,
            y: topLeftY,
            opacity: topLeftOpacity
          }}
        />
        <motion.div
          ref={topRight}
          className="col-span-2 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(/texture-grid.jpg)",
            backgroundPosition: "center",
            zIndex: 20,
            scale,
            x: topRightX,
            y: topRightY,
            opacity: topRightOpacity
          }}
        />
        <motion.div
          ref={bottomLeft}
          className="col-span-2 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(/texture-grid.jpg)",
            backgroundPosition: "center",
            zIndex: 20,
            scale,
            x: bottomLeftX,
            y: bottomLeftY,
            opacity: bottomLeftOpacity
          }}
        />
        <motion.div
          ref={bottomRight}
          className="col-span-3 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(/texture-grid.jpg)",
            backgroundPosition: "center",
            zIndex: 20,
            scale,
            x: bottomRightX,
            y: bottomRightY,
            opacity: bottomRightOpacity
          }}
        />
      </div>
    </>
  );
};