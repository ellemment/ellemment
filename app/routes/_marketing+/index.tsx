// #app/routes/_marketing+/index.tsx

import { FeatureGrid } from '#app/interface/composite/playground/feature-grid'
import { HoverReveal } from '#app/interface/composite/playground/hover-reveal'
import { TrippyReveal } from '#app/interface/composite/playground/trippy-reveal'
import { HeroSection } from '#app/interface/composite/portfolio/hero.js'


export default function IndexRoute() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <FeatureGrid />
      <HoverReveal />
      <TrippyReveal />
    </>
  )
}

