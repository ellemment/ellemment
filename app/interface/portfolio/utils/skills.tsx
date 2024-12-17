// #app/interface/portfolio/utils/skills.tsx

import { AnimatePresence } from "framer-motion";
import React from "react";
import { type LocationData, locationData, initialData } from "#app/utils/location-data";
import BackgroundImage from "./BackgroundImage";
import Controls from "./Controls";
import SlideInfo from "./SlideInfo";
import Slides from "./Slides";

export type CurrentSlideData = {
  data: LocationData;
  index: number;
};

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
                initData={initialData}
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