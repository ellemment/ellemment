// app/ellemment-ui/components/controls/theme-switch.tsx

import { useFetcher } from '@remix-run/react'
import { clsx } from 'clsx'
import { SystemModeIcon, DarkModeIcon, LightModeIcon } from '#app/ellemment-ui/foundations/materials/icons/icons'
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
    'absolute inset-0 transform transition-transform duration-700 motion-reduce:duration-[0s]'

  return (
    <fetcher.Form method="POST" action="/action/set-theme">
      <input type="hidden" name="theme" value={nextMode} />

      <button
        type="submit"
        className={clsx(
          'bg-background border-secondary/75 text-primary hover:border-primary focus:border-primary inline-flex h-8 items-center justify-center overflow-hidden rounded-full border p-1 transition focus:outline-none',
          {
            'w-8': variant === 'icon',
            'px-8': variant === 'labelled',
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
            <DarkModeIcon size={20}/>
          </span>
          <span
            className={clsx(
              iconSpanClassName,
              mode === 'light' ? 'rotate-0' : '-rotate-90',
            )}
            style={iconTransformOrigin}
          >
            <LightModeIcon size={20} />
          </span>

          <span
            className={clsx(
              iconSpanClassName,
              mode === 'system' ? 'translate-y-0' : 'translate-y-10',
            )}
            style={iconTransformOrigin}
          >
            <SystemModeIcon size={23} />
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

