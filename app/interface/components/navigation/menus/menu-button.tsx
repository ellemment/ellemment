import { motion } from 'framer-motion'

interface MenuButtonProps {
  isOpen: boolean
  variant?: 'icon' | 'text'
}

export function MenuButton({ isOpen, variant = 'icon' }: MenuButtonProps) {
  if (variant === 'text') {
    return (
      <div className="flex items-center p-2 pr-0">
        <motion.span
          className="font-normal text-base sm:text-sm"
          initial={false}
          animate={{ opacity: 1 }}
        >
          {isOpen ? 'Close' : 'Menu'}
        </motion.span>
      </div>
    )
  }

  return (
    <div className="w-4 h-4 flex flex-col justify-center items-center">
      <motion.span
        className="absolute w-4 h-[1.5px] bg-current"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -3
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute w-4 h-[1.5px] bg-current"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 3
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
