import { Link, useNavigate, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverButton,
  PopoverBody
} from '#app/interface/components/navigation/menus/menu-popover'
import { navigationItems } from '#app/interface/components/navigation/menus/navlinks-global'
import { useOptionalUser } from '#app/utils/use-root-data'
import { ThemeSwitch } from '../../controls/theme-switch'

const avatarImage = '/images/logo.png'

function clamp(number: number, a: number, b: number) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      {...props}
    />
  )
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'to'> & {
  large?: boolean
}) {
  return (
    <Link
      to="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <img
        src={avatarImage}
        alt=""
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
      />
    </Link>
  )
}

export function GlobalHeader() {
  const user = useOptionalUser()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const headerRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0
    let upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      let { top, height } = headerRef.current.getBoundingClientRect()
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      let fromScale = 1
      let toScale = 36 / 64
      let fromX = 0
      let toX = 2 / 16

      let scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      )

      let borderScale = 1 / (toScale / scale)
      let borderX = (-toX + x) * borderScale
      let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header 
        ref={headerRef}
        className={clsx(
          "pointer-events-none relative z-[65] flex flex-col",
          "left-0 right-0 bg-background/80 backdrop-blur-sm",
          isHomePage ? "relative" : "fixed top-0",
          "h-[var(--header-height)] mb-[var(--header-mb)]"
        )}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <div
              className="top-0 order-last -mb-3 pt-3 w-full px-4 md:px-6"
              style={{
                position: 'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="relative md:max-w-7xl md:mx-auto"
              >
                <div
                  className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                  style={{
                    position: 'var(--header-inner-position)' as React.CSSProperties['position'],
                  }}
                >
                  <div className="relative">
                    <AvatarContainer
                      className="absolute left-0 top-3 origin-left transition-opacity"
                      style={{
                        opacity: 'var(--avatar-border-opacity, 0)',
                        transform: 'var(--avatar-border-transform)',
                      }}
                    />
                    <Avatar
                      large
                      className="block h-16 w-16 origin-left"
                      style={{ transform: 'var(--avatar-image-transform)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <nav className="z-[61] bg-background w-full">
          <div className="md:max-w-7xl mx-auto flex justify-between py-2 px-4 md:px-6">
            {/* Left side - Avatar/Logo */}
            <div className="flex items-center pointer-events-auto">
              {!isHomePage && (
                <AvatarContainer>
                  <Avatar />
                </AvatarContainer>
              )}
            </div>

            {/* Right side - Theme switch & User */}
            <div className="flex items-center gap-2">
              {/* User account button */}
              <Link 
                to={user ? '/user' : '/login'}
                className="text-sm font-normal hover:text-primary inline-flex items-center h-8 pb-0.5"
              >
                {user ? 'Account' : 'Get Started'}
              </Link>

              {/* Mobile menu button */}
              <div className="inline-flex items-center">
                <PopoverRoot>
                  <PopoverTrigger className="h-8 w-8 inline-flex items-center justify-center hover:text-primary">
                    {({ isOpen }) => (
                      <div className="w-4 h-4 flex flex-col justify-center items-center">
                        <motion.span
                          className="absolute w-4 h-[2px] bg-current"
                          animate={{
                            rotate: isOpen ? 45 : 0,
                            y: isOpen ? 0 : -3
                          }}
                          transition={{ duration: 0.2 }}
                        />
                        <motion.span
                          className="absolute w-4 h-[2px] bg-current"
                          animate={{
                            rotate: isOpen ? -45 : 0,
                            y: isOpen ? 0 : 3
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    )}
                  </PopoverTrigger>
                  <PopoverContent
                    className=""
                    onOpenChange={setIsOpen}
                  >
                    <PopoverBody className="max-w-7xl mx-auto pt-2 px-4 md:px-6">
                      <div className="space-y-4">
                        {navigationItems.map(([label, to]) => (
                          <PopoverButton
                            key={label}
                            onClick={() => navigate(to.toString())}
                            className="px-0 max-md:text-md max-md:font-medium"
                          >
                            {label}
                          </PopoverButton>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                        <div className="flex justify-start pb-4">
                          <ThemeSwitch variant="labelled" />
                        </div>
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </PopoverRoot>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {!isHomePage && <div className="bg-background h-12 md:h-14" />}
    </>
  )
}