// app/ellemment-ui/components/navigation/menus/navlinks-global.tsx

import { Link, useLocation } from '@remix-run/react'
import { clsx } from 'clsx'
import * as React from 'react'

export const LINKS = [
  { name: 'Discover', to: '/#discover' },
  { name: 'Develop', to: '/account/beta' },
  { name: 'Design', to: '/engine' },
  { name: 'Career', to: '/account/settings' },
  { name: 'Connect', to: '/account' },
]

export const MOBILE_LINKS = [{ name: '', to: '/' }, ...LINKS]

interface NavLinkProps extends Omit<Parameters<typeof Link>['0'], 'to'> {
  to: string | ((username: string) => string)
  username: string
}

export function NavLink({ to, username, ...rest }: NavLinkProps) {
  const location = useLocation()
  const resolvedTo = typeof to === 'function' ? to(username) : to
  const isSelected =
    resolvedTo === location.pathname || location.pathname.startsWith(`${resolvedTo}/`)

  return (
    <li className="px-5 py-2 text-primary">
      <Link
        prefetch="intent"
        className={clsx(
          'text-primary block whitespace-nowrap text-xs font-normal focus:text-team-current focus:outline-none',
          {
            'active': isSelected,
            'text-primary': !isSelected,
          },
        )}
        to={resolvedTo}
        {...rest}
      />
    </li>
  )
}

interface NavLinksProps {
  isMobile?: boolean
  className?: string
  username: string  
}

export function NavLinks({ className, username }: NavLinksProps) {
  return (
    <ul className={className}>
      {LINKS.map((link, index) => (
        <NavLink 
          key={`${link.name}-${index}`}
          to={link.to}
          username={username}
        >
          {link.name}
        </NavLink>
      ))}
    </ul>
  )
}
