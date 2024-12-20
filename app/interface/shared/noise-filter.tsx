// #app/interface/shared/noise-filter.tsx

import React from 'react';

export const NoiseFilter = () => (
  <svg className="fixed w-0 h-0">
    <defs>
      <filter id="noise">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="3.2 1.2"
          numOctaves="5"
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
                 0 0 0 0.18 0"
          result="monoNoise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="5"
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