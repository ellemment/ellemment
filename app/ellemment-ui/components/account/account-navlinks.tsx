import { Link } from '@remix-run/react';
import React from 'react';
import { Icon, type IconName } from '#app/components/ui/icon';

interface NavLinkProps {
  to: string;
  icon: IconName;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, className = '' }) => (
  <Link to={to} className={`flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ${className}`}>
    <Icon name={icon} className="mr-3 h-4 w-4" />
    {children}
  </Link>
);

interface AccountNavLinksProps {
  username: string;
}

export function AccountNavLinks({ username }: AccountNavLinksProps) {
  return (
    <div className="space-y-8 mt-12">
      <div>
        <nav className="mt-12 space-y-1">
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 tracking-wider">Content</h3>
          <NavLink to={`/account/${username}/content/new`} icon="plus">Create</NavLink>
        </nav>
      </div>
    </div>
  );
}