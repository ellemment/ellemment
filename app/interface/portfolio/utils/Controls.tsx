// #app/interface/portfolio/utils/Controls.tsx

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import  { type LocationData } from "#app/utils/location-data";
import Progress from "./Progress";

export type CurrentSlideData = {
  data: LocationData;
  index: number;
};

type Props = {
  currentSlideData: CurrentSlideData;
  sliderData: LocationData[];
  data: LocationData[];
  transitionData: LocationData;
  handleData: React.Dispatch<React.SetStateAction<LocationData[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<LocationData>>;
  handleCurrentSlideData: React.Dispatch<React.SetStateAction<CurrentSlideData>>;
  initData: LocationData;
};

function Controls({
  sliderData,
  data,
  transitionData,
  currentSlideData,
  handleData,
  handleTransitionData,
  handleCurrentSlideData,
}: Props) {
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

type SliderButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

const SliderButton = ({ children, handleClick }: SliderButtonProps) => {
  return (
    <button
      className="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-[#fdfdfd5f] transition duration-300 ease-in-out hover:bg-white hover:text-black"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Controls;