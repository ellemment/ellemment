// #app/interface/components/composite/element-section.tsx

import { motion, useScroll, useTransform, AnimatePresence, type MotionStyle } from "framer-motion";
import { useRef, type FC, type ReactNode } from "react";
import { useBreakpoint } from "#app/utils/hooks/use-mobile";

export interface ElementSectionProps {
  children: ReactNode;
  subheading?: string;
  heading?: string;
  variant?: 'default' | 'overlay-headline' | 'overlay-content';
  overlayContent?: ReactNode;
  containerHeight?: number;
  className?: string;
  scaleRange?: [number, number];
  borderRadiusRange?: [number, number];
  backgroundColor?: string;
  contentStyles?: MotionStyle;
}

interface StickyContentProps {
  children: ReactNode;
  scaleRange?: [number, number];
  borderRadiusRange?: [number, number];
  backgroundColor?: string;
  contentStyles?: MotionStyle;
}

interface OverlayProps {
  subheading?: string;
  heading?: string;
  children?: ReactNode;
  className?: string;
}

const StickyContent: FC<StickyContentProps> = ({ 
  children,
  scaleRange = [1, 0.8],
  borderRadiusRange = [0, 48],
  backgroundColor = "#AEAEB2",
  contentStyles = {}
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "center start"],
  });

  const scale = useTransform(
    scrollYProgress, 
    [0.5, 1], 
    !isMobile ? scaleRange : [1, 1]
  );
  
  const borderRadius = useTransform(
    scrollYProgress, 
    [0.5, 1], 
    !isMobile ? borderRadiusRange : [0, 0]
  );

  const styles = {
    backgroundColor,
    scale,
    borderRadius,
    ...contentStyles
  };

  return (
    <motion.div
      style={styles}
      ref={targetRef}
      className="sticky top-0 z-0 overflow-hidden h-screen"
    >
      {children}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `inset(${Math.min(scrollYProgress.get() * 2 * 100, 100)}% 0 0 0)`,
        }}
      />
    </motion.div>
  );
};

const Overlay: FC<OverlayProps> = ({ 
  subheading, 
  heading, 
  children,
  className = ""
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -250]);

  return (
    <motion.div
      style={{ y }}
      ref={targetRef}
      className={`absolute bg-background left-0 top-0 flex h-screen w-full 
        flex-col items-start justify-center text-inherit ${className}`}
    >
      {children || (
        <div className="w-full max-w-5xl mx-auto px-2 md:px-6">
          <h2 className="text-4xl md:text-5xl font-semibold leading-relaxed tracking-tight">
            {heading}
          </h2>
          <p className="text-2xl">{subheading}</p>
        </div>
      )}
    </motion.div>
  );
};

export const ElementSection: FC<ElementSectionProps> = ({
  children,
  subheading,
  heading,
  variant = 'default',
  overlayContent,
  containerHeight = 200,
  className = "",
  scaleRange,
  borderRadiusRange,
  backgroundColor,
  contentStyles
}) => {
  return (
    <div className={className}>
      <div className="relative" style={{ height: `${containerHeight}vh` }}>
        <StickyContent
          scaleRange={scaleRange}
          borderRadiusRange={borderRadiusRange}
          backgroundColor={backgroundColor}
          contentStyles={contentStyles}
        >
          {children}
        </StickyContent>
        <AnimatePresence mode="sync">
          {variant === 'overlay-headline' && (subheading || heading) && (
            <Overlay 
              heading={heading} 
              subheading={subheading}
            />
          )}
          {variant === 'overlay-content' && overlayContent && (
            <Overlay>{overlayContent}</Overlay>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ElementSection;