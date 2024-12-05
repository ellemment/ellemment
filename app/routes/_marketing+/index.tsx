// #app/routes/_marketing+/index.tsx

import { OverviewSection } from '#app/interface/composite/portfolio/overview-card'
import { ResumeSection } from '#app/interface/composite/portfolio/resume-card'



export default function IndexRoute() {
  return (
    <>
      <OverviewSection />
    
      {/* <SkillsSection /> */}

      <ResumeSection />
      <div className="h-[25vh]" />
      {/*      <ServicesSection /> */}
      <div className="h-[25vh]" />
    </>
  )
}
