import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import React, { useRef } from 'react';
import { SkillCardsGrid } from '../portfolio-utils/skill-cards';

export type SkillCardId = 'skill-card-one' | 'skill-card-two' | 'skill-card-three' | 'skill-card-four';

export interface ComponentProps {
  scrollYProgress: MotionValue<number>;
  useGetScrollLogic?: (id: SkillCardId, scrollYProgress: MotionValue<number>) => boolean;
}

interface SkillsContainerProps {
  children: React.ReactNode;
}



// Simplified Copy Component without animations
const Copy = () => {
  return (
    <div className="max-w-7xl flex flex-col items-center justify-center mx-auto px-2 w-full z-5 pt-12 md:pt-24 pb-2 md:pb-4">
      <h1 className="text-inherit text-4xl md:text-5xl font-bold max-w-xl flex-1">
        Skills and Expertise
      </h1>
    </div>
  );
};

// Container Components
const SkillsContainer = ({ children }: SkillsContainerProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["3rem", "0rem", "0rem", "0rem"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 1, 1, 0.4]);

  return (
    <motion.div
      ref={targetRef}
      style={{ 
        scale, 
        borderRadius, 
        opacity,    
        position: 'relative',
      }}
      className="z-0 bg-secondary py-2 md:py-4 w-full max-md:min-h-screen"
    >
      {children}
    </motion.div>
  );
};

// Main Skills Component
export const Skills = () => {
  const targetRef = useRef(null);

  return (
    <section 
      ref={targetRef} 
      className="bg-secondary relative w-full"
    >
      <div className="w-full">
        <SkillsContainer>
          <Copy />
          <SkillCardsGrid />
        </SkillsContainer>
      </div>
    </section>
  );
};

export default Skills;


