// app/routes/_marketing+/index.tsx
import { type MetaFunction } from '@remix-run/node'
import Discover from '#app/ellemment-ui/composite/playground/discover.js'
import Hero from '#app/ellemment-ui/composite/playground/hero.js'


export const meta: MetaFunction = () => [{ title: 'Ellemments' }]

export default function Index() {
  return (
    <main className="font-poppins grid h-full place-items-center">
      <Hero />
      <Discover />
    </main>
  )
}