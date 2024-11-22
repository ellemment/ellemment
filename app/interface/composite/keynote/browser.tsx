import * as React from "react";

export function BrowserChrome({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-2 max-h-[75vh] select-none overflow-hidden rounded-sm bg-zinc-200 dark:bg-zinc-900 shadow-md md:mx-4 md:rounded-md lg:mx-auto lg:max-w-5xl">
      <URLBar url={url} />
      <div className="px-0 pb-0 pt-1 md:px-0 md:pb-0 md:pt-2">{children}</div>
    </div>
  );
}

function URLBar({ url }: { url: string }) {
  return (
    <div className="flex items-center justify-center px-1 pb-0 pt-1 md:px-2 md:pt-2">
      <div className="absolute left-1 flex gap-1 p-2 md:left-2 md:gap-2">
        <Circle className="bg-[#FF4530] dark:bg-[#FF453A]" />
        <Circle className="bg-[#FF9F0A] dark:bg-[#FF9F0A]" />
        <Circle className="bg-[#34C759] dark:bg-[#30D158]" />
      </div>
      <div className="relative flex w-2/3 items-center rounded-sm bg-zinc-400 dark:bg-zinc-950 px-2 py-1 text-inherit md:px-2">
        <span className="text-[length:10px] md:text-xs normal text-zinc-300 dark:text-zinc-600">{url}</span>
        <Refresh className="absolute right-1 h-4 w-4 md:h-5 md:w-5" />
      </div>
    </div>
  );
}

function Circle({ className }: { className?: string }) {
  return (
    <div
      className={`h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-700 md:h-3 md:w-3 ${className || ''}`}
    />
  );
}

function Refresh({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 7 7"
    >
      <path
        fill="#fff"
        fillOpacity="0.8"
        d="M5.088 4.004l-.125.126.125.125.126-.125-.126-.126zm-1.073-.822l.948.948.251-.252-.948-.948-.251.252zm1.2.948l.947-.948-.251-.252-.948.948.251.252z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeOpacity="0.8"
        strokeWidth="0.355"
        d="M4.26 4.966a1.659 1.659 0 11.829-1.436"
      ></path>
    </svg>
  );
}



