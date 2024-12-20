import { AnimatePresence, motion, type Variants, useMotionValue, useTransform, type PanInfo , useDragControls } from "framer-motion";
import React, { useCallback, useMemo, useRef, useState, type FC } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { type LocationData, locationData, initialData } from "#app/utils/company";
import { CompanyCard } from "./company-card";

// Constants
const TRANSITION_DELAY = 500;
const ANIMATION_EASE = [0.455, 0.03, 0.515, 0.955];
const DRAG_THRESHOLD = 50;

// Types
interface CurrentSlideData {
  data: LocationData;
  index: number;
}

interface ControlsProps {
  sliderData: LocationData[];
  data: LocationData[];
  transitionData: LocationData;
  currentSlideData: CurrentSlideData;
  handleData: React.Dispatch<React.SetStateAction<LocationData[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<LocationData>>;
  handleCurrentSlideData: React.Dispatch<React.SetStateAction<CurrentSlideData>>;
}

// Animation variants remain the same...
const textAnimationVariants: Variants = {
  hidden: {
    y: "100%",
    transition: { ease: ANIMATION_EASE, duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: ANIMATION_EASE, duration: 0.75 },
  },
};

// Utility Components (AnimatedText, SliderButton, Background) remain the same...
const AnimatedText: FC<{ data?: string; className?: string }> = React.memo(
  ({ data, className }) => (
    <span style={{ overflow: "hidden", display: "inline-block" }}>
      <motion.p className={className} variants={textAnimationVariants} key={data}>
        {data}
      </motion.p>
    </span>
  )
);
AnimatedText.displayName = "AnimatedText";

const SliderButton: FC<{ 
  children: React.ReactNode; 
  handleClick: () => void;
  ariaLabel: string;
}> = React.memo(({ children, handleClick, ariaLabel }) => (
  <button
    aria-label={ariaLabel}
    className="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-gray-300 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black active:bg-white active:text-black focus:bg-white focus:text-black focus-visible:outline-none group"
    onClick={handleClick}
  >
    {children}
  </button>
));
SliderButton.displayName = "SliderButton";

const Background: FC<{ 
  transitionData: LocationData; 
  currentSlideData: CurrentSlideData;
}> = React.memo(({ transitionData, currentSlideData }) => (
  <div 
    className="absolute left-0 top-0 h-full w-full" 
    style={{ backgroundColor: transitionData?.color || currentSlideData.data.color }}
  />
));
Background.displayName = "Background";

const Progress: FC<{ curIndex: number; length: number }> = React.memo(
  ({ curIndex, length }) => {
    const progressWidth = useMemo(
      () => `${((curIndex + 1) / length) * 100}%`,
      [curIndex, length]
    );

    return (
      <>
        <div className="flex h-[1px] flex-1 items-center rounded-full bg-gray-300">
          <div
            style={{ width: progressWidth }}
            className="h-[1px] rounded-full bg-gray-400 transition-all duration-300"
          />
        </div>
        <motion.div
          key={curIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center text-4xl font-medium text-white"
        >
          {String(curIndex + 1).padStart(2, '0')}
        </motion.div>
      </>
    );
  }
);
Progress.displayName = "Progress";

// Enhanced Controls with drag handling
const Controls: FC<ControlsProps> = React.memo(({
  sliderData,
  data,
  transitionData,
  currentSlideData,
  handleData,
  handleTransitionData,
  handleCurrentSlideData,
}) => {
  const handlePrev = useCallback(() => {
    if (data.length === 0) return;

    const lastItem = data[data.length - 1];
    if (!lastItem) return;

    handleData(prevData => [
      transitionData,
      ...prevData.slice(0, prevData.length - 1),
    ]);

    const nextIndex = sliderData.findIndex(ele => ele.id === lastItem.id);
    handleCurrentSlideData({
      data: transitionData,
      index: nextIndex >= 0 ? nextIndex : 0,
    });
    handleTransitionData(lastItem);
  }, [data, transitionData, sliderData, handleData, handleCurrentSlideData, handleTransitionData]);

  const handleNext = useCallback(() => {
    if (data.length === 0) return;

    const firstItem = data[0];
    if (!firstItem) return;

    handleData(prev => prev.slice(1));

    const nextIndex = sliderData.findIndex(ele => ele.id === firstItem.id);
    handleCurrentSlideData({
      data: transitionData,
      index: nextIndex >= 0 ? nextIndex : 0,
    });
    handleTransitionData(firstItem);

    setTimeout(() => {
      handleData(newData => [...newData, transitionData]);
    }, TRANSITION_DELAY);
  }, [data, transitionData, sliderData, handleData, handleCurrentSlideData, handleTransitionData]);

  return (
    <div className="flex items-center gap-3 py-10 md:py-5 px-0 md:px-1 max-md:pr-2 md:pr-6">
      <SliderButton handleClick={handlePrev} ariaLabel="Previous slide">
        <IoIosArrowBack className="text-xl" />
      </SliderButton>
      <SliderButton handleClick={handleNext} ariaLabel="Next slide">
        <IoIosArrowForward className="text-xl" />
      </SliderButton>
      <Progress curIndex={currentSlideData.index} length={sliderData.length} />
    </div>
  );
});
Controls.displayName = "Controls";

const OtherInfo: FC<{ data: LocationData }> = React.memo(({ data }) => (
  <motion.div 
    initial="hidden" 
    animate="visible" 
    className="flex flex-col max-md:pb-5"
    aria-label="Slide details"
  >
    <AnimatedText
      className="spacing overflow-hidden text-white"
      data={data.location || ''}
    />
    <AnimatedText
      className="my-1 text-4xl font-semibold md:my-3 md:text-8xl md:leading-[100px] text-white"
      data={data.title || ''}
    />
    <AnimatedText
      className="text-xs text-white"
      data={data.description || ''}
    />
  </motion.div>
));
OtherInfo.displayName = "OtherInfo";

// Enhanced DraggableSlides component with proper TypeScript types
const DraggableSlides: FC<{
    data: LocationData[];
    handleNext: () => void;
    handlePrev: () => void;
  }> = React.memo(({ data, handleNext, handlePrev }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragX = useMotionValue(0);
  
    const handleDragEnd = (_: never, info: PanInfo) => {
      const shouldTransition = Math.abs(info.offset.x) > DRAG_THRESHOLD || 
                             Math.abs(info.velocity.x) > 500;
      
      if (shouldTransition) {
        if (info.offset.x > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
      
      dragX.set(0);
    };
  
    const handleWheel = useCallback((event: React.WheelEvent) => {
      // Check if it's a horizontal scroll or shift+scroll
      const isHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
      
      if (!isHorizontal) return;
      
      // Accumulate scroll distance
      const scrollDelta = event.deltaX || event.deltaY;
      
      // Trigger next/prev based on scroll direction and threshold
      if (Math.abs(scrollDelta) > DRAG_THRESHOLD) {
        if (scrollDelta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        event.preventDefault();
      }
    }, [handleNext, handlePrev]);
  
    return (
      <div 
        ref={containerRef}
        className="relative w-full overflow-visible" 
        onWheel={handleWheel}
      >
        <motion.div
          className="flex gap-6 relative z-50 will-change-transform"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
        >
          {data.map((item) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 transform-gpu"
            >
              <CompanyCard
                id={item.id}
                title={item.title}
                description={item.description}
                detailContent={item.description}
                location={item.location}
                color={item.color}
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  });
  DraggableSlides.displayName = "DraggableSlides";
  
  const CareerCompany: FC = () => {
    const [data, setData] = React.useState<LocationData[]>(() => locationData().slice(1));
    const [transitionData, setTransitionData] = React.useState<LocationData>(initialData);
    const [currentSlideData, setCurrentSlideData] = React.useState<CurrentSlideData>({
      data: initialData,
      index: 0,
    });
  
    const handleNext = useCallback(() => {
      if (data.length === 0) return;
  
      const firstItem = data[0];
      if (!firstItem) return;
  
      setData(prev => prev.slice(1));
  
      const nextIndex = locationData().findIndex(ele => ele.id === firstItem.id);
      setCurrentSlideData({
        data: transitionData,
        index: nextIndex >= 0 ? nextIndex : 0,
      });
      setTransitionData(firstItem);
  
      setTimeout(() => {
        setData(newData => [...newData, transitionData]);
      }, TRANSITION_DELAY);
    }, [data, transitionData]);
  
    const handlePrev = useCallback(() => {
      if (data.length === 0) return;
  
      const lastItem = data[data.length - 1];
      if (!lastItem) return;
  
      setData(prevData => [
        transitionData,
        ...prevData.slice(0, prevData.length - 1),
      ]);
  
      const nextIndex = locationData().findIndex(ele => ele.id === lastItem.id);
      setCurrentSlideData({
        data: transitionData,
        index: nextIndex >= 0 ? nextIndex : 0,
      });
      setTransitionData(lastItem);
    }, [data, transitionData]);
  
    return (
      <main className="relative min-h-screen select-none overflow-hidden text-white antialiased">
        <Background
          key="background"
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <AnimatePresence>
          <div 
            key="content"
            className="absolute z-20 h-full w-full"
          >
            <div className="flex h-full w-full grid-cols-10 xl:pl-28 2xl:pl-32 flex-col md:grid">
              <div className="col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10 max-md:py-10">
                <OtherInfo data={transitionData || currentSlideData.data} />
              </div>
              <div className="col-span-6 flex h-full flex-1 flex-col justify-start p-0 pl-4 md:justify-center md:pl-10">
                <div className="relative w-full overflow-hidden">
                  <DraggableSlides 
                    data={data} 
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                </div>
                <Controls
                  currentSlideData={currentSlideData}
                  data={data}
                  transitionData={transitionData}
                  handleData={setData}
                  handleTransitionData={setTransitionData}
                  handleCurrentSlideData={setCurrentSlideData}
                  sliderData={locationData()}
                />
              </div>
            </div>
          </div>
        </AnimatePresence>
      </main>
    );
  };
  
  export default CareerCompany;