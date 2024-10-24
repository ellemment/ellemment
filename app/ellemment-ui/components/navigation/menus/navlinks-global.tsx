// app/ellemment-ui/components/navigation/menus/navlinks-global.tsx

import { Link, useLocation } from '@remix-run/react'
import { clsx } from 'clsx'
import * as React from 'react'

export const LINKS = [
  { name: 'Keynote', to: '/#keynote' },
  { name: 'Application', to: '/account/beta' },
  { name: 'Documentation', to: '/docs' },
  { name: 'Changelog', to: '/engine' },
  { name: 'Information', to: '/#info' },
]

export const MOBILE_LINKS = [{ name: 'Home', to: '/' }, ...LINKS]

interface NavLinkProps extends Omit<Parameters<typeof Link>['0'], 'to'> {
  to: string
}

export function NavLink({ to, ...rest }: NavLinkProps) {
  const location = useLocation()
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`)

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
        to={to}
        {...rest}
      />
    </li>
  )
}

interface NavLinksProps {
  isMobile?: boolean
  className?: string
}

export function NavLinks({ isMobile = false, className }: NavLinksProps) {
  const links = isMobile ? MOBILE_LINKS : LINKS

  return (
    <ul className={className}>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </ul>
  )
}