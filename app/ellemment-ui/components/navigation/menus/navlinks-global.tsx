// #app/ellemment-ui/components/navigation/headers/navbar-local-links.tsx

import { Link } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import  { type To } from 'react-router-dom'

type NavItem = readonly [string, To]

export const navigationItems: NavItem[] = [
  ['Discover', '/#discover'],
  ['Develop', '/#develop'],
  ['Design', '/#design'],
  ['Connect', '/#connect'],
  ['Content', '/me'],
  ['Career', '/account/settings'],
] as const

export function GlobalNavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  let timeoutRef = useRef<number | null>(null)

  return navigationItems.map(([label, to], index) => (
    <Link
      key={label}
      to={to}
      className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm font-normal text-inherit transition-colors delay-150 hover:text-inherit/50 hover:delay-0"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current)
        }
        setHoveredIndex(index)
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => {
          setHoveredIndex(null)
        }, 200)
      }}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-secondary"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15 },
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{label}</span>
    </Link>
  ))
}