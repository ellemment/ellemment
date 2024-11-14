// #app/ellemment-ui/components/composite/header-button.tsx

import { clsx } from 'clsx'
import { type ReactNode } from 'react'

interface HeaderButtonProps {
  variant?: 'icon' | 'labelled'
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function HeaderButton({
  variant = 'icon',
  children,
  className,
  onClick,
  type = 'button',
}: HeaderButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'bg-gray-300/30 hover:bg-gray-300/40 backdrop-blur-3xl hover:backdrop-blur-sm',
        'shadow-xl text-primary inline-flex items-center justify-center',
        'overflow-hidden rounded-full transition focus:outline-none',
        {
          'h-8 w-8': variant === 'icon',
          'h-8 px-6': variant === 'labelled',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

