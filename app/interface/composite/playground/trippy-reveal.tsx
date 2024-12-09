// #app/interface/composite/playground/trippy-reveal.tsx

import {
  useMotionValueEvent,
  useTransform,
  useScroll,
  motion,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

export const TrippyReveal = () => {
  return (
    <section className="bg-white">
      <Hero />
      <div className="grid h-screen place-content-center bg-violet-600 text-sm font-semibold text-white">
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

const NUM_SECTIONS = 25;
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
      className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black"
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
      className="relative h-full w-full origin-center"
      style={{
        background,
        scale,
        rotate,
        padding: PADDING,
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
      className="relative flex h-4/5 flex-col items-center justify-center gap-4 overflow-hidden bg-white p-4 pt-[calc(56px_+_16px)] text-black"
    >
      <h1 className="text-center text-5xl font-black md:text-7xl">
        Drive in the deep end
      </h1>
      <p className="text-center text-base md:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <button className="bg-black px-3 py-1.5 text-base font-semibold uppercase text-white md:text-lg">
        Get started
      </button>
      <div className="absolute -left-28 -top-28 h-56 w-56 rotate-45 bg-black" />
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rotate-45 bg-black" />
    </motion.div>
  );
};

const Navigation = () => {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-10 flex h-[56px] w-full items-center justify-between bg-black px-2 text-white"
    >
      {/* SVG from logoipsum */}
      <svg
        width="50"
        height="39"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-10 fill-white"
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

      <div className="flex gap-2">
        <button className="px-3 py-1.5 font-semibold uppercase text-white hover:bg-white/20">
          Sign in
        </button>
        <button className="bg-white px-3 py-1.5 font-semibold uppercase text-black">
          Sign up
        </button>
      </div>
    </motion.nav>
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

