// #app/interface/portfolio/utils/SlideInfo.tsx

import  { type LocationData } from "#app/utils/location-data.ts";
import OtherInfo from "./OtherInfo";

interface CurrentSlideData {
  data: LocationData;
  index: number;
}

type Props = {
  transitionData: LocationData;
  currentSlideData: CurrentSlideData;
};

function SlideInfo({ transitionData, currentSlideData }: Props) {
  return (
    <>
        <OtherInfo
          data={transitionData ? transitionData : currentSlideData.data}
        />
    </>
  );
}

export default SlideInfo;
