// #app/interface/composite/keynote/components/interface-dualscreen.tsx

// #app/interface/composite/keynote/components/interface-dualscreen.tsx
import * as React from "react";
import { type Sequence, type Slide } from "#app/utils/md/scroll/mdslides.server";
import { Actor, ScrollStage, useActor } from "../stage";
import { JumboText } from "./interface-intro-v0";

export function SequenceInterfaceV5({ slides }: { slides: Sequence }) {
    return (
        <section>
            <div className="mx-auto max-w-5xl p-6 md:p-10">
                <div className="mb-8 text-4xl font-black text-white sm:text-5xl md:text-6xl">
                    <h2 className="inline">Data loading</h2>{" "}
                    <span aria-hidden>
                        ... <img src="/yawn.png" alt="" className="inline h-8 md:h-14" />
                    </span>
                    <p>
                        You ever notice most of the code in your app is for{" "}
                        <span className="text-yellow-600">changing data?</span>
                    </p>
                </div>
                <p className="hyphen-manual mt-2 text-lg md:pr-52 md:text-xl lg:pr-72">
                    Imagine if React only had props and no way to set state. What's the
                    point? If a web framework helps you load data but doesn't help you
                    update it, what's the point? Remix doesn't drop you off at the{" "}
                    <code>&lt;form onSubmit&gt;</code> cliff.{" "}
                    <span className="text-gray-400">
                        (What the heck does <code>event.preventDefault</code> do anyway?)
                    </span>
                </p>
            </div>
            <div className="h-[25vh]" />
            <JumboText>
                Resilient, progressively enhanced{" "}
                <span className="text-blue-600">data updates</span> are built in.
            </JumboText>
            <div className="h-[25vh]" />
            <SequenceInterfaceSlides sequence={slides} />
        </section>
    );
}

