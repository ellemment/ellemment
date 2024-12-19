import { AnimatePresence, motion, type Variants } from "framer-motion";
import React, { useCallback, useMemo, type FC } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { type LocationData, locationData, initialData } from "#app/utils/location-data";

// Constants
const TRANSITION_DELAY = 500;
const ANIMATION_EASE = [0.455, 0.03, 0.515, 0.955];

// Utility function for gradient string generation
const createGradientString = (gradient: LocationData['gradient']) => {
  const { angle, stops } = gradient;
  return `linear-gradient(${angle}deg, ${stops.map(stop => 
    `${stop.color} ${stop.position}%`
  ).join(', ')})`;
};

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

// Animation variants
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

const cardAnimationVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: { scale: 0.8, opacity: 0 },
};

// Utility Components
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
    className="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-[#fdfdfd5f] transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    onClick={handleClick}
  >
    {children}
  </button>
));
SliderButton.displayName = "SliderButton";

// Main Components
const Background: FC<{ 
  transitionData: LocationData; 
  currentSlideData: CurrentSlideData;
}> = React.memo(({ transitionData, currentSlideData }) => (
  <>
    {transitionData && (
      <motion.div
        key={transitionData.id}
        layoutId={`gradient-${transitionData.id}`}
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 0.6 },
        }}
        className="absolute left-0 top-0 z-10 h-full w-full"
        style={{
          backgroundImage: createGradientString({
            ...transitionData.gradient,
            // Slightly modify angle for visual interest during transition
            angle: transitionData.gradient.angle + 15
          }),
        }}
      />
    )}
    <motion.div
      key={`gradient-${currentSlideData.data.id}-transition`}
      className="absolute left-0 top-0 h-full w-full"
      style={{
        backgroundImage: createGradientString(currentSlideData.data.gradient),
      }}
    />
  </>
));

const Progress: FC<{ curIndex: number; length: number }> = React.memo(
  ({ curIndex, length }) => {
    const progressWidth = useMemo(
      () => `${((curIndex + 1) / length) * 100}%`,
      [curIndex, length]
    );

    return (
      <>
        <div className="flex h-[1px] flex-1 items-center rounded-full bg-gray-400 bg-opacity-50">
          <div
            style={{ width: progressWidth }}
            className="h-[1px] rounded-full bg-white bg-opacity-50 transition-all duration-300"
          />
        </div>
        <motion.div
          key={curIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center text-4xl font-medium"
        >
          {String(curIndex + 1).padStart(2, '0')}
        </motion.div>
      </>
    );
  }
);
Progress.displayName = "Progress";

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
    <div className="flex items-center gap-3 px-0 py-3 md:px-1 md:py-5">
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

const SliderCard: FC<{ data: LocationData }> = React.memo(({ data }) => (
  <motion.div
    className="relative h-52 min-w-[250px] rounded-2xl shadow-md md:h-80 md:min-w-[250px] overflow-hidden"
    layout
    variants={cardAnimationVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{
      type: "spring",
      damping: 20,
      stiffness: 100,
    }}
  >
    <motion.div
      layoutId={`gradient-${data.id}`}
      className="absolute h-full w-full"
      style={{
        backgroundImage: createGradientString(data.gradient),
      }}
      animate={{
        background: createGradientString(data.gradient)
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
    />
    {/* Add a subtle overlay gradient for better text visibility */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))'
      }}
    />
    <motion.div className="absolute z-10 flex h-full items-end p-4">
      <motion.div>
        <motion.p layoutId={`location-${data.id}`} className="text-xs text-[#D5D5D6]">
          {data.location}
        </motion.p>
        <motion.h1
          layoutId={`title-${data.id}`}
          className="text-xl leading-6 text-white"
        >
          {data.title}
        </motion.h1>
      </motion.div>
    </motion.div>
  </motion.div>
));

const OtherInfo: FC<{ data: LocationData }> = React.memo(({ data }) => (
  <motion.div 
    initial="hidden" 
    animate="visible" 
    className="flex flex-col"
    aria-label="Slide details"
  >
    <AnimatedText
      className="spacing overflow-hidden text-[#D5D5D6]"
      data={data?.location}
    />
    <AnimatedText
      className="my-1 text-4xl font-semibold md:my-3 md:text-8xl md:leading-[100px]"
      data={data?.title}
    />
    <AnimatedText
      className="text-xs text-[#D5D5D6]"
      data={data?.description}
    />
  </motion.div>
));
OtherInfo.displayName = "OtherInfo";

const Slides: FC<{ data: LocationData[] }> = React.memo(({ data }) => (
  <div className="flex w-full gap-6">
    {data.map((item) => (
      <SliderCard key={item.id} data={item} />
    ))}
  </div>
));
Slides.displayName = "Slides";

// Main Component
const Skills: FC = () => {
  const [data, setData] = React.useState<LocationData[]>(() => locationData().slice(1));
  const [transitionData, setTransitionData] = React.useState<LocationData>(initialData);
  const [currentSlideData, setCurrentSlideData] = React.useState<CurrentSlideData>({
    data: initialData,
    index: 0,
  });

  return (
    <main className="relative min-h-screen select-none overflow-hidden text-white antialiased">
      <AnimatePresence mode="wait">
        <Background
          key="background"
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <div 
          key="content"
          className="absolute z-20 h-full w-full"
        >
          <div className="flex h-full w-full grid-cols-10 flex-col md:grid">
            <div className="col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
              <OtherInfo data={transitionData || currentSlideData.data} />
            </div>
            <div className="col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:p-10">
              <Slides data={data} />
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

export default Skills;