import cx from "clsx";
import * as React from "react";
import tweenFunctions from "tween-functions";
import { type Sequence, type Slide } from "#app/utils/md/scroll/mdslides.server.js";
import { BrowserChrome } from "./browser";
import * as Fakebooks from "./fakebooks";
import { Actor, ScrollStage, useActor, useStage } from "./stage";
import { PrimaryButtonLink } from "./utils/buttons";

const { easeOutQuad, linear } = tweenFunctions;

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
      <Intro />
      <div className="h-60" />
      <NestedRoutes />
      <div className="h-[25vh]" />
      <Waterfall />
      <div className="h-[25vh]" />
      <Prefetching />
      <div className="h-[75vh]" />
      <Mutations slides={mutations} />
      <div className="mb-[-10vh]" />
      <ErrorBoundaries slides={errors} />
      <CTA />
    </div>
  );
}


function CTA() {
  return (
    <>
      <JumboText>
        That's probably enough for now. What are you waiting for?
      </JumboText>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="h-4" />
        <PrimaryButtonLink prefetch="intent" to="/docs" children="Go Play!" />
      </div>
      <div className="h-[25vh]" />
    </>
  );
}

function ErrorBoundaries({ slides }: { slides: Sequence }) {
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
      <div className="h-[33vh]" />
      <section>
        <JumboText>
          <h2>
            Route Error Boundaries{" "}
            <span className="text-inherit">
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
            <MutationCode start={0} end={0.25} slide={slides.slides[0]} />
            <MutationCode start={0.25} end={0.4} slide={slides.slides[1]} />
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
                Something busted that we didn’t anticipate.
              </div>
            </div>
          </div>
        </Fakebooks.SalesView>
      </Fakebooks.RootView>
    </BrowserChrome>
  );
}

function InvoiceError({ explode }: { explode?: boolean }) {
  let actor = useActor();
  return (
    <BrowserChrome url="example.com/sales/invoices/102000">
      <Fakebooks.RootView className="h-[42vh] sm:h-[55vh]">
        <Fakebooks.SalesView>
          <Fakebooks.InvoicesView>
            <Fakebooks.InvoiceView
              error={explode ? actor.progress > 0.5 : true}
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
  let actor = useActor();
  let spriteHeight = 200;
  let frameSpriteOrder = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 1, 2, 3, 4, 5, 6, 7,
  ];
  let frameProgressLength = 1 / frameSpriteOrder.length;
  let index = Math.floor(actor.progress / frameProgressLength);
  let activeFrame = frameSpriteOrder[index] ?? 0; // Provide a fallback value
  let bgOffset = activeFrame * spriteHeight;
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

function BlueScreen() {
  return (
    <section className="relative z-10 h-full bg-blue-600 px-6 pb-32 text-lg text-white sm:px-36 sm:pb-40 sm:text-xl">
      <h2 className="sr-only">Error Handling</h2>
      <div aria-hidden className="text-6xl sm:text-7xl md:text-[length:120px]">
        :)
      </div>
      <div className="my-10 sm:my-16 sm:max-w-4xl md:text-[length:30px] md:leading-[40px]">
        Your websites run into problems, but with Remix they don’t need to be
        refreshed. Error handling is hard to remember and hard to do. That’s why
        it’s built in.
      </div>
      <div className="my-10 sm:my-16 sm:max-w-4xl md:text-[length:30px] md:leading-[40px]">
        Remix handles errors while Server Rendering. Errors while Client
        Rendering. Even errors in your server side data handling.
      </div>
      <img className="h-24 w-24" alt="" aria-hidden src="/qrcode.png" />
    </section>
  );
}

function Glitch() {
  let actor = useActor();
  let vals = [1, -1, 2, -2, 3, -3];
  let ruhRuh_Random = () => vals[Math.floor(Math.random() * vals.length)];
  return (
    <div className="fixed inset-0 motion-reduce:hidden">
      <img
        alt=""
        className="relative h-[110%] w-[110%]"
        style={{
          left: actor.progress === 0 ? "0" : ruhRuh_Random() + "px",
          top: actor.progress === 0 ? "0" : ruhRuh_Random() + "px",
        }}
        src="/busted.jpg"
      />
    </div>
  );
}

function Mutations({ slides }: { slides: Sequence }) {
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
            <span className="text-inherit">changing data?</span>
          </p>
        </div>
        <p className="hyphen-manual mt-2 text-lg md:pr-52 md:text-xl lg:pr-72">
          Imagine if React only had props and no way to set state. What’s the
          point? If a web framework helps you load data but doesn’t help you
          update it, what’s the point? Remix doesn’t drop you off at the{" "}
          <code>&lt;form onSubmit&gt;</code> cliff.{" "}
          <span className="text-gray-400">
            (What the heck does <code>event.preventDefault</code> do anyway?)
          </span>
        </p>
      </div>
      <div className="h-[25vh]" />
      <JumboText>
        Resilient, progressively enhanced{" "}
        <span className="text-inherit">data updates</span> are built in.
      </JumboText>
      <div className="h-[25vh]" />
      <MutationSlides sequence={slides} />
    </section>
  );
}

