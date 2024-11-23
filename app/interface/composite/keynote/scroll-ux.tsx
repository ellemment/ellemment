// #app/interface/composite/keynote/scroll-ux.tsx

import  { type Sequence } from "#app/utils/md/scroll/mdslides.server";
import { IntroInterfaceV3 } from "./components/interface-intro-v3";
import { IntroInterfaceV4 } from "./components/interface-intro-v4";
import { SequenceInterfaceV1  } from "./components/interface-sequence-v1";
import { SequenceInterfaceV3 } from "./components/interface-sequence-v3";
import { SequenceInterfaceV5 } from "./components/interface-sequence-v5";


export function ScrollExperience({
  mutations,
  errors,
}: {
  mutations: Sequence;
  errors: Sequence;
}) {
  return (
    <div>
      <img src="/wave.png" alt="" className="absolute -left-full" />
      <img src="/loading.gif" alt="" className="absolute -left-full" />
      <div className="h-[75vh]" />
      <SequenceInterfaceV1 />
      <div className="h-[25vh]" />
      <IntroInterfaceV3 />  
      <div className="h-[25vh]" />
      <SequenceInterfaceV5 slides={mutations} /> 
      <div className="h-[25vh]" />
      <IntroInterfaceV4 />  
    </div>
  );
}



