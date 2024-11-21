// #app/interface/composite/keynote/components/interface-comparison.tsx

import cx from "clsx";
import * as React from "react";
import { BrowserChrome } from "../browser";
import * as Fakebooks from "../fakebooks";
import { Actor, ScrollStage, useActor } from "../stage";
import { JumboText, JumboP } from "./interface-intro-v0";

export function SequenceInterfaceV4() {
    return (
        <section>
            <h2 className="sr-only">What about loading states?</h2>
            <JumboText>
                Through nested routes, Remix can eliminate nearly{" "}
                <span className="text-green-600">every loading state.</span>
            </JumboText>
            <div className="h-[25vh]" />
            <JumboP>
                Most web apps fetch inside of components, creating{" "}
                <span className="text-aqua-600">request waterfalls</span>, slower
                loads, and <span className="text-red-600">jank.</span>
            </JumboP>
            <JumboP>
                Remix loads data in parallel on the server and sends a fully formed HTML
                document.{" "}
                <span className="text-pink-600">Way faster, jank free.</span>
            </JumboP>
            <InterfaceComparison />
        </section>
    );
}

function InterfaceComparison() {
    return (
        <ScrollStage pages={4} fallbackLength={800} fallbackFrame={560}>
            <div
                className="sticky top-0 flex h-screen w-full flex-col justify-center pb-4 xl:pb-56"
                aria-hidden
            >
                <div className="xl:flex">
                    <div className="relative xl:-right-10">
                        <ComparisonHeader>Without Remix</ComparisonHeader>
                        <ComparisonBrowser>
                            <WithoutRemix />
                        </ComparisonBrowser>
                    </div>

                    <div className="relative xl:-left-10">
                        <ComparisonHeader>With Remix</ComparisonHeader>
                        <ComparisonBrowser>
                            <WithRemix />
                        </ComparisonBrowser>
                    </div>
                </div>
                <Actor start={0} end={1}>
                    <div className="absolute bottom-0 w-full pb-4 text-center text-sm text-gray-300 md:text-base">
                        (Keep scrolling to compare)
                    </div>
                </Actor>
            </div>
        </ScrollStage>
    );
}

function ComparisonHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="mb-2 text-center text-xl font-black text-white lg:mb-6 lg:text-3xl">
            {children}
        </div>
    );
}

function ComparisonBrowser({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <Actor start={0.25} end={1} persistent>
            <div
                className={
                    "-mb-14 origin-top scale-75 sm:mb-[-18rem] sm:scale-50 xl:w-[50vw] xl:scale-75" +
                    " " +
                    className
                }
            >
                {children}
            </div>
        </Actor>
    );
}

function WithoutRemix() {
    let actor = useActor();
    let progress = actor.progress * 100;

    let resources: [string, number, number][] = [
        ["document", 0, 10],
        ["root.js", 10, 25],
        ["user.json", 35, 10],
        ["sales.js", 35, 21],
        ["sales/nav.json", 56, 8],
        ["invoices.js", 56, 10],
        ["invoice.js", 66, 22],
        ["invoice/{id}.json", 88, 10],
    ];

    let jank: [number, React.ReactNode][] = [
        [10, <JankSpinner note className="p-8 sm:p-20" key={0} />],
        [
            35,
            <Fakebooks.RootView className="h-[25vh] sm:h-[38vh]" key={1}>
                <JankSpinner className="p-12 sm:p-24" />
            </Fakebooks.RootView>,
        ],
        [
            56,
            <Fakebooks.RootView className="h-[25vh] sm:h-[38vh]" key={2}>
                <Fakebooks.SalesView shimmerNav>
                    <div className="h-[6rem]">
                        <JankSpinner className="p-8" />
                    </div>
                </Fakebooks.SalesView>
            </Fakebooks.RootView>,
        ],
        [
            64,
            <Fakebooks.RootView className="h-[25vh] sm:h-[38vh]" key={3}>
                <Fakebooks.SalesView>
                    <div className="h-[6rem]">
                        <JankSpinner className="p-8" />
                    </div>
                </Fakebooks.SalesView>
            </Fakebooks.RootView>,
        ],
        [
            66,
            <Fakebooks.RootView className="h-[25vh] sm:h-[38vh]" key={4}>
                <Fakebooks.SalesView>
                    <Fakebooks.InvoicesView>
                        <JankSpinner className="p-10" />
                    </Fakebooks.InvoicesView>
                </Fakebooks.SalesView>
            </Fakebooks.RootView>,
        ],
        [
            98,
            <Fakebooks.RootView className="h-[25vh] sm:h-[38vh]" key={5}>
                <Fakebooks.SalesView>
                    <Fakebooks.InvoicesView>
                        <Fakebooks.InvoiceView />
                    </Fakebooks.InvoicesView>
                </Fakebooks.SalesView>
            </Fakebooks.RootView>,
        ],
    ];

    let aboutBlank = <div className="h-full w-full bg-white" />;
    let screen: React.ReactNode = aboutBlank;

    // just practicing my interview skills in case remix tanks.
    for (const [start, element] of jank || []) {
        if (progress >= start) {
            screen = element;
            break;
        }
    }

    return (
        <BrowserChrome
            url={progress === 0 ? "about:blank" : "example.com/sales/invoices/102000"}
        >
            <div className="h-[25vh] bg-white sm:h-[38vh]">{screen}</div>
            <div className="h-4" />
            <Network>
                {resources.map(([name, start, size]) => (
                    <Resource key={name} name={name} start={start} size={size} />
                ))}
            </Network>
        </BrowserChrome>
    );
}