function MutationSlides({ sequence }: { sequence: Sequence }) {
  let slideLength = 1 / 6;
  return (
    <ScrollStage pages={5.5} fallbackLength={100} fallbackFrame={25}>
      <div className="xl:flex">
        <div className="p-max-w-lg flex-1 xl:mx-auto">
          <div className="xl:h-[12vh]" />
          <div className="max-w-full px-6">
            <MutationP>
              It’s so simple it’s kind of silly. Just make a form...
            </MutationP>
            <MutationP>
              ...and an action on a route module. It looks like traditional HTML
              forms but enables fully dynamic web experiences you're after.
            </MutationP>
            <MutationP>
              Remix runs the action server side, revalidates data client side,
              and even handles race conditions from resubmissions.
            </MutationP>
            <MutationP>
              Get fancy with transition hooks and make some pending UI. Remix
              handles all the state, you simply ask for it.
            </MutationP>
            <MutationP>
              Or get jiggy with some optimistic UI. Remix provides the data
              being sent to the server so you can skip the busy spinners for
              mutations, too.
            </MutationP>
            <MutationP>HTML forms for mutations. Who knew?</MutationP>
          </div>
        </div>

        <div className="sticky bottom-0 bg-[#252525] xl:bottom-auto xl:top-0 xl:flex xl:h-screen xl:flex-1 xl:items-center xl:self-start">
          <MutationCode
            start={slideLength * 3.2}
            end={0.66}
            slide={sequence.slides[1]}
          />
          <MutationCode
            start={slideLength * 3.2}
            end={0.66}
            slide={sequence.slides[2]}
          />
          <MutationCode
            start={0.66}
            end={2}
            slide={sequence.slides[3]}
          />
        </div>
      </div>
    </ScrollStage>
  );
}



function MutationCode({
  slide,
  start,
  end,
  persistent,
}: {
  slide: Slide | undefined;
  start: number;
  end: number;
  persistent?: boolean;
}) {
  if (!slide) return null;

  return (
    <Actor start={start} end={end} persistent={persistent}>
      <div
        className="__mutation_code text-sm sm:text-base md:text-lg xl:w-full"
        dangerouslySetInnerHTML={{ __html: slide.subject }}
      />
    </Actor>
  );
}

