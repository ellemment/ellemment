// app/ellemment-ui/components/navigation/headers/header-global-sm.tsx
import './navbar.css'
import { Link } from '@remix-run/react'
import * as React from 'react'
import { ThemeSwitch } from '#app/ellemment-ui/components/controls/theme-switch'
import { LINKS } from '#app/ellemment-ui/components/navigation/menus/navlinks-global'
import { useOptionalUser } from '#app/utils/use-root-data'

interface MobileMenuButtonProps {
  menuButtonRef: React.RefObject<HTMLButtonElement>
}

function MobileMenuButton({ menuButtonRef }: MobileMenuButtonProps) {
  return (
    <button
      ref={menuButtonRef}
      className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-14 w-14 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none"
      // popoverTarget="mobile-menu"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="9" width="20" height="2" rx="1" fill="currentColor" />
        <rect x="6" y="15" width="20" height="2" rx="1" fill="currentColor" />
        <rect x="6" y="21" width="20" height="2" rx="1" fill="currentColor" />
      </svg>
    </button>
  )
}

interface NavbarMobileProps {
  className?: string
}

export function NavbarMobile({ className }: NavbarMobileProps) {
  const menuButtonRef = React.useRef<HTMLButtonElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const user = useOptionalUser()
  const username = user?.username ?? ''

  return (
    <div className={className}>
      <MobileMenuButton menuButtonRef={menuButtonRef} />
      
      <div
        id="mobile-menu"
        ref={popoverRef}
        popover=""
        onToggle={() => window.scrollTo(0, 0)}
        className="fixed bottom-0 left-0 right-0 top-[128px] m-0 h-[calc(100svh-128px)] w-full"
      >
        <div className="bg-background flex h-full flex-col overflow-y-scroll border-t pb-12 dark:border-gray-600">
          {LINKS.map((link, index) => {
            const to = typeof link.to === 'function' ? link.to(username) : link.to
            return (
              <Link
                className="bg-background hover:bg-secondary focus:bg-secondary text-primary border-b px-4 border-gray-200 px-5vw py-9 hover:text-team-current"
                key={`${link.name}-${to}-${index}`}
                to={to}
                onClick={() => {
                  popoverRef.current?.hidePopover()
                }}
              >
                {link.name}
              </Link>
            )
          })}
          <div className="py-9 text-center">
            <ThemeSwitch variant="labelled" />
          </div>
        </div>
      </div>
    </div>
  )
}
