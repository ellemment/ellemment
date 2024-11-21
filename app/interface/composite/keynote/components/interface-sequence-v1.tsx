// #app/interface/composite/keynote/components/interface-sequence.tsx
import * as React from "react";
import { BrowserChrome } from "../browser";
import * as Fakebooks from "../fakebooks";
import { Actor, ScrollStage, useActor } from "../stage";
import { JumboH, JumboP } from "./interface-intro-v0";

// Main Components
export function SequentialIntroV1({
    title,
    highlight,
    subtitle,
    steps,
    demonstration,
    pages = 2.75
}: SequenceProps) {
    return (
        <section>
            <JumboH highlight={highlight} subtitle={subtitle}>
                {title}
            </JumboH>
            <div className="h-[25vh]" />
            <ScrollStage pages={pages}>
                {steps.map((step, index) => (
                    <JumboP
                        key={index}
                        tabIndex={step.focusable ? 0 : undefined}
                        onFocus={step.focusable ? handleSectionFocus : undefined}
                        aria-hidden={step.hidden}
                    >
                        {step.content}
                    </JumboP>
                ))}
                {demonstration && (
                    <Actor start={0.2} end={0.66} persistent>
                        {demonstration}
                    </Actor>
                )}
            </ScrollStage>
        </section>
    );
}

export function InteractiveTabs() {
    const [activeRoute, onActiveRouteChange] = React.useState(0);
    const frameProgressLength = 1 / 5;
    const actor = useActor();

    React.useEffect(() => {
        const index = Math.floor(actor.progress / frameProgressLength);
        onActiveRouteChange(actor.progress === 1 ? 0 : index);
    }, [actor, frameProgressLength]);

    const getUrlForDisplay = () => ({
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
    }[activeRoute || 0] as string);



    return (
        <>
            <div className={`pb-2 text-center text-4xl md:text-7xl ${activeRoute === 0 ? "animate-bounce" : ""}`}
                aria-hidden>
                👇
            </div>

            <div className="text-center" onFocus={handleSectionFocus}>
                {[
                    { label: "Root", class: "bg-blue-900 text-blue-300" },
                    { label: "Sales", class: "bg-aqua-900 text-aqua-600" },
                    { label: "Invoices", class: "bg-yellow-900 text-yellow-600" },
                    { label: "Invoice", class: "bg-red-900 text-red-300" }
                ].map((button, index) => (
                    <LayoutButton
                        key={button.label}
                        onClick={() => onActiveRouteChange(index + 1)}
                        onMouseEnter={() => onActiveRouteChange(index + 1)}
                        onFocus={() => onActiveRouteChange(index + 1)}
                        active={activeRoute === index + 1}
                        className={button.class}
                    >
                        {index === 3
                            ? `<${button.label} id={"{id}"}>`
                            : `<${button.label}>`}
                    </LayoutButton>
                ))}
            </div>
            <div className="h-4" />

            <div className="sticky bottom-0 md:bottom-[-14vh]">
                <BrowserChrome url={getUrlForDisplay()}>
                    <Fakebooks.RootView
                        overlay={activeRoute === 1 ? getOverlayForRoute(1) : null}
                    >
                        <Fakebooks.SalesView
                            overlay={activeRoute === 2 ? getOverlayForRoute(2) : null}
                        >
                            <Fakebooks.InvoicesView
                                overlay={activeRoute === 3 ? getOverlayForRoute(3) : null}
                            >
                                <Fakebooks.InvoiceView
                                    overlay={activeRoute === 4 ? getOverlayForRoute(4) : null}
                                />
                            </Fakebooks.InvoicesView>
                        </Fakebooks.SalesView>
                    </Fakebooks.RootView>
                </BrowserChrome>
            </div>
        </>
    );
}

export function SequenceInterfaceV1() {
    return (
      <SequentialIntroV1
        title="Remix has a cheat code:"
        highlight="Nested Routes."
        steps={[
          {
            content: "Websites usually have levels of navigation that control child views.",
            focusable: true
          },
          {
            content: "Not only are these components pretty much always coupled to URL segments...",
            focusable: true
          },
          {
            content: "...they're also the semantic boundary of data loading and code splitting.",
            focusable: true
          },
          {
            content: "Hover or tap the buttons to see how they're all related",
            hidden: true
          }
        ]}
        demonstration={<InteractiveTabs />}
      />
    );
  }




// Types
interface SequenceStep {
    content: React.ReactNode;
    focusable?: boolean;
    hidden?: boolean;
}

interface SequenceProps {
    title: string;
    highlight?: React.ReactNode;
    subtitle?: React.ReactNode;
    steps: SequenceStep[];
    demonstration?: React.ReactNode;
    pages?: number;
}

// Utility functions
function handleSectionFocus(event: React.FocusEvent) {
    const elem = event.target;
    if (!(elem instanceof HTMLElement)) return;
    elem.scrollIntoView(true);
}


// Presentational Components
const LayoutButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithRef<"button"> & { active: boolean }
>(({ className, active, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={`m-2 rounded-full bg-opacity-70 px-6 py-2 font-mono text-[12px] font-bold leading-6 md:text-base 
                ${active ? "opacity-100" : "opacity-80"} ${className}`}
            {...props}
        />
    );
});
LayoutButton.displayName = "LayoutButton";

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
        <div className={`rounded bg-opacity-95 p-2 font-mono text-sm text-white md:rounded-xl md:text-xl ${className}`}>
            import("{mod}")
            <br />
            fetch("{data}")
        </div>
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
        <div className={`absolute inset-0 z-10 flex items-center justify-center rounded bg-opacity-30 ring-2 ring-inset md:rounded-lg md:ring-4 ${className}`}>
            {children}
        </div>
    );
}


function getOverlayForRoute(activeRoute: number) {
    switch (activeRoute) {
        case 1:
            return (
                <Highlighter className="bg-blue-600 ring-blue-600">
                    <Resources className="bg-blue-900" data="/user.json" mod="/root.js" />
                </Highlighter>
            );
        case 2:
            return (
                <Highlighter className="bg-aqua-600 ring-aqua-600">
                    <Resources className="bg-aqua-900" data="/sales/nav.json" mod="/sales.js" />
                </Highlighter>
            );
        case 3:
            return (
                <Highlighter className="-m-2 bg-yellow-600 ring-yellow-600">
                    <Resources className="bg-yellow-900" data="/invoices.json" mod="/invoices.js" />
                </Highlighter>
            );
        case 4:
            return (
                <Highlighter className="bg-red-600 ring-red-600">
                    <Resources className="absolute bottom-2 right-2 bg-red-900 sm:static" data="/invoice/{id}.json" mod="/invoice.js" />
                </Highlighter>
            );
        default:
            return null;
    }
}
