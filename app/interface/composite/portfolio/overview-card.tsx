// #app/interface/composite/portfolio/overview-card.tsx

import { Link } from "@remix-run/react"
import { Icon } from "#app/interface/foundations/icons/icon"
import { Button } from "#app/interface/shadcn/button"

interface SocialLinksProps {
  containerStyles: string
  iconStyles: string
}

const SocialLinks = ({ containerStyles, iconStyles }: SocialLinksProps) => (
  <div className={containerStyles}>
    <Link to="" className={iconStyles}>
      <Icon name="github-logo" className="text-xl" />
    </Link>
    <Link to="" className={iconStyles}>
      <Icon name="linkedin-logo" className="text-xl" />
    </Link>
  </div>
)

interface StatsItemProps {
  num: number
  text: string
}

const StatsItem = ({ num, text }: StatsItemProps) => (
  <div className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
    <span className="text-4xl xl:text-6xl font-extrabold">{num}</span>
    <p className={`${
      text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
    } leading-snug text-inherit/80`}>
      {text}
    </p>
  </div>
)

const overviewData = {
  role: "Product Engineer.",
  name: "Dony Alior.",
  description: "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.",
  button: {
    text: "Get CV",
    href: "#" 
  },
  social: {
    containerStyles: "flex gap-6",
    iconStyles: "w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
  },
  stats: [
    { num: 9, text: "Professional Years" },
    { num: 9, text: "Core Tools" },
    { num: 99, text: "Projects Delivered" },
    { num: 999, text: "Code Commits" },
  ]
} as const

export const OverviewSection = () => {
  const { role, name, description, button, social, stats } = overviewData

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col xl:flex-row items-start justify-between py-12 xl:py-24">
        <div className="text-left order-2 xl:order-none">
          <h1 className="flex flex-col gap-2 pb-4">
            <span className="text-4xl font-semibold text-zinc-500 dark:text-zinc-500">
              {name}
            </span>
            <span className="text-4xl font-semibold">
              {role}
            </span>
          </h1>
          <div className="flex flex-row items-center gap-5">
            <Button
              variant="outline"
              size="lg"
              className="flex rounded-full items-center gap-2"
            >
              <span>{button.text}</span>
              <Icon name="download" className="text-xl" />
            </Button>
            <div>
              <SocialLinks
                containerStyles={social.containerStyles}
                iconStyles={social.iconStyles}
              />
            </div>
          </div>
        </div>
      </div>
      <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
            {stats.map((item, index) => (
              <StatsItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

