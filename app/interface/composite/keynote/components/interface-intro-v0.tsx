// #app/interface/composite/keynote/components/interface-intro-v0.tsx

import { type ReactNode } from "react";
import { cn } from "#app/utils/misc";

// Typography system based on modular scale and optical adjustments
const TEXT_STYLES = {
    heading: cn(
        "text-[2.5rem] md:text-[4rem]",
        "font-bold",
        "tracking-[-0.02em] md:tracking-[-0.025em]",
        "leading-[1.1]",
        "balance-text"
    ),
    paragraph: cn(
        "text-[2rem] md:text-[3rem]",
        "font-bold",
        "tracking-[-0.005em] md:tracking-[-0.01em]",
        "leading-[1.4] md:leading-[1.3]",
        "max-w-[25ch] md:max-w-[28ch]"
    ),
} as const;

const LAYOUT = {
    container: "mx-4 md:mx-6",
    maxWidth: {
        default: "w-full",
        md: "md:max-w-5xl md:mx-auto md:pr-24 md:pl-4",
    },
} as const;

type TextStyleKey = keyof typeof TEXT_STYLES;
type MaxWidthKey = keyof typeof LAYOUT.maxWidth;

interface BaseTextProps {
    children: ReactNode;
    className?: string;
    maxWidth?: MaxWidthKey;
}

interface HeadingProps extends BaseTextProps {
    highlight?: ReactNode;
    subtitle?: ReactNode;
}

function Text({
    children,
    className = "",
    maxWidth = "md",
    textStyle = "paragraph",
}: BaseTextProps & { textStyle?: TextStyleKey }) {
    return (
        <div
            className={cn(
                TEXT_STYLES[textStyle],
                LAYOUT.container,
                LAYOUT.maxWidth[maxWidth],
                "text-gray-700 dark:text-gray-200",
                "antialiased",
                className
            )}
        >
            {children}
        </div>
    );
}

export function Heading({
    children,
    highlight,
    subtitle,
    ...props
}: HeadingProps) {
    return (
        <Text
            textStyle="heading"
            {...props}
        >
            <h2>{children}</h2>
            {highlight && (
                <>
                    <br />
                    <span className="text-gray-600 dark:text-gray-300">
                        {highlight}
                    </span>
                </>
            )}
            {subtitle && (
                <div className={cn(
                    TEXT_STYLES.paragraph,
                    "mt-6 text-gray-600 dark:text-gray-300"
                )}>
                    {subtitle}
                </div>
            )}
        </Text>
    );
}

export function Paragraph({
    children,
    className,
    ...props
}: BaseTextProps & React.ComponentPropsWithoutRef<"p">) {
    return (
        <Text
            textStyle="paragraph"
            className={cn(
                "min-h-[50vh] pb-12",
                className
            )}
            {...props}
        >
            <p>{children}</p>
        </Text>
    );
}

export function Emphasis({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <b
            className={cn(
                "font-bold text-gray-900 dark:text-gray-100",
                "tracking-tight",
                className
            )}
        >
            {children}
        </b>
    );
}