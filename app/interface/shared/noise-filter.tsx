// #app/interface/shared/noise-filter.tsx

import React from 'react';

export const NoiseFilter = () => (
  <svg className="fixed w-0 h-0">
    <defs>
      <filter id="noise">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.8"
          numOctaves="4"
          seed="1"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="1 0 0 0 0
                 1 0 0 0 0
                 1 0 0 0 0
                 0 0 0 0.25 0"
          result="monoNoise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="8"
          result="displaced"
        />
        <feBlend
          in="displaced"
          in2="monoNoise"
          mode="overlay"
        />
      </filter>
    </defs>
  </svg>
);