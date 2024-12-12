import { Link, useNavigate, useLocation } from '@remix-run/react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
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
  const location = useLocation()
  const isIndexPage = location.pathname === '/'
  
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoExpanded, setIsLogoExpanded] = useState(true)
  const [isLogoClicked, setIsLogoClicked] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if we're at the top of the page
    setIsAtTop(latest <= 0)
    
    // Update logo expansion based on scroll position
    if (latest <= 0) {
      setIsLogoExpanded(true)
    } else if (!isLogoClicked) {
      setIsLogoExpanded(false)
    }
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
            <div className="mx-auto max-w-7xl flex px-2 justify-between">
              {/* Left side - Logo */}
              <div className="flex items-center pointer-events-auto">
                <Link 
                  to="/" 
                  aria-label="Home"
                  className="relative"
                  onMouseEnter={() => !isLogoClicked && !isAtTop && setIsLogoExpanded(true)}
                  onMouseLeave={() => !isLogoClicked && !isAtTop && setIsLogoExpanded(false)}
                  onClick={() => {
                    setIsLogoClicked(true)
                    setIsLogoExpanded(true)
                    setTimeout(() => {
                      setIsLogoClicked(false)
                      if (!isAtTop) {
                        setIsLogoExpanded(false)
                      }
                    }, 800)
                  }}
                >
                  <motion.div 
                    className=" h-8"
                    animate={{
                      backgroundColor: isLogoClicked ? 'rgba(0, 0, 0, 0.05)' : 'transparent'
                    }}
                  >
                    <motion.div
                      className="flex items-center overflow-hidden pl-1 p-2"
                      initial={false}
                      animate={{
                        width: isLogoExpanded ? 'auto' : '1.5em',
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0.0, 0.2, 1],
                      }}
                    >
                      <motion.span
                        className="inline-block font-medium text-base"
                        animate={{
                          scale: isLogoExpanded ? 1 : 1.1,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                      >
                        D
                      </motion.span>
                      <motion.span
                        className="inline-block origin-left whitespace-nowrap font-medium text-base"
                        animate={{
                          opacity: isLogoExpanded ? 1 : 0,
                          x: isLogoExpanded ? 0 : -10,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1],
                          opacity: { duration: 0.15 }
                        }}
                      >
                        ony Alior
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </Link>
              </div>

              {/* Right side - Theme switch & User */}
              <div className="flex items-center gap-2 pointer-events-auto">
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
                      <PopoverBody className="max-w-7xl mx-auto pt-2 px-2">
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