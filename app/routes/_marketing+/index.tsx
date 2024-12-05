// #app/routes/_marketing+/index.tsx

import { OverviewSection } from '#app/interface/composite/portfolio/overview-card'
import { ResumeSection } from '#app/interface/composite/portfolio/resume-card'
import { IdSection } from '#app/interface/composite/portfolio/id-section'



export default function IndexRoute() {
  return (
    <>
   
       {/*     <OverviewSection /> */}
      <IdSection />
      {/* <SkillsSection /> */}

        {/*      <ResumeSection /> */}

      {/*      <ServicesSection /> */}
      <div className="h-[25vh]" />
    </>
  )
}

