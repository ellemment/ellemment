// #app/ellemment-ui/components/navigation/headers/header-local.tsx

import { Link, useNavigate } from '@remix-run/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Icon } from '#app/components/ui/icon'
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverButton,
  PopoverBody
} from '#app/components/ui/popover'
import { HeaderButton } from '#app/ellemment-ui/components/composite/header-button'
import { GlobalNavLinks , navigationItems } from '#app/ellemment-ui/components/navigation/menus/navlinks-global'
import { useOptionalUser } from '#app/utils/use-root-data'
import { ThemeSwitch } from '../../controls/theme-switch'


export function GlobalHeader() {
  const user = useOptionalUser()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background z-50">
        <nav>
          <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-6 flex justify-between py-5">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Link to="/" aria-label="Home">
                <div className="flex items-center text-md font-medium">ellemments</div>
              </Link>
            </div>

            {/* Center - Navigation (desktop only) */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex gap-10">
                <GlobalNavLinks />
              </div>
            </div>

            {/* Right side - Theme switch & User (desktop) or Menu & User (mobile) */}
            <div className="flex items-center gap-4">
              {/* Theme switch - desktop only */}
              <div className="noscript-hidden hidden lg:block">
                <ThemeSwitch />
              </div>

              {/* User avatar button */}
              <Link to={user ? '/me' : '/login'}>
                <HeaderButton>
                  <Icon
                    name={user ? 'github-logo' : 'plus-circled'}
                    className="inline self-center w-5 h-5"
                  />
                </HeaderButton>
              </Link>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <PopoverRoot>
                <HeaderButton>
                  <PopoverTrigger className="p-2  bg-gray-300/30 hover:bg-gray-300/40 backdrop-blur-3xl hover:backdrop-blur-sm">
                    {({ isOpen }) => (
                      <div className="w-4 h-4 flex flex-col justify-center items-center relative">
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
                  </HeaderButton>

                  <PopoverContent
                    className="shadow-lg"
                    onOpenChange={setIsOpen}
                  >
                    <PopoverBody className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                      <div className="space-y-4">
                        {navigationItems.map(([label, to]) => (
                          <PopoverButton
                            key={label}
                            onClick={() => navigate(to.toString())}
                            className="px-0"
                          >
                            {label}
                          </PopoverButton>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                        <div className="flex justify-start">
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Add spacing for fixed header */}
      <div className="h-[80px]" />

      {/* Backdrop overlay when popover is open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      )}
    </>
  )
}