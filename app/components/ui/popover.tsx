// #app/components/ui/popover.tsx

"use client"

import { AnimatePresence, motion } from "framer-motion"
import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import { cn } from "#app/utils/misc"

interface PopoverContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  closePopover: (type?: 'up' | 'fade') => void
  uniqueId: string
  closeType: 'up' | 'fade'
  setCloseType: (type: 'up' | 'fade') => void
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined)

function usePopover() {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider")
  }
  return context
}

interface PopoverRootProps {
  children: React.ReactNode
  className?: string
}

export function PopoverRoot({ children, className }: PopoverRootProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [closeType, setCloseType] = useState<'up' | 'fade'>('up')
  
  const closePopover = (type: 'up' | 'fade' = 'up') => {
    setCloseType(type)
    setIsOpen(false)
  }

  const popoverLogic = {
    isOpen,
    setIsOpen,
    closePopover,
    uniqueId: useId(),
    closeType,
    setCloseType
  }

  return (
    <PopoverContext.Provider value={popoverLogic}>
      <div className={cn("", className)}>
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

interface PopoverTriggerProps {
  children: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode)
  className?: string
}

export function PopoverTrigger({ children, className }: PopoverTriggerProps) {
  const { isOpen, setIsOpen } = usePopover()
  const triggerRef = useRef<HTMLDivElement>(null)

  const togglePopover = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <div 
      ref={triggerRef}
      role="button"
      tabIndex={0}
      onClick={togglePopover}
      className={cn("cursor-pointer", className)}
      data-popover-trigger
    >
      {typeof children === 'function' 
        ? (children as (props: { isOpen: boolean }) => React.ReactNode)({ isOpen }) 
        : children}
    </div>
  )
}

interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  onOpenChange?: (isOpen: boolean) => void
}

export function PopoverContent({ children, className, onOpenChange }: PopoverContentProps) {
  const { isOpen, closePopover, closeType } = usePopover()
  const contentRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Sync background height with content height
  useEffect(() => {
    if (isOpen && contentRef.current && backgroundRef.current) {
      const updateHeight = () => {
        const contentHeight = contentRef.current?.offsetHeight || 0
        backgroundRef.current!.style.height = `${contentHeight}px`
      }
      
      updateHeight()
      // Update height after a small delay to ensure all content is rendered
      setTimeout(updateHeight, 50)
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      const isTrigger = target.closest('[data-popover-trigger]')
      
      if (
        contentRef.current && 
        !contentRef.current.contains(target) && 
        !isTrigger
      ) {
        closePopover('fade')
        onOpenChange?.(false)
      }
    }

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 0)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, closePopover, onOpenChange])

  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <>
          {/* Background layer */}
          <motion.div
            ref={backgroundRef}
            className="fixed inset-x-0 top-[70px] bg-background shadow-lg z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              closeType === 'up'
                ? { opacity: 0, y: -20 }
                : { opacity: 0 }
            }
            transition={{ 
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
          
          {/* Content layer */}
          <motion.div
            ref={contentRef}
            className={cn(
              "fixed inset-x-0 top-[80px] z-[51]", // Higher z-index than background
              className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              closeType === 'up'
                ? { opacity: 0, y: -20 }
                : { opacity: 0 }
            }
            transition={{ 
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.05
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface PopoverBodyProps {
  children: React.ReactNode
  className?: string
}

export function PopoverBody({ children, className }: PopoverBodyProps) {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  )
}

interface PopoverButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function PopoverButton({ children, onClick, className }: PopoverButtonProps) {
  const { closePopover } = usePopover()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
    closePopover('fade')
  }

  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
