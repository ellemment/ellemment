// #app/ellemment-ui/components/navigation/headers/navbar-local-links.tsx

import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { type To } from 'react-router-dom'

type NavItem = readonly [string, To]

export const navigationItems: NavItem[] = [
  ['Discover', '/#discover'],
  ['Develop', '/#develop'],
  ['Design', '/#design'],
  ['Connect', '/about'],
  ['Content', '/docs'],
  ['Career', '/user/settings'],
] as const

export function GlobalNavLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return navigationItems.map(([label, to], index) => (
    <Link
      key={label}
      to={to}
      className="relative mx-2 my-2 rounded-lg px-3 py-2 text-sm font-normal text-inherit transition-colors hover:text-inherit/60"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {hoveredIndex === index && (
        <motion.span
          layoutId="hover-bubble"
          className="absolute inset-0 z-10 rounded-lg bg-gray-200 dark:bg-secondary mix-blend-difference"
          transition={{ 
            type: "spring", 
            bounce: 0.2, 
            duration: 0.6 
          }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  ))
}