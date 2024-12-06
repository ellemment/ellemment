// #app/routes/_marketing+/index.tsx

import { IdSection } from '#app/interface/composite/portfolio/id-section'
import { ParallaxSection } from '#app/interface/composite/portfolio/parallax-section'
import { OverviewSection } from '#app/interface/composite/portfolio/overview-card'
import { ResumeSection } from '#app/interface/composite/portfolio/resume-card'

export default function IndexRoute() {
  return (
    <>
      <ParallaxSection />
       {/*     <OverviewSection /> */}
      {/* <SkillsSection /> */}

        {/*      <ResumeSection /> */}

      {/*      <ServicesSection /> */}
      <div className="h-[25vh]" />
    </>
  )
}

