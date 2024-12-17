// #app/interface/portfolio/utils/BackgroundImage.tsx

import { motion } from "framer-motion";
import { type LocationData } from "#app/utils/location-data.ts";

type Props = {
  transitionData: LocationData;
  currentSlideData: {
    data: LocationData;
    index: number;
  };
};

function BackgroundImage({ transitionData, currentSlideData }: Props) {
  return (
    <>
      {/* Background Transition Animation  */}
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

      {/* Background Image */}
      <motion.img
        alt="Current Image"
        key={currentSlideData.data.img + "transition"}
        src={currentSlideData.data.img}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />
    </>
  );
}

export default BackgroundImage;
