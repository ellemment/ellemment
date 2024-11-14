// #app/ellemment-ui/components/navigation/headers/header-local.tsx

import { Link, useNavigate } from '@remix-run/react'
import { motion , AnimatePresence } from 'framer-motion'
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
import { GlobalNavLinks } from '#app/ellemment-ui/components/navigation/menus/navlinks-global'
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
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between py-8">
                        <div className="relative z-10 flex justify-between items-center gap-16">
                            <Link to="/" aria-label="Home">
                                <div className="h-10 text-sm font-medium">ellemments</div>
                            </Link>
                            <div className="hidden lg:flex lg:gap-10">
                                <GlobalNavLinks />
                            </div>
                            <div className="noscript-hidden hidden lg:flex items-center justify-center h-full">
                                <ThemeSwitch />
                            </div>
                            <Link to={user ? '/me' : '/login'} className="ml-2">
                                <HeaderButton>
                                    <Icon
                                        name={user ? 'github-logo' : 'plus-circled'}
                                        className="inline self-center w-4 h-4"
                                    />
                                </HeaderButton>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                        <div className="lg:hidden">
                            <PopoverRoot>
                                <PopoverTrigger className="p-2 hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-800">
                                    {({ isOpen }) => (
                                        <div className="w-6 h-6 flex flex-col justify-center items-center relative">
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
                                    className="shadow-lg"
                                    onOpenChange={setIsOpen}
                                >
                                        <PopoverBody className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                                            <div className="space-y-4">
                                                <PopoverButton onClick={() => navigate('/#discover')}>
                                                    Discover
                                                </PopoverButton>
                                                <PopoverButton onClick={() => navigate('/#develop')}>
                                                    Develop
                                                </PopoverButton>
                                                <PopoverButton onClick={() => navigate('/#design')}>
                                                    Design
                                                </PopoverButton>
                                                <PopoverButton onClick={() => navigate('/#connect')}>
                                                    Connect
                                                </PopoverButton>
                                                <PopoverButton onClick={() => navigate('/me')}>
                                                    Content
                                                </PopoverButton>
                                                <PopoverButton onClick={() => navigate('/account/settings')}>
                                                    Career
                                                </PopoverButton>
                                            </div>
                                            
                                            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                                                <div className="flex justify-center">
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
            <div className="h-[88px]" />

            {/* Backdrop overlay when popover is open */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
            )}
        </>
    )
}