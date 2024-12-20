// #app/interface/components/composite/element-card.tsx

// #app/interface/components/composite/element-card.tsx

import { AnimatePresence, motion, type Variants } from "framer-motion";
import React, { useState, type FC } from "react";
import { Icon } from '#app/interface/foundations/icons/icon';

// Constants
const ANIMATION_EASE = [0.455, 0.03, 0.515, 0.955];

// Types
export interface ElementCardProps {
  /** Unique identifier for the card */
  id: string;
  /** Main title of the card */
  title: string;
  /** Optional subtitle/description */
  description?: string;
  /** Detailed content to show when expanded */
  detailContent?: string;
  /** Optional metadata (e.g., location, date, etc.) */
  metadata?: string;
  /** Background color when card is expanded */
  color?: string;
  /** Custom animation variants */
  customAnimations?: {
    card?: Variants;
    content?: Variants;
  };
  /** Card size configuration */
  size?: 'small' | 'medium' | 'large';
  /** Additional className for the card */
  className?: string;
  /** Optional onClick handler */
  onClick?: () => void;
  /** Optional render functions for custom content */
  renderContent?: {
    default?: () => React.ReactNode;
    expanded?: () => React.ReactNode;
  };
}

// Default animation variants
const defaultCardAnimations: Variants = {
  initial: { 
    scale: 0.8, 
    opacity: 0 
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  exit: { 
    scale: 0.8, 
    opacity: 0 
  },
};

const defaultContentAnimations: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.2 
    }
  },
};

// Size configurations
const sizeClasses = {
  small: {
    container: "h-64 min-w-[240px] md:h-72 md:min-w-[280px]",
    title: "text-lg",
    metadata: "text-xs",
    detail: "text-base",
  },
  medium: {
    container: "h-72 min-w-[280px] md:h-[360px] md:min-w-[300px] lg:h-[380px] lg:min-w-[340px]",
    title: "text-xl",
    metadata: "text-sm",
    detail: "text-lg",
  },
  large: {
    container: "h-[360px] min-w-[320px] md:h-[480px] md:min-w-[400px] lg:h-[520px] lg:min-w-[440px]",
    title: "text-2xl",
    metadata: "text-base",
    detail: "text-xl",
  },
};

export const ElementCard: FC<ElementCardProps> = ({
  id,
  title,
  description,
  detailContent = "",
  metadata,
  color = "#000000",
  customAnimations,
  size = 'medium',
  className = "",
  onClick,
  renderContent,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const hasDetail = detailContent.length > 0 || renderContent?.expanded;

  // Combine default and custom animations
  const cardAnimations = {
    ...defaultCardAnimations,
    ...customAnimations?.card,
  };

  const contentAnimations = {
    ...defaultContentAnimations,
    ...customAnimations?.content,
  };

  // Get size-specific classes
  const sizeConfig = sizeClasses[size];

  return (
    <motion.div
      className={`relative ${sizeConfig.container} rounded-2xl shadow-md overflow-hidden ${className}`}
      variants={cardAnimations}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      onClick={onClick}
    >
      {/* Background Layers */}
      <motion.div
        className="absolute h-full w-full bg-white"
        animate={{
          opacity: showDetail ? 0 : 1
        }}
      />

      <motion.div
        layoutId={`color-${id}`}
        className="absolute h-full w-full"
        style={{
          backgroundColor: color,
          opacity: showDetail ? 0.9 : 0
        }}
      />
      
      {/* Content Layer */}
      <div className="absolute z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {!showDetail ? (
            <motion.div 
              key="default"
              className="flex h-full flex-col p-4"
              variants={contentAnimations}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderContent?.default ? (
                renderContent.default()
              ) : (
                <>
                  <motion.h1
                    className={`font-medium leading-snug text-gray-900 ${sizeConfig.title}`}
                  >
                    {title}
                  </motion.h1>
                  {metadata && (
                    <motion.p 
                      className={`mt-1 text-gray-600 ${sizeConfig.metadata}`}
                    >
                      {metadata}
                    </motion.p>
                  )}
                  {description && (
                    <motion.p 
                      className="mt-2 text-gray-700"
                    >
                      {description}
                    </motion.p>
                  )}
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              className="absolute inset-0 flex flex-col justify-center p-8"
              variants={contentAnimations}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderContent?.expanded ? (
                renderContent.expanded()
              ) : (
                <motion.p
                  className={`text-white font-medium ${sizeConfig.detail}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: 0.15,
                    ease: ANIMATION_EASE
                  }}
                >
                  {detailContent}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button */}
      {hasDetail && (
        <ToggleButton
          color={color}
          onClick={(e) => {
            e.stopPropagation();
            setShowDetail(!showDetail);
          }}
          showDetail={showDetail}
          size={size}
        />
      )}
    </motion.div>
  );
};

interface ToggleButtonProps {
  color: string;
  showDetail: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: 'small' | 'medium' | 'large';
}

const buttonSizes = {
  small: "h-8 w-8",
  medium: "h-10 w-10",
  large: "h-12 w-12",
};

const ToggleButton: FC<ToggleButtonProps> = ({
  showDetail,
  onClick,
  size = 'medium'
}) => {
  const buttonSize = buttonSizes[size];

  return (
    <motion.button
      className={`absolute right-4 bottom-4 ${buttonSize} rounded-full 
        cursor-pointer flex items-center justify-center z-50`}
      animate={{
        backgroundColor: showDetail ? "#ffffff" : "rgba(0, 0, 0, 0.5)",
      }}
      transition={{ bounce: 0 }}
      onClick={onClick}
      aria-label={showDetail ? "Hide details" : "Show details"}
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{ 
          rotate: showDetail ? 45 : 0,
          color: showDetail ? "#000000" : "#ffffff" 
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon name="plus" className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
};

export default ElementCard;