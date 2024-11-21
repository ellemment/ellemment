// #app/interface/composite/keynote/scroll-ux.tsx

import  { type Sequence } from "#app/utils/md/scroll/mdslides.server";
import { IntroInterfaceV1 } from "./components/interface-intro-v1";
import { IntroInterfaceV2 } from "./components/interface-intro-v2";
import { SequenceInterfaceV1  } from "./components/interface-sequence-v1";
import { SequenceInterfaceV2 } from "./components/interface-sequence-v2";
import { SequenceInterfaceV3 } from "./components/interface-sequence-v3";
import { SequenceInterfaceV4 } from "./components/interface-sequence-v4";
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
      <div className="h-60" />
      <SequenceInterfaceV1 /> 
      <div className="h-[25vh]" />
      <SequenceInterfaceV4 />
      <div className="h-[25vh]" />
      <IntroInterfaceV1 />
      <SequenceInterfaceV2 />
      <div className="h-[75vh]" />
      <IntroInterfaceV2 />
      <div className="h-[25vh]" />
      <SequenceInterfaceV5 slides={mutations} /> 
      <div className="mb-[-10vh]" />
      <SequenceInterfaceV3 slides={errors} />
    </div>
  );
}



