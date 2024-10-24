import React from 'react'
import { type Theme } from '#app/utils/theme.server.js'


type Content = {
  id: string;
  title: string;
};

interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image?: { id: string } | null;
  content: Content[];
}

interface AccountLayoutProps {
  user: User | null;
  children: React.ReactNode;
  userPreference: Theme | null;
}


export function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="max-w-6xl w-full flex min-h-svh pb-1 rounded-2xl">
        <div className='h-14'></div>
        <main className="flex-1 p-4 pb-20">
          {children}
        </main>
      </div>
      </div>
    </>
  );
}