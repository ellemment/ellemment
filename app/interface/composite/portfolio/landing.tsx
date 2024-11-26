import { Link } from "@remix-run/react";
import { useState, useCallback } from "react";
import type Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperComponent, SwiperSlide, useSwiper } from "swiper/react";
import { Icon } from "#app/interface/foundations/icons/icon";
import { Button } from "#app/interface/shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#app/interface/shadcn/tabs";
import { skillLogos } from '#app/routes/_marketing+/logos/logos';
import {
  overviewContent,
  overviewStats,
  resumeContent,
  servicesContent,
  workContent,
} from "./content";

// Import styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Types
type StackItem = {
  name: string;
};

type Project = {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: readonly StackItem[];
  image: string;
  live: string;
  github: string;
};

type SliderButtonsProps = {
  containerStyles: string;
  btnStyles: string;
  iconsStyles?: string;
};


const SocialLinks = ({ containerStyles, iconStyles }: { containerStyles: string; iconStyles: string }) => (
  <div className={containerStyles}>
    {['github', 'linkedin', 'twitter', 'discord'].map((platform) => (
      <Link key={platform} to="" className={iconStyles}>
        <Icon name={`${platform}-logo`} className="text-xl" />
      </Link>
    ))}
  </div>
);

const StatsItem = ({ num, text }: { num: number; text: string }) => (
  <div className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
    <span className={overviewStats.config.styles.number}>{num}</span>
    <p className={overviewStats.config.styles.text(text.length)}>{text}</p>
  </div>
);


const SliderButtonsContent = ({ containerStyles, btnStyles }: SliderButtonsProps) => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      {[
        { action: () => swiper.slidePrev(), icon: "arrow-left" },
        { action: () => swiper.slideNext(), icon: "arrow-right" }
      ].map(({ action, icon }) => (
        <button
          key={icon}
          className={btnStyles}
          onClick={action}
          type="button"
        >
          <Icon name={icon} className="text-xl" />
        </button>
      ))}
    </div>
  );
};


{/* 1st Section - Overview */ }

const OverviewSection = () => {
  const { role, name, description, button, social } = overviewContent;
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col xl:flex-row items-center justify-between py-12 xl:py-24">
        <div className="ttext-left order-2 xl:order-none">
          <h1 className="flex flex-col gap-2 pb-4">
            <span className="text-4xl font-semibold text-zinc-500 dark:bg-zinc-500">{name}</span>
            <span className="text-4xl font-semibold">{role}</span>
          </h1>
          <p className="max-w-[500px] mb-9 text-inherit/80">{description}</p>
          <div className="flex flex-col xl:flex-row items-start gap-8">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <span>{button.text}</span>
              <Icon name="download" className="text-xl" />
            </Button>
            <div className="mb-8 xl:mb-0">
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




{/* 2nd Section - Resume */ }

const ResumeSection = () => {
  const renderTabContent = (
    title: string,
    description: string,
    content: React.ReactNode
  ) => (
    <div className="space-y-8">
      <header className="space-y-4">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      </header>
      {content}
    </div>
  );

  const renderItemList = <T,>(items: readonly T[], renderItem: (item: T, index: number) => React.ReactNode) => (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {items.map((item, index) => renderItem(item, index))}
    </ul>
  );

  return (
    <section className="max-w-7xl mx-auto px-4">
      <Tabs defaultValue="skills" className="space-y-8">
        <TabsList className="flex w-full justify-start gap-2 bg-transparent p-0">
          {resumeContent.tabs.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-lg bg-transparent px-6 py-3 text-lg capitalize
                data-[state=active]:bg-secondary 
                data-[state=active]:text-primary 
                hover:bg-secondary/40 
                transition-colors"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full">
          {/* Skills Tab */}
          <TabsContent value="skills">
            {renderTabContent(
              resumeContent.skills.title,
              resumeContent.skills.description,
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {resumeContent.skills.skillList.map((skill) => {
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
            )}
          </TabsContent>
          {/* Experience Tab */}
          <TabsContent value="experience">
            {renderTabContent(
              resumeContent.experience.title,
              resumeContent.experience.description,
              renderItemList(
                resumeContent.experience.items,
                (item, index) => (
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
                )
              )
            )}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            {renderTabContent(
              resumeContent.education.title,
              resumeContent.education.description,
              renderItemList(
                resumeContent.education.items,
                (item, index) => (
                  <li
                    key={index}
                    className="bg-secondary p-6 rounded-xl flex flex-col justify-start gap-2"
                  >
                    <time className="text-accent">{item.duration}</time>
                    <h3 className="text-xl">{item.degree}</h3>
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <p className="text-muted-foreground">{item.institution}</p>
                    </div>
                  </li>
                )
              )
            )}
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};


{/* 3rd Section - Services */ }

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


{/* 4th Section - Work */ }
const WorkSection = () => {
  const [currentProject, setCurrentProject] = useState<Project>(workContent.projects[0]);

  const handleSlideChange = useCallback((swiper: Swiper) => {
    const project = workContent.projects[swiper.activeIndex];
    if (project) setCurrentProject(project);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            {/* Project Info */}
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {currentProject.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-inherit group-hover:text-accent transition-all duration-500 capitalize">
                {currentProject.category} project
              </h2>
              <p className="text-inherit/60">{currentProject.description}</p>

              <ul className="flex gap-4">
                {currentProject.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {index !== currentProject.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>

              <div className="border border-inherit/20" />

              <div className="flex items-center gap-4">
                {[
                  { href: currentProject.live, icon: "arrow-top-right" },
                  { href: currentProject.github, icon: "github-logo" }
                ].map(({ href, icon }) => (
                  <Link key={icon} to={href}>
                    <button className="w-[70px] h-[70px] rounded-full bg-inherit/5 flex justify-center items-center group">
                      <Icon name={icon} className="text-inherit text-3xl group-hover:text-accent" />
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[50%]">
            <SwiperComponent
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
              loop={true}
            >
              {workContent.projects.map((project, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                    <div className="absolute inset-0 bg-black/10 z-10" />
                    <div className="relative w-full h-full">
                      <img
                        src={project.image}
                        className="object-cover w-full h-full"
                        alt={`${project.title} project preview`}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <SliderButtonsContent
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </SwiperComponent>
          </div>
        </div>
    </section>
  );
};



{/* Main Component */ }

export const Landing = () => (
  <>
    <OverviewSection />
    <div className="h-[25vh]" />
    <ResumeSection />
    <div className="h-[25vh]" />
    <ServicesSection />
    <div className="h-[25vh]" />
    <WorkSection />
  </>
);