import { Link } from "@remix-run/react";
import { Icon } from "#app/interface/foundations/icons/icon";
import { Button } from "#app/interface/shadcn/button";
import { skillLogos } from '#app/routes/_marketing+/logos/logos';
import {
  overviewContent,
  overviewStats,
  skillsContent,
  experienceContent,
  servicesContent,
} from "./content";


const SocialLinks = ({ containerStyles, iconStyles }: { containerStyles: string; iconStyles: string }) => (
  <div className={containerStyles}>
    <Link to="" className={iconStyles}>
      <Icon name="github-logo" className="text-xl" />
    </Link>
    <Link to="" className={iconStyles}>
      <Icon name="linkedin-logo" className="text-xl" />
    </Link>
  </div>
);

const StatsItem = ({ num, text }: { num: number; text: string }) => (
  <div className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
    <span className={overviewStats.config.styles.number}>{num}</span>
    <p className={overviewStats.config.styles.text(text.length)}>{text}</p>
  </div>
);



{/* 1st Section - Overview */ }

const OverviewSection = () => {
  const { role, name, description, button, social } = overviewContent;
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col xl:flex-row items-start justify-between py-12 xl:py-24">
        <div className="text-left order-2 xl:order-none">
          <h1 className="flex flex-col gap-2 pb-4">
            <span className="text-4xl font-semibold text-zinc-500 dark:text-zinc-500">{name}</span>
            <span className="text-4xl font-semibold">{role}</span>
          </h1>
          <p className="max-w-[500px] mb-9 text-inherit/80">{description}</p>
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
            {overviewStats.items.map((item, index) => (
              <StatsItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};




{/* 2nd Section - Skills */ }

const SkillsSection = () => (
  <section className="max-w-7xl mx-auto px-4">
    <div className="space-y-8">
      <header className="space-y-4">
        <h2 className="text-4xl font-bold">{skillsContent.title}</h2>
        <p className="text-muted-foreground max-w-2xl">{skillsContent.description}</p>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skillsContent.skillList.map((skill) => {
          const logoSrc = skillLogos[skill.name];
          if (!logoSrc) return null;

          return (
            <li key={skill.name}>
              <div className="w-full p-8 aspect-square bg-secondary rounded-xl flex items-center justify-center group">
                <div className="w-12 h-12 group-hover:text-accent transition-colors">
                  <img
                    src={logoSrc}
                    alt={`${skill.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

{/* 3rd Section - Experience */ }

const ExperienceSection = () => (
  <section className="max-w-7xl mx-auto px-4">
    <div className="space-y-8">
      <header className="space-y-4">
        <h2 className="text-4xl font-bold">{experienceContent.title}</h2>
        <p className="text-muted-foreground max-w-2xl">{experienceContent.description}</p>
      </header>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {experienceContent.items.map((item, index) => (
          <li
            key={index}
            className="bg-secondary p-6 rounded-xl flex flex-col justify-start gap-2"
          >
            <time className="text-accent">{item.duration}</time>
            <h3 className="text-xl">{item.position}</h3>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <p className="text-muted-foreground">{item.company}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

{/* 4th Section - Services */ }

const ServicesSection = () => (
  <section className="max-w-7xl mx-auto px-4">
    <div className="flex flex-col justify-center py-12 xl:py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
        {servicesContent.items.map(({ num, href, title, description }, index) => (
          <div key={index} className="flex-1 flex flex-col justify-center gap-6 group">
            <div className="w-full flex justify-between items-center">
              <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                {num}
              </div>
              <Link
                to={href}
                className="w-[70px] h-[70px] rounded-full bg-secondary group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
              >
                <Icon name="arrow-top-right" className="text-primary text-3xl" />
              </Link>
            </div>
            <h2 className="text-[42px] font-bold leading-none text-inherit group-hover:text-accent transition-all duration-500">
              {title}
            </h2>
            <p className="text-inherit/60">{description}</p>
            <div className="border-b border-border/20 w-full" />
          </div>
        ))}
      </div>
    </div>
  </section>
);



{/* Main Component */ }

export const Landing = () => (
  <>
    <OverviewSection />
    <div className="h-[25vh]" />
    <SkillsSection />
    <div className="h-[25vh]" />
    <ExperienceSection />
    <div className="h-[25vh]" />
    <ServicesSection />
    <div className="h-[25vh]" />
  </>
);