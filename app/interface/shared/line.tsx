// #app/interface/portfolio/message.tsx

"use client";
import { useRef, useEffect, useCallback } from "react";

interface MouseEvent {
  movementY: number;
  clientX: number;
}

export default function Line() {
  const path = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const xRef = useRef(0.5);
  let time = Math.PI / 2;
  let reqId: number | null = null;

  // Define setPath at component level using useCallback
  const setPath = useCallback((progress: number) => {
    const width = window.innerWidth * 1;
    path.current?.setAttributeNS(
      null,
      "d",
      `M0 250 Q${width * xRef.current} ${250 + progress}, ${width} 250`
    );
  }, []);

  // Initial setup
  useEffect(() => {
    setPath(progressRef.current);
  }, [setPath]);

  // Define a linear interpolation function
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  // Define a function to handle mouse enter events
  const manageMouseEnter = () => {
    // If there is an animation frame request, cancel it and reset the animation
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  // Define a function to handle mouse move events
  const manageMouseMove = (e: MouseEvent) => {
    // Get the movementY and clientX properties from the event object
    const { movementY, clientX } = e;

    // Get the bounding rectangle of the SVG path element
    const pathBound = path.current?.getBoundingClientRect();

    // If the bounding rectangle exists, update x and progress and set the path
    if (pathBound) {
      xRef.current = (clientX - pathBound.left) / pathBound.width;
      progressRef.current += movementY;
      setPath(progressRef.current);
    }
  };

  // Define a function to handle mouse leave events
  const manageMouseLeave = () => {
    // Start animating out
    animateOut();
  };

  // Define a function to animate out
  const animateOut = () => {
    // Calculate newProgress using sine of time
    const newProgress = progressRef.current * Math.sin(time);

    // Update progress using linear interpolation towards zero
    progressRef.current = lerp(progressRef.current, 0, 0.025);

    // Increment time by 0.2
    time += 0.2;

    // Set the path using newProgress
    setPath(newProgress);

    // If progress is greater than a threshold, request another animation frame,
    // otherwise reset the animation.
    if (Math.abs(progressRef.current) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  // Define a function to reset the animation variables
  const resetAnimation = () => {
    time = Math.PI / 2;
    progressRef.current = 0;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative w-full h-px mb-5">
        <div
          onMouseEnter={() => {
            manageMouseEnter();
          }}
          onMouseMove={(e) => {
            manageMouseMove(e);
          }}
          onMouseLeave={() => {
            manageMouseLeave();
          }}
          className="relative z-10 h-10 w-full top-[-40px]"
        ></div>
        <svg className="absolute w-full h-[500px] top-[-250px]">
          <path
            ref={path}
            className="stroke-current text-black stroke-[1px] fill-none"
          ></path>
        </svg>
      </div>
    </div>
  );
}