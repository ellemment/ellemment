// #app/routes/_marketing+/index.tsx

import { OverviewSection } from '#app/interface/composite/portfolio/overview-card'
import { ResumeSection } from '#app/interface/composite/portfolio/resume-card'
import { ServicesSection } from '#app/interface/composite/portfolio/services-card'
import { SkillsSection } from '#app/interface/composite/portfolio/stack-card'

export default function IndexRoute() {
  return (
    <>
      <OverviewSection />
    <div className="h-[25vh]" />
    <SkillsSection />
    <div className="h-[25vh]" />
    <ResumeSection />
    <div className="h-[25vh]" />
    <ServicesSection />
    <div className="h-[25vh]" />
    </>
  )
}
