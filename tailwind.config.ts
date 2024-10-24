// tailwind.config.ts

import { type Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'
import radixPlugin from 'tailwindcss-radix'
import { ellemmentPreset } from './app/ellemment-ui/foundations/styles/ellemment-theme.ts'
import { marketingPreset } from './app/routes/_marketing+/tailwind-preset'
import { extendedTheme } from './app/utils/extended-theme.ts'

export default {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      ...extendedTheme,
      colors: {
        ...(extendedTheme.colors || {}),
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  presets: [marketingPreset, ellemmentPreset],
  plugins: [animatePlugin, radixPlugin],
} satisfies Config