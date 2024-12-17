// #app/interface/portfolio/utils/Slides.tsx

import  { type LocationData } from "#app/utils/location-data.ts";
import SliderCard from "./SliderCard";

type Props = {
  data: LocationData[];
};

function Slides({ data }: Props) {
  return (
    <div className=" flex w-full gap-6">
      {data.map((data) => {
        return <SliderCard key={data.img} data={data} />;
      })}
    </div>
  );
}

export default Slides;
