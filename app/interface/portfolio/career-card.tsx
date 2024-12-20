// #app/interface/portfolio/career-card.tsx

import { AnimatePresence, motion, type Variants, type HTMLMotionProps } from "framer-motion";
import React, { useState, type FC } from "react";
import { Icon } from '#app/interface/foundations/icons/icon';
import { NoiseFilter } from '#app/interface/shared/noise-filter';
import { NoiseOverlay } from '#app/utils/grainy';

interface CareerCardProps {
  id: string;
  color: string;
  title: string;
  description?: string;
  detailContent?: string;
  location?: string;
}

// Helper function to darken color for gradient
function adjustColorBrightness(color: string, percent: number): string {
  // Add type checking
  if (typeof color !== 'string') {
    console.warn('Invalid color value provided to adjustColorBrightness:', color);
    return '#000000'; // Return a default color
  }

  // Handle rgba/rgb colors
  if (color.startsWith('rgba') || color.startsWith('rgb')) {
    const values = color.match(/\d+/g);
    if (!values || values.length < 3) return color;
    
    try {
      const r = Math.max(0, Math.min(255, parseInt(values[0]!) + percent));
      const g = Math.max(0, Math.min(255, parseInt(values[1]!) + percent));
      const b = Math.max(0, Math.min(255, parseInt(values[2]!) + percent));
      const a = values.length === 4 ? parseFloat(values[3]!) : 1;
      
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    } catch (ignored) {
      return color;
    }
  }
  
  // Handle hex colors
  if (color.startsWith('#')) {
    try {
      const num = parseInt(color.slice(1), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, Math.min(255, (num >> 16) + amt));
      const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
      const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
      
      return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    } catch (e) {
      return color;
    }
  }
  
  // Return original color if format is not supported
  return color;
}

export const CareerCard: FC<CareerCardProps & HTMLMotionProps<"div">> = ({
  id,
  color,
  title,
  detailContent = "",
  location,
  ...props
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const hasDetail = detailContent.length > 0;

  const cardAnimationVariants: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <>
      <NoiseFilter />
      <motion.div
        className="relative h-72 min-w-[280px] rounded-2xl shadow-md 
          md:h-[360px] md:min-w-[300px] 
          lg:h-[380px] lg:min-w-[340px] 
          xl:h-[480px] xl:min-w-[400px] 
          overflow-hidden"
        variants={cardAnimationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
        {...props}
      >
        {/* Base white background - always visible when not showing detail */}
        <motion.div
          className="absolute h-full w-full bg-white"
          animate={{
            opacity: showDetail ? 0 : 1
          }}
        />

        {/* Gradient background - only visible when showing detail */}
        <motion.div
          layoutId={`color-${id}`}
          className="absolute h-full w-full"
          animate={{
            opacity: showDetail ? 1 : 0
          }}
          style={{
            background: Array.isArray(color) 
              ? `radial-gradient(circle at center, ${color[0]}, ${color[1]})`
              : `radial-gradient(circle at center, ${color}, ${adjustColorBrightness(color, -30)})`
          }}
        />
        
        {/* Noise overlay - with masked edges */}
        <NoiseOverlay 
          opacity={showDetail ? 0.15 : 0} 
        />

        <div className="absolute z-10 h-full w-full">
          <AnimatePresence mode="wait">
            {!showDetail ? (
              <motion.div 
                key="default"
                className="flex h-full flex-col p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-xl font-medium leading-6 text-gray-900"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {title}
                </motion.h1>
                {location && (
                  <motion.p 
                    className="mt-1 text-xs text-gray-600"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {location}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                className="absolute inset-0 flex flex-col justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="text-white font-medium text-lg"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: 0.15,
                    ease: "easeOut"
                  }}
                >
                  {detailContent}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasDetail && (
          <ToggleButton
            color={color}
            onClick={() => setShowDetail(!showDetail)}
            showDetail={showDetail}
          />
        )}
      </motion.div>
    </>
  );
};

interface ToggleButtonProps {
  color: string;
  showDetail: boolean;
  onClick: () => void;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  showDetail,
  onClick,
}) => {
  const animationVariants = {
    main: {
      rotate: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    detail: {
      rotate: 45,
      backgroundColor: "#ffffff",
    },
  };

  return (
    <motion.button
      className="absolute right-4 bottom-4 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center z-50"
      variants={animationVariants}
      initial={false}
      animate={showDetail ? "detail" : "main"}
      transition={{ bounce: 0 }}
      onClick={onClick}
      aria-label={showDetail ? "Hide details" : "Show details"}
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{ color: showDetail ? "#000000" : "#ffffff" }}
        transition={{ duration: 0.2 }}
      >
        <Icon name="plus" className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
};

export default CareerCard;