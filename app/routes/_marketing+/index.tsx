// #app/routes/_marketing+/index.tsx


import { CareerSection } from '#app/interface/composite/portfolio/career.js'
import { CTA } from '#app/interface/composite/portfolio/cta.js'
import { HeroSection } from '#app/interface/composite/portfolio/hero.js'
import { Skills } from '#app/interface/composite/portfolio/skills'
import { StackSection } from '#app/interface/composite/portfolio/stack.js'

export default function IndexRoute() {
  return (
    <>
      <HeroSection />
      <Skills />
      <CareerSection />
      <StackSection />
      <CTA/>
    </>
  )
}

