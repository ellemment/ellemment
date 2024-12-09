import { useScroll, useTransform, motion, useInView, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface ComponentProps {
  scrollYProgress: MotionValue<number>;
}

export const FeatureGrid = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  

  return (
    <>
      <section ref={targetRef} className="bg-background max-w-7xl mx-auto h-[350vh] px-2 md:px-4">
        <div className="h-screen sticky top-10 z-0 p-4 overflow-hidden">
          <Copy scrollYProgress={scrollYProgress} />
          <div className="h-full grid grid-rows-[2fr_2fr] gap-4">
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
  
  const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.75], ["0%", "7.5%"]);

  return (
    <motion.div
      ref={copyRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute px-8 w-full h-screen z-20 flex flex-col items-center justify-center"
    >
      <h1 className="text-inherit text-5xl md:text-7xl font-bold text-center max-w-xl">
        Photo gallery for artists
      </h1>
      <p className="text-inherit/50 text-sm md:text-base text-center max-w-xl my-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, minus
        nisi? Quod praesentium quaerat possimus.
      </p>
      <div className="flex items-center gap-4" />
    </motion.div>
  );
};

const Images = ({ scrollYProgress }: ComponentProps) => {
  const topLeft = useRef(null);
  const topRight = useRef(null);
  const bottomLeft = useRef(null);
  const bottomRight = useRef(null);

  const isTopLeftInView = useInView(topLeft, { amount: 0.3 });
  const isTopRightInView = useInView(topRight, { amount: 0.3 });
  const isBottomLeftInView = useInView(bottomLeft, { amount: 0.3 });
  const isBottomRightInView = useInView(bottomRight, { amount: 0.3 });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  
  const topLeftX = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const topLeftY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const topRightX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const topRightY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const bottomLeftX = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const bottomLeftY = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  const bottomRightX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const bottomRightY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 h-svh">
        <motion.div
          ref={topLeft}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTopLeftInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-3 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1511447333015-45b65e60f6d5)",
            backgroundPosition: "center",
            scale,
            x: topLeftX,
            y: topLeftY,
          }}
        />
        <motion.div
          ref={topRight}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTopRightInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-2 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1517504734587-2890819debab)",
            backgroundPosition: "center",
            scale,
            x: topRightX,
            y: topRightY,
          }}
        />
        <motion.div
          ref={bottomLeft}
          initial={{ opacity: 0 }}
          animate={{ opacity: isBottomLeftInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="col-span-2 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1511800453077-8c0afa94175f)",
            backgroundPosition: "center",
            scale,
            x: bottomLeftX,
            y: bottomLeftY,
          }}
        />
        <motion.div
          ref={bottomRight}
          initial={{ opacity: 0 }}
          animate={{ opacity: isBottomRightInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="col-span-3 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url(https://plus.unsplash.com/premium_photo-1668790459004-780996a6404c)",
            backgroundPosition: "center",
            scale,
            x: bottomRightX,
            y: bottomRightY,
          }}
        />
      </div>
    </>
  );
};