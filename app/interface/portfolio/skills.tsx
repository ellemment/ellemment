import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { type LocationData, locationData, initialData } from "#app/utils/location-data";

// Types
export type CurrentSlideData = {
  data: LocationData;
  index: number;
};

// Animation variants
const textAnimationItem = {
  hidden: {
    y: "100%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};

// AnimatedText Component
const AnimatedText = ({
  data,
  className,
}: {
  data?: string;
  className?: string;
}) => {
  return (
    <span style={{ overflow: "hidden", display: "inline-block" }}>
      <motion.p className={className} variants={textAnimationItem} key={data}>
        {data}
      </motion.p>
    </span>
  );
};

// BackgroundImage Component
function BackgroundImage({ 
  transitionData, 
  currentSlideData 
}: { 
  transitionData: LocationData; 
  currentSlideData: CurrentSlideData;
}) {
  return (
    <>
      {transitionData && (
        <motion.img
          key={transitionData.img}
          layoutId={transitionData.img}
          alt="Transition Image"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 z-10 h-full w-full object-cover brightness-50"
          src={transitionData.img}
        />
      )}
      <motion.img
        alt="Current Image"
        key={currentSlideData.data.img + "transition"}
        src={currentSlideData.data.img}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />
    </>
  );
}

// Progress Component
function Progress({ curIndex, length }: { curIndex: number; length: number }) {
  return (
    <>
      <div className="flex h-[1px] flex-1 items-center rounded-full bg-white bg-opacity-50">
        <div
          style={{
            width: (((curIndex + 1) / length) * 100).toString() + "%",
          }}
          className="h-[1px] rounded-full bg-green-500 bg-opacity-50"
        />
      </div>
      <span
        key={curIndex}
        style={{
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={curIndex}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex items-center text-4xl font-medium"
        >
          0{curIndex + 1}
        </motion.div>
      </span>
    </>
  );
}

// SliderButton Component
const SliderButton = ({ 
  children, 
  handleClick 
}: { 
  children: React.ReactNode; 
  handleClick: () => void;
}) => {
  return (
    <button
      className="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-[#fdfdfd5f] transition duration-300 ease-in-out hover:bg-white hover:text-black"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

// Controls Component
function Controls({
  sliderData,
  data,
  transitionData,
  currentSlideData,
  handleData,
  handleTransitionData,
  handleCurrentSlideData,
}: {
  sliderData: LocationData[];
  data: LocationData[];
  transitionData: LocationData;
  currentSlideData: CurrentSlideData;
  handleData: React.Dispatch<React.SetStateAction<LocationData[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<LocationData>>;
  handleCurrentSlideData: React.Dispatch<React.SetStateAction<CurrentSlideData>>;
}) {
  const handlePrev = () => {
    if (data.length === 0) return;

    const lastItem = data[data.length - 1];
    if (!lastItem) return;

    handleData((prevData) => [
      transitionData,
      ...prevData.slice(0, prevData.length - 1),
    ]);

    const nextIndex = sliderData.findIndex((ele) => ele.img === lastItem.img);

    handleCurrentSlideData({
      data: transitionData,
      index: nextIndex >= 0 ? nextIndex : 0,
    });

    handleTransitionData(lastItem);
  };

  const handleNext = () => {
    if (data.length === 0) return;

    const firstItem = data[0];
    if (!firstItem) return;

    handleData((prev) => prev.slice(1));

    const nextIndex = sliderData.findIndex((ele) => ele.img === firstItem.img);

    handleCurrentSlideData({
      data: transitionData,
      index: nextIndex >= 0 ? nextIndex : 0,
    });

    handleTransitionData(firstItem);

    setTimeout(() => {
      handleData((newData) => [...newData, transitionData]);
    }, 500);
  };

  return (
    <div className="flex items-center gap-3 px-0 py-3 md:px-1 md:py-5">
      <SliderButton handleClick={handlePrev}>
        <IoIosArrowBack className="text-xl" />
      </SliderButton>
      <SliderButton handleClick={handleNext}>
        <IoIosArrowForward className="text-xl" />
      </SliderButton>
      <Progress curIndex={currentSlideData.index} length={sliderData.length} />
    </div>
  );
}

// OtherInfo Component
function OtherInfo({ data }: { data: LocationData }) {
  return (
    <motion.div initial="hidden" animate="visible" className="flex flex-col">
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
  );
}

// SlideInfo Component
function SlideInfo({ 
  transitionData, 
  currentSlideData 
}: { 
  transitionData: LocationData; 
  currentSlideData: CurrentSlideData;
}) {
  return (
    <OtherInfo data={transitionData ? transitionData : currentSlideData.data} />
  );
}

// SliderCard Component
function SliderCard({ data }: { data: LocationData }) {
  return (
    <motion.div
      className="relative h-52 min-w-[250px] rounded-2xl shadow-md md:h-80 md:min-w-[250px]"
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      <motion.img
        layoutId={data.img}
        alt="Transition Image"
        src={data.img}
        className="absolute h-full w-full rounded-2xl object-cover brightness-75"
      />
      <motion.div className="absolute z-10 flex h-full items-end p-4">
        <motion.div>
          <motion.p layoutId={data.location} className="text-xs text-[#D5D5D6]">
            {data.location}
          </motion.p>
          <motion.h1
            layoutId={data.title}
            className="text-xl leading-6 text-white"
          >
            {data.title}
          </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Slides Component
function Slides({ data }: { data: LocationData[] }) {
  return (
    <div className="flex w-full gap-6">
      {data.map((item) => (
        <SliderCard key={item.img} data={item} />
      ))}
    </div>
  );
}

// Main Skills Component
export default function Skills() {
  const [data, setData] = React.useState<LocationData[]>(locationData().slice(1));
  const [transitionData, setTransitionData] = React.useState<LocationData>(initialData);
  const [currentSlideData, setCurrentSlideData] = React.useState<CurrentSlideData>({
    data: initialData,
    index: 0,
  });

  return (
    <main className="relative min-h-screen select-none overflow-hidden text-white antialiased">
      <AnimatePresence>
        <BackgroundImage
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <div className="absolute z-20 h-full w-full">
          <div className="flex h-full w-full grid-cols-10 flex-col md:grid">
            <div className="col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />
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
}