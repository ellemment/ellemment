// #app/interface/components/navigation/headers/header-local.tsx

import { Link, useNavigate } from '@remix-run/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
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


export function GlobalHeader() {
  const user = useOptionalUser()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-[60]">
        <nav className="z-[61] bg-background">
          <div className="mx-auto max-w-7xl flex justify-between py-1 px-4">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Link to="/" aria-label="Home">
                <div className="flex items-center text-md font-medium">ellemments</div>
              </Link>
            </div>


            {/* Right side - Theme switch & User */}
            <div className="flex items-center gap-2">
              {/* User account button */}
              <Link 
                to={user ? '/user' : '/login'}
                className="text-sm font-normal hover:text-primary inline-flex items-center h-8 pb-0.5"
              >
                {user ? 'Account' : 'Sign In'}
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
                    <PopoverBody className="max-w-7xl mx-auto pt-2 px-4">
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

      {/* Add spacing for fixed header */}
      <div className="h-12 md:h-14" />
    </>
  )
}