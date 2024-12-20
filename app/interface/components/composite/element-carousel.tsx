// #app/interface/components/composite/element-carousel.tsx

import { AnimatePresence, motion, useMotionValue, type PanInfo } from "framer-motion";
import React, { useCallback, useRef, useState, type FC } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useBreakpoint } from "#app/utils/hooks/use-mobile";

// Constants
const ANIMATION_EASE = [0.455, 0.03, 0.515, 0.955];
const DRAG_THRESHOLD = 50;

// Types
export interface CarouselItem {
  id: string;
  [key: string]: any;
}

interface ElementCarouselProps<T extends CarouselItem> {
  items: T[];
  initialIndex?: number;
  renderItem: (item: T) => React.ReactNode;
  renderInfo?: (item: T) => React.ReactNode;
  backgroundColor?: string;
  className?: string;
  onItemChange?: (item: T, index: number) => void;
  infinite?: boolean;
  autoPlay?: {
    enabled: boolean;
    interval?: number;
    pauseOnHover?: boolean;
  };
}

interface ControlsProps<T extends CarouselItem> {
  items: readonly T[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  infinite?: boolean;
  className?: string;
}

// Utility Components
const CarouselButton: FC<{
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}> = React.memo(({ onClick, disabled, ariaLabel, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className="flex h-14 w-14 items-center justify-center rounded-full 
      border border-gray-300 text-white transition-all duration-300 
      hover:bg-white hover:text-black disabled:opacity-50 
      disabled:hover:bg-transparent disabled:hover:text-white
      focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
  >
    {children}
  </button>
));
CarouselButton.displayName = "CarouselButton";

const Progress: FC<{ currentIndex: number; total: number }> = React.memo(
  ({ currentIndex, total }) => {
    const progressWidth = `${((currentIndex + 1) / total) * 100}%`;

    return (
      <div className="flex items-center gap-4 text-white">
        <div className="h-[1px] w-40 bg-gray-300">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>
        <span className="text-2xl font-medium">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
      </div>
    );
  }
);
Progress.displayName = "Progress";

const Controls = <T extends CarouselItem>({
  items,
  currentIndex,
  onNext,
  onPrev,
  infinite = false,
  className = ""
}: ControlsProps<T>) => {
  const canGoPrev = infinite || currentIndex > 0;
  const canGoNext = infinite || currentIndex < items.length - 1;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <CarouselButton
        onClick={onPrev}
        disabled={!canGoPrev}
        ariaLabel="Previous slide"
      >
        <IoIosArrowBack className="text-xl" />
      </CarouselButton>
      <CarouselButton
        onClick={onNext}
        disabled={!canGoNext}
        ariaLabel="Next slide"
      >
        <IoIosArrowForward className="text-xl" />
      </CarouselButton>
      <Progress currentIndex={currentIndex} total={items.length} />
    </div>
  );
};

export const ElementCarousel = <T extends CarouselItem>({
  items,
  initialIndex = 0,
  renderItem,
  renderInfo,
  backgroundColor = "#000000",
  className = "",
  onItemChange,
  infinite = false,
  autoPlay
}: ElementCarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(() => 
    Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1))
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const { isMobile } = useBreakpoint();
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const currentItem = items[currentIndex];
  const hasItems = items.length > 0;

  const handleNext = useCallback(() => {
    if (!hasItems) return;
    
    setCurrentIndex(prev => {
      const next = prev + 1;
      if (next >= items.length) {
        return infinite ? 0 : prev;
      }
      return next;
    });
  }, [hasItems, items.length, infinite]);

  const handlePrev = useCallback(() => {
    if (!hasItems) return;
    
    setCurrentIndex(prev => {
      const next = prev - 1;
      if (next < 0) {
        return infinite ? items.length - 1 : prev;
      }
      return next;
    });
  }, [hasItems, items.length, infinite]);

  const handleDragEnd = useCallback((_: never, info: PanInfo) => {
    if (!hasItems) return;
    
    const shouldTransition = 
      Math.abs(info.offset.x) > DRAG_THRESHOLD || 
      Math.abs(info.velocity.x) > 500;
    
    if (shouldTransition) {
      if (info.offset.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    dragX.set(0);
  }, [hasItems, handleNext, handlePrev, dragX]);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!hasItems) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasItems, handleNext, handlePrev]);

  // Handle auto play
  React.useEffect(() => {
    if (!hasItems || !autoPlay?.enabled || (autoPlay.pauseOnHover && isHovered)) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, autoPlay.interval || 3000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [hasItems, autoPlay, isHovered, handleNext]);

  // Notify item change
  React.useEffect(() => {
    if (hasItems && currentItem && onItemChange) {
      onItemChange(currentItem, currentIndex);
    }
  }, [hasItems, currentItem, currentIndex, onItemChange]);

  if (!hasItems) {
    return null;
  }

  return (
    <div
      className={`relative min-h-screen w-full select-none overflow-hidden ${className}`}
      style={{ backgroundColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full w-full flex-col md:grid md:grid-cols-10">
        {/* Info Panel */}
        {renderInfo && currentItem && (
          <div className="col-span-4 flex flex-1 flex-col justify-end px-5 py-10 
            md:justify-center md:px-10 md:py-0"
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: ANIMATION_EASE }}
              >
                {renderInfo(currentItem)}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Carousel */}
        <div className="col-span-6 flex flex-1 flex-col justify-start p-0 
          pl-4 md:justify-center md:pl-10"
        >
          <div 
            ref={containerRef}
            className="relative w-full overflow-hidden"
          >
            <motion.div
              className="flex gap-6"
              drag={isMobile ? "x" : false}
              dragConstraints={containerRef}
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 transform-gpu"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    filter: idx === currentIndex ? 'none' : 'brightness(0.7)'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {renderItem(item)}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <Controls
            items={items}
            currentIndex={currentIndex}
            onNext={handleNext}
            onPrev={handlePrev}
            infinite={infinite}
            className="px-4 py-8 md:py-10"
          />
        </div>
      </div>
    </div>
  );
};

export default ElementCarousel;