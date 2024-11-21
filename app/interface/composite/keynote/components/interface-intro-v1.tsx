// #app/interface/composite/keynote/components/interface-iconspin.tsx

import * as React from "react";
import tweenFunctions from "tween-functions";
import { Actor, ScrollStage, useActor, useStage } from "../stage";

const { easeInExpo, linear } = tweenFunctions;
const SPINNER_END = 0.8;

export function IntroInterfaceV1() {
    return (
        <ScrollStage pages={1.5}>
            <Spinners />
            <Actor start={0} end={SPINNER_END}>
                <SayGoodbye />
            </Actor>
            <SayGoodbyeOutro />
        </ScrollStage>
    );
}

function Spinners() {
    const stage = useStage();
    const endBy = 0.5;
    const start = (n: number) => (endBy / 20) * n;

    return (
        <div
            hidden={stage.progress === 0 || stage.progress === 1}
            className="fixed inset-0 overflow-hidden"
        >
            <Spinner
                start={start(1)}
                className="11 absolute bottom-[25vh] left-[8vw] h-[8vh] w-[8vh] md:h-[8vw] md:w-[8vw]"
            />
            <Spinner
                start={start(2)}
                className="16 absolute bottom-[23vh] right-[32vw] h-[5vh] w-[5vh] md:h-[5vw] md:w-[5vw]"
            />
            <Spinner
                start={start(3)}
                className="4 absolute left-[-4vw] top-[24vh] h-[13vh] w-[13vh] md:top-[16vh] md:h-[13vw] md:w-[13vw]"
            />
            <Spinner
                start={start(4)}
                className="17 absolute bottom-[-5vh] right-[18vw] h-[13vh] w-[13vh] md:bottom-[-4vh] md:h-[13vw] md:w-[13vw]"
            />
            <Spinner
                start={start(5)}
                className="13 absolute bottom-[-3vh] left-[15vw] h-[13vh] w-[13vh] md:left-[20vw] md:h-[13vw] md:w-[13vw]"
            />
            <Spinner
                start={start(6)}
                className="7 absolute right-[-2vw] top-[20vh] h-[13vh] w-[13vh] md:top-[12vh] md:h-[13vw] md:w-[13vw]"
            />
            <Spinner
                start={start(7)}
                className="14 absolute bottom-[16vh] left-[35vw] h-[5vh] w-[5vh] md:h-[5vw] md:w-[5vw]"
            />
            <Spinner
                start={start(8)}
                className="20 absolute bottom-[10vh] right-[-5vw] h-[13vh] w-[13vh] md:bottom-[3vh] md:h-[13vw] md:w-[13vw]"
            />
            <Spinner
                start={start(9)}
                className="10 absolute bottom-[37vh] left-[3vw] h-[5vh] w-[5vh] md:bottom-[42vh] md:h-[5vw] md:w-[5vw]"
            />
            <Spinner
                start={start(10)}
                className="9 absolute right-[3vw] top-[38vh] h-[5vh] w-[5vh] md:top-[50vh] md:h-[5vw] md:w-[5vw]"
            />
            <Spinner
                start={start(11)}
                className="19 absolute bottom-[36vh] right-[10vw] h-[5vh] w-[5vh] md:bottom-[9vh] md:h-[5vw] md:w-[5vw]"
            />
            <Spinner
                start={start(12)}
                className="15 absolute bottom-[30vh] right-[40vw] h-[8vh] w-[8vh] md:bottom-[2vh] md:h-[8vw] md:w-[8vw]"
            />
            <Spinner
                start={start(13)}
                className="18 absolute bottom-[25vh] right-[7vw] h-[8vh] w-[8vh] md:h-[8vw] md:w-[8vw]"
            />
            <Spinner
                start={start(14)}
                className="6 absolute right-[22vw] top-[8vh] h-[8vh] w-[8vh] md:h-[8vw] md:w-[8vw]"
            />
            <Spinner
                start={start(15)}
                className="3 absolute right-[10vw] top-[1vh] h-[5vh] w-[5vh] md:h-[5vw] md:w-[5vw]"
            />
            <Spinner
                start={start(16)}
                className="12 absolute bottom-[12vh] left-[2vw] h-[8vh] w-[8vh] md:bottom-[2vh] md:h-[8vw] md:w-[8vw]"
            />
            <Spinner
                start={start(17)}
                className="8 absolute left-[48vw] top-[35vh] h-[5vh] w-[5vh] md:top-[25vh] md:h-[5vw] md:w-[5vw]"
            />
            <Spinner
                start={start(18)}
                className="5 absolute left-[35vw] top-[20vh] h-[8vh] w-[8vh] md:top-[12vh] md:h-[8vw] md:w-[8vw]"
            />
            <Spinner
                start={start(19)}
                className="1 absolute left-[4vw] top-[-5vh] h-[13vh] w-[13vh] md:left-[13vw] md:h-[13vw] md:w-[13vw]"
            />
            <Spinner
                start={start(20)}
                className="2 absolute right-[40vw] top-[-1vh] h-[8vh] w-[8vh] md:h-[8vw] md:w-[8vw]"
            />
        </div>
    );
}

function Spinner({ className, start }: { className: string; start: number }) {
    return (
        <>
            <Actor start={start} end={SPINNER_END}>
                <img src="/loading.gif" alt="" className={className} />
            </Actor>
            <Actor start={SPINNER_END} end={1}>
                <Wave className={className} />
            </Actor>
        </>
    );
}

function Wave({ className }: { className: string }) {
    const actor = useActor();
    const opacity = easeInExpo(actor.progress, 1, 0, 1);
    return (
        <img
            src="/wave.png"
            alt=""
            style={{ opacity, transform: `scale(${opacity})` }}
            className={className}
        />
    );
}

function SayGoodbye() {
    const actor = useActor();
    const opacity = easeInExpo(actor.progress, 0, 1, 1);
    const scale = linear(actor.progress, 10, 1, 1);

    return (
        <div
            style={{
                opacity,
                transform: `scale(${scale})`,
            }}
            className={`flex h-screen w-screen items-center justify-center text-center text-5xl font-black text-white 
                sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl ${actor.progress > 0 && actor.progress < 1 ? "fixed inset-0" : "hidden"}`}
        >
            Say good&shy;bye to Spinnageddon
        </div>
    );
}

function SayGoodbyeOutro() {
    const stage = useStage();
    return (
        <div
            aria-hidden
            className={`sm:leading-6xl sticky top-0 flex h-screen w-screen items-center justify-center text-center text-4xl 
                font-black text-white sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl ${stage.progress < SPINNER_END ? "hidden" : ""}`}
        >
            Say good&shy;bye to Spinnageddon
        </div>
    );
}