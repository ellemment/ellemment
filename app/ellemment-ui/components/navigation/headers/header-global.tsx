import './navbar.css'
import { Link } from '@remix-run/react'
import { Avatar } from '#app/ellemment-ui/components/controls/avatar'
import { ThemeSwitch } from '#app/ellemment-ui/components/controls/theme-switch'
import { NavbarMobile } from '#app/ellemment-ui/components/navigation/headers/header-global-sm'
import { NavLinks } from '#app/ellemment-ui/components/navigation/menus/navlinks-global'
import { useOptionalUser, useRootData } from '#app/utils/use-root-data'

function GlobalHeader() {
  const { requestInfo } = useRootData()
  const user = useOptionalUser()
  const avatarSrc = user?.image?.id 
    ? `/resources/user-images/${user.image.id}` 
    : '/img/user.png'
  const avatarAlt = user?.name ?? 'Default avatar'

  return (
    <div className="px-5vw px-4 py-4 lg:py-6 text-primary">
      <nav className="px-4 text-primary mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex justify-center gap-4 align-middle">
          <Link
            prefetch="intent"
            to="/"
            className="text-primary underlined block whitespace-nowrap text-sm font-medium transition focus:outline-none"
          >
            <h1>Doni Alior</h1>
          </Link>
        </div>

        <NavLinks className="hidden lg:flex text-primary" username={user?.username ?? ''} />

        <div className="flex items-center justify-center">
          <NavbarMobile className="block lg:hidden" />
          <div className="noscript-hidden hidden lg:block">
            <ThemeSwitch />
          </div>
          <Avatar
            imageUrl={avatarSrc}
            imageAlt={avatarAlt}
            className="ml-4"
          />
        </div>
      </nav>
    </div>
  )
}

export { GlobalHeader }
