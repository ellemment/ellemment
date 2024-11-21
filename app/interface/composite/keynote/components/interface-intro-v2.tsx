// #app/interface/composite/keynote/components/interface-intro-v2.tsx

import * as React from "react";
import { Actor, ScrollStage, useActor } from "../stage";

export function IntroInterfaceV2() {
  return (
    <>
      <ScrollStage pages={0.25}>
        <Actor start={0.01} end={1}>
          <Glitch />
        </Actor>
      </ScrollStage>
      <ScrollStage pages={1} fallbackLength={100} fallbackFrame={0}>
        <Actor start={0.01} end={0.95}>
          <div className="fixed inset-0 bg-blue-600" />
        </Actor>
        <BlueScreen />
      </ScrollStage>
    </>
  );
}

function Glitch() {
  const actor = useActor();
  const vals = [1, -1, 2, -2, 3, -3];
  const ruhRuh_Random = () => vals[Math.floor(Math.random() * vals.length)];
  
  return (
    <div className="fixed inset-0 motion-reduce:hidden">
      <img
        alt=""
        className="relative h-[110%] w-[110%]"
        style={{
          left: actor?.progress === 0 ? "0" : ruhRuh_Random() + "px",
          top: actor?.progress === 0 ? "0" : ruhRuh_Random() + "px",
        }}
        src="/busted.jpg"
      />
    </div>
  );
}

function BlueScreen() {
  return (
    <section className="relative z-10 h-full bg-blue-600 px-6 pb-32 text-lg text-white sm:px-36 sm:pb-40 sm:text-xl">
      <h2 className="sr-only">Error Handling</h2>
      <div aria-hidden className="text-6xl sm:text-7xl md:text-[length:120px]">
        :)
      </div>
      <div className="my-10 sm:my-16 sm:max-w-4xl md:text-[length:30px] md:leading-[40px]">
        Your websites run into problems, but with Remix they don't need to be
        refreshed. Error handling is hard to remember and hard to do. That's why
        it's built in.
      </div>
      <div className="my-10 sm:my-16 sm:max-w-4xl md:text-[length:30px] md:leading-[40px]">
        Remix handles errors while Server Rendering. Errors while Client
        Rendering. Even errors in your server side data handling.
      </div>
      <img className="h-24 w-24" alt="" aria-hidden src="/qrcode.png" />
    </section>
  );
}

export default IntroInterfaceV2;