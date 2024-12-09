// #app/routes/_marketing+/index.tsx

import { FeatureGrid } from '#app/interface/composite/playground/feature-grid'
import { CareerSection } from '#app/interface/composite/portfolio/career.js'
import { HeroSection } from '#app/interface/composite/portfolio/hero.js'
import { StackSection } from '#app/interface/composite/portfolio/stack.js'


export default function IndexRoute() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <CareerSection />
      <StackSection />
      <div className="h-[100vh] bg-background">
   
      </div>
    </>
  )
}

