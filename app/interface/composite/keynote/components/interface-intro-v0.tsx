// #app/interface/composite/keynote/components/interface-text.tsx

import { type ReactNode } from "react";

export function JumboText({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6 text-5xl font-black text-white md:px-12 md:text-[88px] md:leading-[96px]">
      {children}
    </div>
  );
}

export function JumboH({ 
  children, 
  highlight,
  subtitle
}: { 
  children: ReactNode;
  highlight?: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <JumboText>
      <h2>
        {children}
        {highlight && (
          <>
            <br />
            <span className="text-yellow-600">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle}
    </JumboText>
  );
}

export function JumboP({ children, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className="min-h-[50vh] px-6 pb-12 text-4xl font-black text-gray-100 md:mx-auto md:max-w-3xl md:text-6xl"
    >
      {children}
    </p>
  );
}

export function P1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={`px-6 text-lg md:text-xl md:px-10 md:max-w-2xl md:mx-auto md:text-center ${className}`}>
      {children}
    </p>
  );
}

export function P2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={`px-6 mb-10 text-lg md:text-xl md:text-center max-w-3xl mx-auto ${className}`}>
      {children}
    </p>
  );
}

export function Header({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 text-4xl font-black text-center text-white md:text-5xl md:mb-4">
      {children}
    </div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <b className="text-white">{children}</b>;
}