function SequenceInterfaceSlides({ sequence }: { sequence: Sequence }) {
    const slideLength = 1 / 6;
    return (
        <ScrollStage pages={5.5} fallbackLength={100} fallbackFrame={25}>
            <div className="xl:flex">
                <div className="p-max-w-lg flex-1 xl:mx-auto">
                    <div className="xl:h-[12vh]" />
                    <div className="max-w-full px-6">
                        <SlideContent>
                            It's so simple it's kind of silly. Just make a form...
                        </SlideContent>
                        <SlideContent>
                            ...and an action on a route module. It looks like traditional HTML
                            forms but enables fully dynamic web experiences you're after.
                        </SlideContent>
                        <SlideContent>
                            Remix runs the action server side, revalidates data client side,
                            and even handles race conditions from resubmissions.
                        </SlideContent>
                        <SlideContent>
                            Get fancy with transition hooks and make some pending UI. Remix
                            handles all the state, you simply ask for it.
                        </SlideContent>
                        <SlideContent>
                            Or get jiggy with some optimistic UI. Remix provides the data
                            being sent to the server so you can skip the busy spinners for
                            mutations, too.
                        </SlideContent>
                        <SlideContent>HTML forms for mutations. Who knew?</SlideContent>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-[#252525] xl:bottom-auto xl:top-0 xl:flex xl:h-screen xl:flex-1 xl:items-center xl:self-start">
                    <DualScreenCode start={0} end={slideLength * 1.5} slide={getSlideOrDefault(sequence.slides, 0)} />
                    <DualScreenCode start={slideLength * 1.5} end={slideLength * 2.5} slide={getSlideOrDefault(sequence.slides, 1)} />
                    <Actor start={slideLength * 2.5} end={slideLength * 3.2}>
                        <DualScreenNetwork />
                    </Actor>
                    <DualScreenCode start={slideLength * 3.2} end={0.66} 
                        slide={getSlideOrDefault(sequence.slides, 2) || getSlideOrDefault(sequence.slides, 0)} />
                    <DualScreenCode start={0.66} end={2} 
                        slide={getSlideOrDefault(sequence.slides, 3) || getSlideOrDefault(sequence.slides, 0)} />
                </div>
            </div>
        </ScrollStage>
    );
}

function getSlideOrDefault(slides: Slide[], index: number): Slide {
    const defaultSlide: Slide = {
        subject: '',
        type: 'slide',
        html: '',
    };
    return slides[index] ?? defaultSlide;
}

function SlideContent({ children }: { children: React.ReactNode }) {
    return (
        <p className="flex min-h-[75vh] max-w-2xl items-center px-6 text-4xl font-black text-gray-100 sm:mx-auto sm:px-8 md:text-6xl">
            {children}
        </p>
    );
}

function DualScreenNetwork() {
    return (
        <div className="flex h-[50vh] select-none items-center justify-center xl:w-full" aria-hidden>
            <div className="w-4/5 pb-10">
                <Network>
                    <Resource name="POST new" start={0} size={40} />
                    <Resource name="GET invoices" start={40} size={10} _cancel _hideUntilStart />
                    <Resource name="GET 102000" start={40} size={10} _cancel _hideUntilStart />
                    <Resource name="POST new" start={50} size={20} _hideUntilStart />
                    <Resource name="GET invoices" start={70} size={20} _hideUntilStart />
                    <Resource name="GET 102000" start={70} size={15} _hideUntilStart />
                </Network>
            </div>
        </div>
    );
}

export function DualScreenCode({
    slide,
    start,
    end,
    persistent,
}: {
    slide: Slide;
    start: number;
    end: number;
    persistent?: boolean;
}) {
    return (
        <Actor start={start} end={end} persistent={persistent}>
            <div
                className="__mutation_code text-sm sm:text-base md:text-lg xl:w-full"
                dangerouslySetInnerHTML={{ __html: slide.subject }}
            />
        </Actor>
    );
}

function Network({
    children,
    ticks = 50,
}: {
    children: React.ReactNode;
    ticks?: number;
}) {
    const actor = useActor();
    return (
        <div className="relative">
            <Ticks n={ticks} />
            <div className="h-4" />
            <div>{children}</div>
            <div className="absolute left-16 right-0 top-0 h-full sm:left-28">
                <div
                    className="absolute top-0 h-full"
                    style={{ left: `${actor.progress * 100}%` }}
                >
                    <ProgressHead className="-ml-1 w-2 text-blue-600" />
                    <div className="relative top-[-1px] h-full w-[1px] bg-blue-600" />
                </div>
            </div>
        </div>
    );
}

function Resource({
    name,
    size,
    start,
    _cancel,
    _hideUntilStart,
}: {
    name: string;
    size: number;
    start: number;
    _cancel?: boolean;
    _hideUntilStart?: boolean;
}) {
    const actor = useActor();
    const progress = actor.progress * 100;
    const end = start + size;

    const complete = progress > end;
    const width = complete ? size : Math.max(progress - start, 0);

    return (
        <div className="flex items-center justify-center border-b border-gray-600 last:border-b-0">
            <div className={`w-16 text-[length:8px] sm:w-28 sm:text-sm ${width === 0 ? "opacity-0" : ""}`}>
                {name}
            </div>
            <div className="relative flex-1">
                <div
                    className={`h-1 sm:h-2 ${complete ? (_hideUntilStart ? "bg-red-600" : "bg-green-600") : "bg-blue-600"}`}
                    style={{
                        width: `${width}%`,
                        marginLeft: `${start}%`,
                    }}
                />
            </div>
        </div>
    );
}

function ProgressHead({ className }: { className: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 7 14">
            <path
                fill="currentColor"
                d="M0 0h7v9.249a2 2 0 01-.495 1.316L3.5 14 .495 10.566A2 2 0 010 9.248V0z"
            />
        </svg>
    );
}

function Ticks({ n }: { n: number }) {
    return (
        <div className="absolute left-16 right-0 top-0 flex justify-around sm:left-28">
            {Array.from({ length: n }).map((_, index) => (
                <div
                    key={index}
                    className={(index + 1) % 10 ? "h-1 w-[1px] bg-gray-300" : "h-[6px] w-[1px] bg-gray-50"}
                />
            ))}
        </div>
    );
}