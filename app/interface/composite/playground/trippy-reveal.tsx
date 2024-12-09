// #app/interface/composite/playground/trippy-reveal.tsx

import {
  useTransform,
  useScroll,
  motion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

export const TrippyReveal = () => {
  return (
    <section className="bg-white">
      <Hero />
      <div className="grid h-screen place-content-center bg-background text-sm font-semibold text-foreground">
        <span>The rest of your website {":)"}</span>
      </div>
    </section>
  );
};

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.65, 0.8, 1],
    [1, 1, 0.9, 1.25]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["0deg", "0deg", "60deg"]
  );
  const top = useTransform(scrollYProgress, [0, 0.25], ["80%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.125], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 1]);

  return (
    <div ref={targetRef} className="relative z-0 h-[800vh] bg-neutral-200">
      <div className="sticky top-0 h-screen bg-white">
        <Copy opacity={opacity} />
        <Trippy rotate={rotate} top={top} scale={scale} />
        <OverlayLogo scale={logoScale} />
      </div>
    </div>
  );
};

const NUM_SECTIONS = 3;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const generateSections = (
  count: number,
  color: string,
  scale: MotionValue<number>,
  rotate: MotionValue<string>
) => {
  if (count === NUM_SECTIONS) {
    return <></>;
  }

  const nextColor = color === "black" ? "white" : "black";

  return (
    <Section rotate={rotate} scale={scale} background={color}>
      {generateSections(count + 1, nextColor, scale, rotate)}
    </Section>
  );
};

interface TrippyProps {
  rotate: MotionValue<string>;
  scale: MotionValue<number>;
  top: MotionValue<string>;
}

const Trippy = ({ rotate, scale, top }: TrippyProps) => {
  return (
    <motion.div
      style={{ top }}
      className="absolute left-1/2 -translate-x-1/2 aspect-square w-[100vmin] overflow-hidden"
    >
      {generateSections(0, "black", scale, rotate)}
    </motion.div>
  );
};

interface SectionProps {
  background: string;
  scale: MotionValue<number>;
  children: React.ReactNode;
  rotate: MotionValue<string>;
}

const Section = ({ background, scale, children, rotate }: SectionProps) => {
  return (
    <motion.div
      className="relative h-full w-full origin-center rounded-[50%]"
      style={{
        background,
        scale,
        rotate,
        padding: PADDING,
        aspectRatio: "1 / 1",
      }}
    >
      {children}
    </motion.div>
  );
};

interface CopyProps {
  opacity: MotionValue<number>;
}

const Copy = ({ opacity }: CopyProps) => {
  return (
    <motion.div
      style={{ opacity }}
      // Padding top + 56px to accommodate for navbar height
      className="relative flex h-4/5 flex-col items-center justify-center gap-4 overflow-hidden bg-background p-4 pt-[calc(56px_+_16px)] text-inherit"
    >
      <h1 className="text-center text-5xl font-black md:text-7xl">
        Drive in the deep end
      </h1>
      <p className="text-center text-base md:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <button className="bg-foreground px-3 py-1.5 text-base font-semibold uppercase text-background md:text-lg">
        Get started
      </button>
    </motion.div>
  );
};



interface OverlayLogoProps {
  scale: MotionValue<number>;
}

const OverlayLogo = ({ scale }: OverlayLogoProps) => {
  return (
    <motion.div
      style={{ scale }}
      className="pointer-events-none absolute inset-0 z-[5] grid place-content-center"
    >
      {/* SVG from logoipsum */}
      <svg
        width="50"
        height="39"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-32 fill-white"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

