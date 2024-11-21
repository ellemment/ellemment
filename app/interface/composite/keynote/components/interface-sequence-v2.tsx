// #app/interface/composite/keynote/components/interface-sequence-v2.tsx

import * as React from 'react';
import tweenFunctions from "tween-functions";
import { BrowserChrome } from "../browser";
import * as Fakebooks from "../fakebooks";
import { Actor, ScrollStage, useActor, useStage } from "../stage";
import { JumboText, JumboP } from "./interface-intro-v0";

const { easeOutQuad, linear } = tweenFunctions;

export function SequenceInterfaceV2() {
    return (
        <section>
            <h2 className="sr-only">Pre-fetching Everything</h2>
            <JumboText>
                Nested routes allow Remix to make your app{" "}
                <span className="text-red-600">as fast as instant.</span>
            </JumboText>
            <div className="h-[10vh]" />

            <ScrollStage pages={2} fallbackLength={100} fallbackFrame={75}>
                <div className="h-[15vh]" />
                <JumboP>
                    Remix can prefetch everything in parallel before the user clicks a
                    link.
                </JumboP>
                <JumboP>Public Data. User Data. Modules. Heck, even CSS.</JumboP>
                <JumboP>Zero loading states. Zero skeleton UI. Zero jank.</JumboP>
                <JumboP>
                    <span className="text-gray-400">
                        Alright, you caught us, they’re just prefetch link tags,
                        #useThePlatform
                    </span>
                </JumboP>
                <div className="sticky bottom-[-5vh]">
                    <PrefetchBrowser />
                </div>
            </ScrollStage>
        </section>
    );
}

let moveStart = 0.65;
let hoverStart = 0.68;
let clickAt = 0.9;

function PrefetchBrowser() {
    let stage = useStage();
    return (
        <BrowserChrome url="example.com/dashboard">
            <Fakebooks.RootView className="h-[35vh] md:h-[45vh]">
                <Actor start={0} end={moveStart}>
                    <Fakebooks.DashboardView />
                </Actor>
                <Actor start={moveStart} end={clickAt}>
                    <Fakebooks.DashboardView
                        highlightOnHover={stage?.progress > hoverStart}
                    />
                </Actor>
                <Actor start={clickAt}>
                    <Fakebooks.SalesView>
                        <Fakebooks.InvoicesView>
                            <Fakebooks.InvoiceView />
                        </Fakebooks.InvoicesView>
                    </Fakebooks.SalesView>
                </Actor>
            </Fakebooks.RootView>

            <Actor start={moveStart} end={clickAt - 0.2} persistent>
                <Cursor />
            </Actor>

            <Actor start={hoverStart} end={clickAt - 0.05}>
                <PrefetchNetwork />
            </Actor>
        </BrowserChrome>
    );
}

function PrefetchNetwork() {
    return (
        <div className="absolute left-[34%] top-[35%] w-[50%] rounded bg-gray-800 p-2 drop-shadow-md">
            <Network ticks={25}>
                <Resource name="sales.js" start={0} size={44} />
                <Resource name="sales/nav.json" start={0} size={42} />
                <Resource name="invoices.js" start={0} size={40} />
                <Resource name="invoice.js" start={0} size={84} />
                <Resource name="invoice/{id}.json" start={0} size={48} />
                <Resource name="invoice.css" start={0} size={10} />
            </Network>
        </div>
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


function Resource({
    name,
    size,
    start,
}: {
    name: string;
    size: number;
    start: number;
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
                    className={`h-1 sm:h-2 ${complete ? "bg-green-600" : "bg-blue-600"}`}
                    style={{
                        width: `${width}%`,
                        marginLeft: `${start}%`,
                    }}
                />
            </div>
        </div>
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
            />
        </svg>
    );
}

function Cursor() {
    let stage = useStage();
    let actor = useActor();
    let left = easeOutQuad(actor.progress, 5, 28, 1);
    let top = easeOutQuad(actor.progress, 10, 40, 1);
    let cursor = stage.progress < hoverStart ? <DefaultCursor /> : <Pointer />;
    let clickOffset = 0.02;
    let click =
      stage.progress >= clickAt - clickOffset &&
      stage.progress < clickAt + clickOffset;
    let clickScale = linear(
      stage.progress - clickAt + clickOffset,
      0,
      2,
      clickOffset * 2,
    );
  
    return (
      <div>
        <div
          className="absolute"
          style={{
            top: top + "%",
            left: left + "%",
          }}
        >
          {cursor}
          {click && (
            <div
              style={{
                transform: `scale(${clickScale})`,
              }}
              className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-red-600 opacity-50"
            />
          )}
        </div>
      </div>
    );
  }
  
  function Pointer() {
    return (
      <svg
        className="relative -left-2 w-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 28 32"
      >
        <path
          fill="#fff"
          stroke="#000"
          strokeWidth="2"
          d="M5.854 25.784l-4.69-9.602a1.634 1.634 0 01.729-2.167h0c.538-.277 1.002-.218 1.512.103.567.355 1.133 1.014 1.653 1.83.509.8.92 1.667 1.207 2.344a18.84 18.84 0 01.426 1.104l.004.013v.002h.003l1.948-.313V2.552c0-.868.692-1.552 1.522-1.552.83 0 1.522.684 1.522 1.552v0l.006 8.252v0h2s0 0 0 0c0-.872.774-1.637 1.6-1.637.872 0 1.606.726 1.606 1.552v2.552h2c0-.868.692-1.552 1.522-1.552.83 0 1.522.684 1.522 1.552v2.807h2c0-.868.693-1.552 1.522-1.552.83 0 1.522.684 1.522 1.552V17.471h.006L27 23.492s0 0 0 0C27 27.66 23.715 31 19.644 31h-6.726c-2.13 0-3.875-1.217-5.148-2.57a13.227 13.227 0 01-1.806-2.444 7.264 7.264 0 01-.108-.198l-.002-.004z"
        ></path>
      </svg>
    );
  }
  
  function DefaultCursor() {
    return (
      <svg
        className="w-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 23 32"
      >
        <path
          fill="#fff"
          stroke="#000"
          strokeWidth="2"
          d="M8.214 22.016L1 30.43V1.47l20.197 20.196H8.512l-.299.349z"
        ></path>
      </svg>
    );
  }