function WithRemix() {
    let actor = useActor();
    let progress = actor.progress * 100;

    return (
        <BrowserChrome
            url={progress === 0 ? "about:blank" : "example.com/sales/invoices/102000"}
        >
            {progress < 30 ? (
                <div className="h-[25vh] bg-white sm:h-[38vh]" />
            ) : (
                <Fakebooks.RootView className="h-[25vh] sm:h-[38vh]">
                    <Fakebooks.SalesView>
                        <Fakebooks.InvoicesView>
                            <Fakebooks.InvoiceView />
                        </Fakebooks.InvoicesView>
                    </Fakebooks.SalesView>
                </Fakebooks.RootView>
            )}
            <div className="h-4" />
            <Network>
                <Resource name="document" start={0} size={30} />
                <Resource name="root.js" start={30} size={30} />
                <Resource name="sales.js" start={30} size={21} />
                <Resource name="invoices.js" start={30} size={8} />
                <Resource name="invoice.js" start={30} size={10} />
                <Resource name="&nbsp;" start={0} size={0} />
                <Resource name="&nbsp;" start={0} size={0} />
                <Resource name="&nbsp;" start={0} size={0} />
            </Network>
        </BrowserChrome>
    );
}

function Network({
    children,
    ticks = 50,
}: {
    children: React.ReactNode;
    ticks?: number;
}) {
    let actor = useActor();
    return (
        <div className="relative">
            <Ticks n={ticks} />
            <div className="h-4" />
            <div>{children}</div>
            <div className="absolute left-16 right-0 top-0 h-full sm:left-28">
                <div
                    className="absolute top-0 h-full"
                    style={{
                        left: `${actor.progress * 100}%`,
                    }}
                >
                    <ProgressHead className="-ml-1 w-2 text-blue-600" />
                    <div className="relative top-[-1px] h-full w-[1px] bg-blue-600" />
                </div>
            </div>
        </div>
    );
}


function Ticks({ n }: { n: number }) {
    let ticks = Array.from({ length: n }).fill(null);
    return (
        <div className="absolute left-16 right-0 top-0 flex justify-around sm:left-28">
            {ticks.map((_, index) => (
                <div
                    className={
                        (index + 1) % 10
                            ? "h-1 w-[1px] bg-gray-300"
                            : "h-[6px] w-[1px] bg-gray-50"
                    }
                    key={index}
                />
            ))}
        </div>
    );
}

function ProgressHead({ className }: { className: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 7 14"
        >
            <path
                fill="currentColor"
                d="M0 0h7v9.249a2 2 0 01-.495 1.316L3.5 14 .495 10.566A2 2 0 010 9.248V0z"
            ></path>
        </svg>
    );
}

function JankSpinner({ className, note }: { className?: string; note?: boolean }) {
    return (
        <div className={cx("h-full w-full", className)}>
            <img src="/loading.gif" className="h-full w-full object-contain object-top" alt="" />
            {note && <div className="text-center text-gray-800">(This is fake, keep scrolling)</div>}
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
    let actor = useActor();
    let progress = actor.progress * 100;
    let end = start + size;

    let complete = progress > end;
    let width = complete ? size : Math.max(progress - start, 0);

    return (
        <div className="flex items-center justify-center border-b border-gray-600 last:border-b-0">
            <div
                className={
                    "w-16 text-[length:8px] sm:w-28 sm:text-sm" +
                    " " +
                    (width === 0 ? "opacity-0" : "")
                }
            >
                {name}
            </div>
            <div className="relative flex-1">
                <div
                    className={
                        "h-1 sm:h-2" +
                        " " +
                        (complete
                            ? _hideUntilStart
                                ? "bg-red-600"
                                : "bg-green-600"
                            : "bg-blue-600")
                    }
                    style={{
                        width: `${width}%`,
                        marginLeft: `${start}%`,
                    }}
                />
            </div>
        </div>
    );
}