function MutationP({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex min-h-[75vh] max-w-2xl items-center px-6 text-4xl font-black text-gray-100 sm:mx-auto sm:px-8 md:text-6xl">
      {children}
    </p>
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

function Prefetching() {
  return (
    <section>
      <h2 className="sr-only">Pre-fetching Everything</h2>
      <JumboText>
        Nested routes allow Remix to make your app{" "}
        <span className="text-inherit">as fast as instant.</span>
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
            highlightOnHover={stage.progress > hoverStart}
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

function WaterfallHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-center text-xl font-black text-white lg:mb-6 lg:text-3xl">
      {children}
    </div>
  );
}

function WaterfallComparison() {
  return (
    <ScrollStage pages={4} fallbackLength={800} fallbackFrame={560}>
      <div
        className="sticky top-0 flex h-screen w-full flex-col justify-center pb-4 xl:pb-56"
        aria-hidden
      >
        <div className="xl:flex">
          <div className="relative xl:-right-10">
            <WaterfallHeader>Without Remix</WaterfallHeader>
            <WaterfallBrowser>
              <WithoutRemix />
            </WaterfallBrowser>
          </div>

          <div className="relative xl:-left-10">
            <WaterfallHeader>With Remix</WaterfallHeader>
            <WaterfallBrowser>
              <WithRemix />
            </WaterfallBrowser>
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

function WaterfallBrowser({
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

function JankSpinner({
  className,
  note,
}: {
  className?: string;
  note?: boolean;
}) {
  return (
    <div className={cx("h-full w-full", className)}>
      <img
        src="/loading.gif"
        className="h-full w-full object-contain object-top"
        alt=""
      />
      {note && (
        <div className="text-center text-gray-800">
          (This is fake, keep scrolling)
        </div>
      )}
    </div>
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
  let i = jank.length;
  while (i--) {
    const item = jank[i];
    if (item) {
      const [start, element] = item;
      if (progress >= start) {
        screen = element;
        break;
      }
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
          <ProgressHead className="-ml-1 w-2 text-inherit" />
          <div className="relative top-[-1px] h-full w-[1px] bg-secondary" />
        </div>
      </div>
    </div>
  );
}

function Resource({
  name,
  size,
  start,
  cancel,
}: {
  name: string;
  size: number;
  start: number;
  cancel?: boolean;
  hideUntilStart?: boolean;
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
              ? cancel
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

function Intro() {
  return (
    <section className="mx-auto max-w-5xl p-6 md:p-10">
      <h2 className="text-4xl font-black text-white sm:text-5xl md:text-6xl">
        While you were <span className="text-red-600">waiting</span> for your
        static site to build,{" "}
        <span className="text-blue-600">distributed web</span>{" "}
        infra&shy;structure got really good.{" "}
        <span className="text-pink-600">Break through the static.</span>
      </h2>
      <div className="h-6" />
      <p className="hyphen-manual mt-2 text-lg md:pr-52 md:text-xl lg:pr-72">
        Remix is a seamless server and browser runtime that provides snappy page
        loads and instant transitions by leveraging distributed systems and
        native browser features instead of clunky static builds. Built on the
        Web Fetch API (instead of Node) <Em>it can run anywhere</Em>. It already
        runs natively on Cloudflare Workers, and of course supports serverless
        and traditional Node.js environments, so you can come as you are.
      </p>
      <div className="h-6" />
      <p className="hyphen-manual mt-2 text-lg md:pr-52 md:text-xl lg:pr-72">
        Page speed is only one aspect of our true goal though. We're after{" "}
        <Em>better user experiences</Em>. As you’ve pushed the boundaries of the
        web, your tools haven’t caught up to your appetite.{" "}
        <Em>Remix is ready</Em> to serve you from the initial request to the
        fanciest UX your designers can think up. Check it out 👀
      </p>
    </section>
  );
}

// function P1({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <p
//       className={
//         "px-6 text-lg md:text-xl md:px-10 md:max-w-2xl md:mx-auto md:text-center" +
//         " " +
//         className
//       }
//     >
//       {children}
//     </p>
//   );
// }

// function P2({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <p
//       className={
//         "px-6 mb-10 text-lg md:text-xl md:text-center max-w-3xl mx-auto" +
//         " " +
//         className
//       }
//     >
//       {children}
//     </p>
//   );
// }

// function Header({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="mb-2 text-4xl font-black text-center text-white md:text-5xl  md:mb-4">
//       {children}
//     </div>
//   );
// }

function JumboText({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6 text-5xl font-black text-white md:px-12 md:text-[88px] md:leading-[96px]">
      {children}
    </div>
  );
}

function Waterfall() {
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
      <WaterfallComparison />
    </section>
  );
}


/**
 * @see https://en.wikipedia.org/wiki/Konami_Code
 */

function NestedRoutes() {
  function handleSectionFocus(event: React.FocusEvent) {
    let elem = event.target;
    if (!(elem instanceof HTMLElement)) return;

    elem.scrollIntoView(true);
  }

  return (
    <section>
      <JumboText>
        <h2>
          Remix has a cheat code:
          <br />
          <span className="text-yellow-600">Nested Routes.</span>
        </h2>
  
      </JumboText>
      <div className="h-[25vh]" />
      <ScrollStage pages={2.75}>
        <JumboP tabIndex={0} onFocus={handleSectionFocus}>
          Websites usually have levels of navigation that control child views.
        </JumboP>
        <JumboP tabIndex={0} onFocus={handleSectionFocus}>
          Not only are these components pretty much always coupled to URL
          segments...
        </JumboP>
        <JumboP tabIndex={0} onFocus={handleSectionFocus}>
          ...they’re also the semantic boundary of data loading and code
          splitting.
        </JumboP>
        <JumboP aria-hidden>
          Hover or tap the buttons to see how they’re all related
        </JumboP>
        <Actor start={0.2} end={0.66} persistent>
          <InteractiveRoutes />
        </Actor>
      </ScrollStage>
    </section>
  );
}



function Em({ children }: { children: React.ReactNode }) {
  return <b className="text-white">{children}</b>;
}

export const LayoutButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<"button"> & { active: boolean }
>(({ className, active, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={
        `m-2 rounded-full bg-opacity-70 px-6 py-2 font-mono text-[12px] font-bold leading-6 md:text-base ${active ? "opacity-100" : "opacity-80"}` +
        " " +
        className
      }
      {...props}
    />
  );
});
LayoutButton.displayName = "LayoutButton";

export function InteractiveRoutes() {
  let [activeRoute, onActiveRouteChange] = React.useState(0);
  let actor = useActor();
  let frameProgressLength = 1 / 5;

  function handleSectionFocus(event: React.FocusEvent) {
    let elem = event.target;
    if (!(elem instanceof HTMLElement)) return;

    elem.scrollIntoView(true);
  }

  React.useEffect(() => {
    let index = Math.floor(actor.progress / frameProgressLength);
    onActiveRouteChange(actor.progress === 1 ? 0 : index);
  }, [actor, frameProgressLength]);

  return (
    <>
      <div
        className={
          "pb-2 text-center text-4xl md:text-7xl" +
          " " +
          (activeRoute === 0 ? "animate-bounce" : "")
        }
        aria-hidden
      >
        👇
      </div>
      <div className="text-center" onFocus={handleSectionFocus}>
        <LayoutButton
          onClick={() => onActiveRouteChange(1)}
          onMouseEnter={() => onActiveRouteChange(1)}
          onFocus={() => onActiveRouteChange(1)}
          active={activeRoute === 1}
          className="bg-blue-900 text-blue-300"
        >
          &lt;Root&gt;
        </LayoutButton>
        <LayoutButton
          onClick={() => onActiveRouteChange(2)}
          onMouseEnter={() => onActiveRouteChange(2)}
          onFocus={() => onActiveRouteChange(2)}
          active={activeRoute === 2}
          className="bg-aqua-900 text-aqua-600"
        >
          &lt;Sales&gt;
        </LayoutButton>
        <LayoutButton
          onClick={() => onActiveRouteChange(3)}
          onMouseEnter={() => onActiveRouteChange(3)}
          onFocus={() => onActiveRouteChange(3)}
          active={activeRoute === 3}
          className="bg-yellow-900 text-yellow-600"
        >
          &lt;Invoices&gt;
        </LayoutButton>
        <LayoutButton
          onClick={() => onActiveRouteChange(4)}
          onMouseEnter={() => onActiveRouteChange(4)}
          onFocus={() => onActiveRouteChange(4)}
          active={activeRoute === 4}
          className="bg-red-900 text-red-300"
        >
          &lt;Invoice id={"{id}"}&gt;
        </LayoutButton>
      </div>
      <div className="h-4" />

      <div className="sticky bottom-0 md:bottom-[-14vh]">
        <BrowserChrome
          url={
            {
              0: "example.com/sales/invoices/102000",
              1: (
                <span>
                  <span className="text-blue-600">example.com</span>
                  /sales/invoices/102000
                </span>
              ),
              2: (
                <span>
                  example.com/
                  <span className="text-aqua-600">sales</span>/invoices/102000
                </span>
              ),
              3: (
                <span>
                  example.com/sales/
                  <span className="text-yellow-600">invoices</span>/102000
                </span>
              ),
              4: (
                <span>
                  example.com/sales/invoices/
                  <span className="text-red-600">102000</span>
                </span>
              ),
            }[activeRoute || 0] as string
          }
        >
          <Fakebooks.RootView
            overlay={
              activeRoute === 1 ? (
                <Highlighter className="bg-blue-600 ring-blue-600">
                  <Resources
                    className="bg-blue-900"
                    data="/user.json"
                    mod="/root.js"
                  />
                </Highlighter>
              ) : null
            }
          >
            <Fakebooks.SalesView
              overlay={
                activeRoute === 2 ? (
                  <Highlighter className="bg-aqua-600 ring-aqua-600">
                    <Resources
                      className="bg-aqua-900"
                      data="/sales/nav.json"
                      mod="/sales.js"
                    />
                  </Highlighter>
                ) : null
              }
            >
              <Fakebooks.InvoicesView
                overlay={
                  activeRoute === 3 ? (
                    <Highlighter className="-m-2 bg-yellow-600 ring-yellow-600">
                      <Resources
                        className="bg-yellow-900"
                        data="/invoices.json"
                        mod="/invoices.js"
                      />
                    </Highlighter>
                  ) : null
                }
              >
                <Fakebooks.InvoiceView
                  overlay={
                    activeRoute === 4 ? (
                      <Highlighter className="bg-red-600 ring-red-600">
                        <Resources
                          className="absolute bottom-2 right-2 bg-red-900 sm:static"
                          data="/invoice/{id}.json"
                          mod="/invoice.js"
                        />
                      </Highlighter>
                    ) : null
                  }
                />
              </Fakebooks.InvoicesView>
            </Fakebooks.SalesView>
          </Fakebooks.RootView>
        </BrowserChrome>
      </div>
    </>
  );
}

////////////////////////////////////////////////////////////////////////////////

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

function Highlighter({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "absolute inset-0 z-10 flex items-center justify-center rounded bg-opacity-30 ring-2 ring-inset md:rounded-lg md:ring-4" +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

function Resources({
  className,
  data,
  mod,
}: {
  className: string;
  data: string;
  mod: string;
}) {
  return (
    <div
      className={
        "rounded bg-opacity-95 p-2 font-mono text-sm text-white md:rounded-xl md:text-xl" +
        " " +
        className
      }
    >
      import("{mod}")
      <br />
      fetch("{data}")
    </div>
  );
}

