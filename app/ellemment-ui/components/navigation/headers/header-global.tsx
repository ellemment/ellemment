// #app/ellemment-ui/components/navigation/headers/header-local.tsx

import { Link, useNavigate } from '@remix-run/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverButton,
  PopoverBody
} from '#app/ellemment-ui/components/navigation/menus/menu-popover'
import { GlobalNavLinks , navigationItems } from '#app/ellemment-ui/components/navigation/menus/navlinks-global'
import { Icon } from '#app/ellemment-ui/foundations/icons/icon'
import { useOptionalUser } from '#app/utils/use-root-data'
import { ThemeSwitch } from '../../controls/theme-switch'
import { HeaderButton } from './header-button'


export function GlobalHeader() {
  const user = useOptionalUser()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
        <nav>
          <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-4 flex justify-between py-1">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Link to="/" aria-label="Home">
                <div className="flex items-center text-md font-medium">ellemments</div>
              </Link>
            </div>

            {/* Center - Navigation (desktop only) */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <GlobalNavLinks />
            </div>

            {/* Right side - Theme switch & User */}
            <div className="flex items-center gap-4">
              {/* Theme switch - desktop only */}
              <div className="noscript-hidden hidden md:block">
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
              <div className="md:hidden">
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
                    <PopoverBody className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
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