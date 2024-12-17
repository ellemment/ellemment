// #app/interface/portfolio/stack.tsx

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


interface StackProps {
    children: React.ReactNode;
    variant?: 'default' | 'overlay';
    subheading?: string;
    heading?: string;
}

interface OverlayCopyProps {
    subheading: string;
    heading: string;
}

export const Stack = () => {
    return (
        <div>
            <StackParallax
                variant="overlay"
                subheading="Built with"
                heading="ellemments Stack by Dony"
            >
                <div className="h-svh w-full max-w-5xl container px-2 md:px-6 flex flex-col items-end">
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="container mx-auto px-0">
                            
                        </div>
                    </div>
 
                    <div className="container flex items-center justify-center mx-auto bg-[#CDFD02] rounded-2xl min-h-[50vh] px-0 mb-2 md:mb-4">
                        <div className="flex flex-col items-center justify-center gap-8">
                            <h3 className="text-3xl md:text-5xl text-center text-black font-semibold">ellemments</h3>
                        </div>
                    </div>
                </div>
                <div >
                </div>
            </StackParallax>
        </div>
    );
};

const StackParallax = ({ children, subheading, heading, variant = 'default' }: StackProps) => {
    return (

        <div className="relative h-[200vh]">
            <StickyContent>{children}</StickyContent>
            {variant === 'overlay' && subheading && heading && (
                <StackOverlay heading={heading} subheading={subheading} />
            )}
        </div>
    );
};



const StickyContent = ({ children }: { children: React.ReactNode }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "center start"],
    });

    return (
        <motion.div
            ref={targetRef}
            className="sticky top-0 z-0 h-[100vh] overflow-hidden w-full max-w-7xl mx-auto px-4 py-4"
        >
            <motion.div
                className="absolute inset-0"
                style={{
                    clipPath: `inset(${Math.min(scrollYProgress.get() * 2 * 100, 100)}% 0 0 0)`,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};


const StackOverlay = ({ subheading, heading }: OverlayCopyProps) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -500]);

    return (
        <motion.div
            style={{
                y,
            }}
            ref={targetRef}
            className="absolute bg-background left-0 top-0 flex h-screen w-full flex-col items-start justify-center text-inherit"
        >
            <div className="max-w-5xl container px-2 md:px-6">
                <p className="mb-2 text-start text-xl md:mb-4 md:text-3xl">
                    {subheading}
                </p>
                <p className="text-start text-4xl font-bold md:text-7xl">{heading}</p>
            </div>
        </motion.div>
    );
};


