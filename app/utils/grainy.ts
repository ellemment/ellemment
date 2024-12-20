import React from 'react';
import { type LocationData } from './company';

export const getBackgroundStyle = (background: LocationData['background']) => {
  const { type, colors } = background;
  let backgroundStyle: React.CSSProperties = {
    position: 'relative',
  };

  // Set base background
  switch (type) {
    case 'solid':
      backgroundStyle.backgroundColor = colors as string;
      break;
    case 'gradient': {
      const gradientColors = colors as [string, string];
      if (!Array.isArray(gradientColors)) break;
      
      backgroundStyle.background = `
        linear-gradient(
          45deg, 
          ${gradientColors[0]},
          ${adjustColorOpacity(gradientColors[0], 0.95)} 15%,
          ${adjustColorOpacity(gradientColors[0], 0.85)} 25%,
          ${adjustColorOpacity(gradientColors[1], 0.85)} 75%,
          ${adjustColorOpacity(gradientColors[1], 0.95)} 85%,
          ${gradientColors[1]}
        )
      `;
      break;
    }
    case 'radial': {
      const radialColors = colors as [string, string];
      if (!Array.isArray(radialColors)) break;
      
      backgroundStyle.background = `
        radial-gradient(
          circle at 49% 50%, 
          ${radialColors[0]},
          ${adjustColorOpacity(radialColors[0], 0.95)} 25%,
          ${adjustColorOpacity(radialColors[0], 0.85)} 35%,
          ${adjustColorOpacity(radialColors[1], 0.85)} 65%,
          ${adjustColorOpacity(radialColors[1], 0.95)} 75%,
          ${radialColors[1]}
        )
      `;
      break;
    }
  }

  return backgroundStyle;
};

// Helper function to adjust color opacity
function adjustColorOpacity(color: string, opacity: number): string {
  if (color.startsWith('#')) {
    return `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  }
  if (color.startsWith('rgb')) {
    const rgba = color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    return rgba;
  }
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  return color;
}

interface NoiseOverlayProps {
  opacity?: number;
}

export const NoiseOverlay = React.forwardRef<HTMLDivElement, NoiseOverlayProps>(
  ({ opacity = 0.05 }, ref) => {
    const overlayStyle: React.CSSProperties = {
      filter: 'url(#noise)',
      opacity,
      mixBlendMode: 'overlay' as const,
      backgroundColor: '#000000',
    };

    return React.createElement('div', {
      ref,
      className: "absolute inset-0",
      style: overlayStyle
    });
  }
);

NoiseOverlay.displayName = 'NoiseOverlay';