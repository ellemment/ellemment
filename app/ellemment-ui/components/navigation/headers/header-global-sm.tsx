import { Link } from '@remix-run/react';
import * as React from 'react';
import { ThemeSwitch } from '#app/ellemment-ui/components/controls/theme-switch';
import { LINKS } from '#app/ellemment-ui/components/navigation/menus/navlinks-global';
import { useOptionalUser } from '#app/utils/use-root-data';
import './navbar.css';

declare global {
  interface HTMLElement {
    hidePopover(): void;
    showPopover(): void;
  }
}

interface MobileMenuButtonProps {
  menuButtonRef: React.RefObject<HTMLButtonElement>;
}

function MobileMenuButton({ menuButtonRef }: MobileMenuButtonProps) {
  return (
    <button
      ref={menuButtonRef}
      className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary p-1 transition focus:outline-none focus:border-primary hover:border-primary text-primary"
      popovertarget="mobile-menu"
      type="button"
      aria-controls="mobile-menu"
      aria-expanded="false"
      {...({ popovertarget: 'mobile-menu' } as any)}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="6" y="9" width="20" height="2" rx="1" fill="currentColor" />
        <rect x="6" y="15" width="20" height="2" rx="1" fill="currentColor" />
        <rect x="6" y="21" width="20" height="2" rx="1" fill="currentColor" />
      </svg>
      <span className="sr-only">Toggle mobile menu</span>
    </button>
  );
}

interface NavbarMobileProps {
  className?: string;
}

// Update the ref type to include popover methods
interface PopoverElement extends HTMLDivElement {
  hidePopover: () => void;
  showPopover: () => void;
}

export function NavbarMobile({ className }: NavbarMobileProps) {
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const user = useOptionalUser();
  const username = user?.username ?? '';

  const handleLinkClick = React.useCallback(() => {
    (popoverRef.current as unknown as PopoverElement)?.hidePopover();
  }, []);

  return (
    <div className={className}>
      <MobileMenuButton menuButtonRef={menuButtonRef} />
      
      <div
        id="mobile-menu"
        ref={popoverRef}
        popover="auto"
        onToggle={(e) => {
          if (e.newState === 'open') {
            window.scrollTo(0, 0);
          }
        }}
        className="fixed inset-x-0 top-[128px] m-0 h-[calc(100svh-128px)] w-full"
      >
        <nav className="flex h-full flex-col overflow-y-scroll border-t pb-12 dark:border-gray-600 bg-background">
          {LINKS.map((link, index) => {
            const to = typeof link.to === 'function' ? link.to(username) : link.to;
            return (
              <Link
                key={`${link.name}-${to}-${index}`}
                to={to}
                onClick={handleLinkClick}
                className="border-b border-gray-200 px-4 py-9 hover:bg-secondary focus:bg-secondary text-primary hover:text-team-current px-5vw"
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="py-9 text-center">
            <ThemeSwitch variant="labelled" />
          </div>
        </nav>
      </div>
    </div>
  );
}
