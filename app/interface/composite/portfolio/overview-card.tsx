"use client"
import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "#app/interface/shadcn/tabs"

const overviewData = {
  role: "Product Engineer",
  description: "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.",
  stats: [
    {
      contents: "01",
      headline: "Resume",
      details: "View my professional experience and qualifications"
    },
    {
      contents: 9,
      headline: "Experience",
      details: "Years of professional software development experience"
    },
    {
      contents: 9,
      headline: "Stack",
      details: "Different technologies and frameworks I work with"
    },
    {
      contents: 99,
      headline: "Projects",
      details: "Completed projects across various domains"
    },
  ]
} as const

const tabsData = [
  {
    value: "everyone",
    label: "For Everyone",
    content: "Hello there, I'm a designer who cares about making beautiful things that help people."
  },
  {
    value: "recruiters",
    label: "Recruiters",
    content: "I'm a product designer with 15 years of experience across brand and product, at companies large and small."
  },
  {
    value: "managers",
    label: "Managers",
    content: "I bring end-to-end product acumen, from vision and strategy to discovery and delivery."
  },
  {
    value: "engineers",
    label: "Engineers",
    content: "I'm {highly_technical} and while (I'm ≠ engineer) I know my way /around & can speak \"fluently\" with you."
  }
]

export const OverviewSection = () => {
  const { role, stats } = overviewData
  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  return (
    <section className="min-h-[100dvh] max-w-7xl mx-auto px-4 py-12 xl:py-24 grid grid-rows-2 gap-12">
      {/* Top Half - Split into two equal sections */}
      <div className="grid grid-rows-2 gap-12">
        {/* Name and Role Section */}
        <div className="flex items-center">
          <h1 className="text-left">
            <span className="block text-2xl md:text-5xl font-semibold tracking-tight">
              {role}
            </span>
          </h1>
        </div>

        {/* Tabs Section with fixed height and aligned content */}
        <div className="relative flex flex-col justify-between h-full">
          <Tabs defaultValue="everyone" className="flex flex-col h-full">
            <TabsList className="bg-transparent w-full justify-start gap-8 p-0 mb-12">
              {tabsData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-md font-normal pb-4 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=inactive]:opacity-50 px-0 transition-opacity"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex-grow flex items-center mb-12">
              {tabsData.map((tab) => (
                <TabsContent 
                  key={tab.value} 
                  value={tab.value}
                  className="text-2xl md:text-5xl font-semibold tracking-tight leading-[5rem] mb-0"
                >
                  {tab.content}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Bottom Half - Stats Cards */}
      <div className="h-full">
        <div className="flex w-full h-full -space-x-6">
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                zIndex: activeIndex === index
                  ? 50
                  : activeIndex > index
                    ? index
                    : stats.length - index
              }}
              className={`
                relative border border-border rounded-lg p-4
                transition-all duration-300 ease-in-out
                h-full flex flex-col
                bg-background/80 backdrop-blur-sm
                shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                ${activeIndex === index ? 'w-[37.5%]' : 'w-[20.833%]'}
                ${index === 0 ? '' : '-ml-6'}
              `}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(0)}
            >
              <div className="flex flex-col items-center justify-between h-full">
                <p className="text-md font-normal tracking-tight">{item.headline}</p>
                <span className={`
                  text-4xl xl:text-6xl font-extrabold tracking-tighter
                  transition-all duration-500 ease-in-out
                  ${activeIndex === index ? 'opacity-100 delay-200' : 'opacity-0'}
                `}>
                  {item.contents}
                </span>
                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${activeIndex === index ? 'max-h-full opacity-100 delay-200' : 'max-h-0 opacity-0'}
                `}>
                  <p className="text-center text-gray-600 dark:text-gray-400 pt-4 tracking-tight">
                    {item.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OverviewSection;