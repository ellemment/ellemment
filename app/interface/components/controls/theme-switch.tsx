// app/interface/components/controls/theme-switch.tsx

import { useFetcher } from '@remix-run/react'
import { clsx } from 'clsx'
import { Icon } from '#app/interface/foundations/icons/icon'
import { useRequestInfo } from '#app/utils/request-info'
import { THEME_FETCHER_KEY, useOptimisticThemeMode } from '#app/utils/theme'

interface ThemeSwitchProps {
  variant?: 'icon' | 'labelled'
}

const iconTransformOrigin = { transformOrigin: '50% 50px' }

export function ThemeSwitch({ variant = 'icon' }: ThemeSwitchProps) {
  const requestInfo = useRequestInfo()
  const fetcher = useFetcher({ key: THEME_FETCHER_KEY })

  const optimisticMode = useOptimisticThemeMode()
  const mode = optimisticMode ?? requestInfo.userPrefs.theme ?? 'system'
  const nextMode =
    mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system'

  const iconSpanClassName =
    'absolute inset-0 flex items-center justify-center transform transition-transform duration-700 motion-reduce:duration-[0s]'

  return (
    <fetcher.Form method="POST" action="/action/set-theme" className='flex items-center justify-center h-full'>
      <input type="hidden" name="theme" value={nextMode} />

      <button
        type="submit"
        className={clsx(
          'bg-background hover:bg-secondary backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:backdrop-blur-sm shadow-sm text-primary inline-flex items-center justify-center overflow-hidden rounded-full transition focus:outline-none',
          {
            'h-8 w-8': variant === 'icon',
            'h-8 px-6': variant === 'labelled',
          },
        )}
      >
        <div className="relative h-6 w-6">
          <span
            className={clsx(
              iconSpanClassName,
              mode === 'dark' ? 'rotate-0' : 'rotate-90',
            )}
            style={iconTransformOrigin}
          >
            <Icon name="half-2" className="inline self-center w-5 h-5" />
          </span>
          <span
            className={clsx(
              iconSpanClassName,
              mode === 'light' ? 'rotate-0' : '-rotate-90',
            )}
            style={iconTransformOrigin}
          >
            <Icon name="half-2" className="inline self-center w-5 h-5" />
          </span>

          <span
            className={clsx(
              iconSpanClassName,
              mode === 'system' ? 'translate-y-0' : 'translate-y-10',
            )}
            style={iconTransformOrigin}
          >
            <Icon name="value-none" className="inline self-center w-5 h-5" />
          </span>
        </div>
        <span className={clsx('ml-4', { 'sr-only': variant === 'icon' })}>
          {`Switch to ${
            nextMode === 'system'
              ? 'system'
              : nextMode === 'light'
                ? 'light'
                : 'dark'
          } mode`}
        </span>
      </button>
    </fetcher.Form>
  )
}

