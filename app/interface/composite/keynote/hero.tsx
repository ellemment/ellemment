// #app/interface/composite/keynote/hero.tsx

import { cn } from "#app/utils/misc";

export function Hero() {
    return (
        <div className={cn(
            "px-4 md:px-6",
            "pt-32 md:pt-40"
        )}>
            <div className={cn(
                "md:max-w-7xl md:mx-auto",
                "flex flex-col gap-2"
            )}>
                <h1 className={cn(
                    "text-[5rem] md:text-[8rem]",
                    "font-bold leading-none",
                    "tracking-tight",
                    "text-zinc-400"
                )}>
                    Dony Alior
                </h1>
                <h2 className={cn(
                    "text-[5rem] md:text-[8rem]",
                    "font-bold leading-none",
                    "tracking-tight"
                )}>
                    Product Engineer.
                </h2>
            </div>
        </div>
    );
}

