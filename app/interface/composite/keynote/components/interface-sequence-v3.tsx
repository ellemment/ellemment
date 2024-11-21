// #app/interface/composite/keynote/components/interface-sequence-v3.tsx

import * as React from "react";
import { type Sequence, type Slide } from "#app/utils/md/scroll/mdslides.server";
import { BrowserChrome } from "../browser";
import * as Fakebooks from "../fakebooks";
import { Actor, ScrollStage, useActor } from "../stage";


function getSlideOrDefault(slides: Slide[], index: number): Slide {
  const defaultSlide: Slide = {
    subject: '',
    type: 'slide',
    html: '',
  };
  return slides[index] ?? defaultSlide;
}

export function SequenceInterfaceV3({ slides }: { slides: Sequence }) {
  return (
    <>
      <section>
        <JumboText>
          <h2>
            Route Error Boundaries{" "}
            <span className="text-yellow-600">
              keep the happy path happy.
            </span>
          </h2>
        </JumboText>
        <div className="h-[10vh]" />
        <ScrollStage pages={3.25} fallbackLength={100} fallbackFrame={46}>
          <div className="h-[15vh]" />
          <JumboP>
            Each route module can export an error boundary next to the default
            route component.
          </JumboP>
          <div className="h-[25vh]" />
          <JumboP>
            If an error is thrown, client or server side, users see the boundary
            instead of the default component.
          </JumboP>
          <JumboP>
            Routes w/o trouble render normally, so users have more options than
            slamming refresh.
          </JumboP>
          <JumboP>
            If a route has no boundary, errors bubble up. Just put one at the
            top and chill out about errors in code review, yeah?
          </JumboP>

          <div className="sticky bottom-[-5vh]">
            <MutationCode start={0} end={0.25} slide={getSlideOrDefault(slides.slides, 0)} />
            <MutationCode start={0.25} end={0.4} slide={getSlideOrDefault(slides.slides, 1)} />
            <Actor start={0.4} end={0.5}>
              <InvoiceError explode />
            </Actor>
            <Actor start={0.5} end={0.75}>
              <InvoiceError />
            </Actor>
            <Actor start={0.75} end={2}>
              <SalesError />
            </Actor>
          </div>
        </ScrollStage>
      </section>
    </>
  );
}

function SalesError() {
  return (
    <BrowserChrome url="example.com/sales/invoices/102000">
      <Fakebooks.RootView className="h-[42vh] sm:h-[55vh]">
        <Fakebooks.SalesView>
          <div className="absolute inset-0 flex items-center justify-center bg-red-100">
            <div className="text-center text-red-700">
              <div className="text-[10px] font-bold sm:text-[14px]">Oops!</div>
              <div className="px-2 text-[8px] sm:text-[12px]">
                Something busted that we didn't anticipate.
              </div>
            </div>
          </div>
        </Fakebooks.SalesView>
      </Fakebooks.RootView>
    </BrowserChrome>
  );
}

function InvoiceError({ explode }: { explode?: boolean }) {
  const actor = useActor();
  return (
    <BrowserChrome url="example.com/sales/invoices/102000">
      <Fakebooks.RootView className="h-[42vh] sm:h-[55vh]">
        <Fakebooks.SalesView>
          <Fakebooks.InvoicesView>
            <Fakebooks.InvoiceView
              error={explode ? actor?.progress > 0.5 : true}
            >
              {explode && <Explosion />}
            </Fakebooks.InvoiceView>
          </Fakebooks.InvoicesView>
        </Fakebooks.SalesView>
      </Fakebooks.RootView>
    </BrowserChrome>
  );
}

function Explosion() {
  const actor = useActor();
  const spriteHeight = 200;
  const frameSpriteOrder = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 1, 2, 3, 4, 5, 6, 7,
  ];
  const frameProgressLength = 1 / frameSpriteOrder.length;
  const index = Math.floor(actor?.progress / frameProgressLength);
  const activeFrame = frameSpriteOrder[index] ?? 0;
  const bgOffset = activeFrame * spriteHeight;
  
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div
        className="h-[188px] w-[142px] bg-no-repeat"
        style={{
          backgroundImage: "url(/explosion.png)",
          backgroundPosition: `0px -${bgOffset}px`,
        }}
      />
    </div>
  );
}



function JumboP({ children, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className="min-h-[50vh] px-6 pb-12 text-4xl font-black text-gray-100 md:mx-auto md:max-w-3xl md:text-6xl"
    >
      {children}
    </p>
  );
}

function JumboText({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6 text-5xl font-black text-white md:px-12 md:text-[88px] md:leading-[96px]">
      {children}
    </div>
  );
}

function MutationCode({
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

export default SequenceInterfaceV3;