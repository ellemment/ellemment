import './navbar.css'
import { Link } from '@remix-run/react'
import { ThemeSwitch } from '#app/ellemment-ui/components/controls/theme-switch'
import { NavbarMobile } from '#app/ellemment-ui/components/navigation/headers/header-global-sm'
import { NavLinks } from '#app/ellemment-ui/components/navigation/menus/navlinks-global'
import { useOptionalUser} from '#app/utils/use-root-data'
import { Icon } from '#app/components/ui/icon'

function GlobalHeader() {
  const user = useOptionalUser()

  return (
    <div className="px-5vw px-4 py-4 lg:py-6 text-primary">
      <nav className="px-4 text-primary mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex justify-center gap-4 align-middle">
          <Link
            prefetch="intent"
            to="/"
            className="text-primary underlined block whitespace-nowrap text-sm font-medium transition focus:outline-none"
          >
            <h1>ellemments</h1>
          </Link>
        </div>

        <NavLinks className="hidden lg:flex text-primary" username={user?.username ?? ''} />

        <div className="flex items-center justify-center">
          <NavbarMobile className="block lg:hidden" />
          <div className="noscript-hidden hidden lg:flex items-center justify-center h-full">
            <ThemeSwitch />
          </div>
          <Link
            to={user ? '/me' : '/login'}
            className="ml-2 h-6 w-6 bg-gray-300/30 hover:bg-gray-300/40 backdrop-blur-3xl hover:backdrop-blur-sm shadow-xl text-primary inline-flex items-center justify-center overflow-hidden rounded-full transition focus:outline-none"
          >
            <Icon 
              name={user ? 'github-logo' : 'plus-circled'} 
              className="inline self-center w-4 h-4" 
            />
          </Link>
        </div>
      </nav>
    </div>
  )
}

export { GlobalHeader }
