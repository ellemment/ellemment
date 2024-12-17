import { Link, useNavigate, useLocation } from '@remix-run/react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { MenuButton } from '#app/interface/components/navigation/menus/menu-button'
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
  const location = useLocation()
  const isIndexPage = location.pathname === '/'
  
  const [isOpen, setIsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if we're at the top of the page
    setIsAtTop(latest <= 0)
  })

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.header 
          className={`${isIndexPage ? 'fixed' : 'bg-background'} top-0 left-0 right-0 z-[60] pointer-events-none ${
            isOpen ? 'bg-background pointer-events-auto' : ''
          }`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
          }}
        >  
          <nav className="z-[61]">
            <div className="mx-auto max-w-5xl flex px-2 md:px-6 py-2 md:py-3 justify-between">
              {/* Left side - Logo */}
              <div className="flex items-center pointer-events-auto">
                <Link 
                  to="/" 
                  aria-label="Home"
                  className="relative"
                >
                  <motion.div className="h-8">
                    <div className="flex items-center p-2 pl-0">
                      <span className="font-normal text-base sm:text-sm">
                        Dony
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* Right side - Theme switch & User */}
              <div className="flex items-center gap-2 pointer-events-auto">
                {/* Mobile menu button */}
                <div className="inline-flex items-center">
                  <PopoverRoot>
                    <PopoverTrigger className="h-8 w-8 inline-flex items-center justify-center hover:text-primary">
                      {({ isOpen }) => <MenuButton isOpen={isOpen} variant="icon" />}
                    </PopoverTrigger>
                    <PopoverContent
                      className=""
                      onOpenChange={setIsOpen}
                    >
                      <PopoverBody className="max-w-5xl px-2 md:px-6 mx-auto pt-2">
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
        </motion.header>
      </AnimatePresence>

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
    </>
  )
}