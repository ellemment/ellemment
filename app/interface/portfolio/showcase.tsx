// #app/interface/sections/showcase.tsx

import { type ReactNode } from "react";
import { ElementCard } from "#app/interface/components/composite/element-card";
import { ElementCarousel } from "#app/interface/components/composite/element-carousel";
import { ElementSection } from "#app/interface/components/composite/element-section";
import {
  skillData,
  careerData,
  stackData,
  type SkillData,
  type CareerData,
  type StackData,
} from "#app/utils/element-data";

// Generic type for showcase data
type ShowcaseDataType = SkillData | CareerData | StackData;
type ShowcaseVariant = 'skills' | 'career' | 'stack';

interface ShowcaseSectionProps {
  variant?: ShowcaseVariant;
  backgroundColor?: string;
  className?: string;
}

interface ShowcaseConfig<T extends ShowcaseDataType> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderInfo?: (item: T) => ReactNode;
  title: string;
  subtitle: string;
}

// Create type-safe render functions
const renderSkillCard = (item: ShowcaseDataType): ReactNode => {
  if ('skill' in item) {
    return (
      <ElementCard
        id={item.id}
        title={item.title}
        description={item.description}
        metadata={item.skill}
        color={item.color}
        size="medium"
      />
    );
  }
  return null;
};

const renderCareerCard = (item: ShowcaseDataType): ReactNode => {
  if ('company' in item) {
    return (
      <ElementCard
        id={item.id}
        title={item.title}
        description={item.description}
        metadata={`${item.company} • ${item.location}`}
        detailContent={item.responsibilities.join("\n")}
        color={item.color}
        size="large"
      />
    );
  }
  return null;
};

const renderStackCard = (item: ShowcaseDataType): ReactNode => {
  if ('technologies' in item) {
    return (
      <ElementCard
        id={item.id}
        title={item.title}
        description={item.description}
        metadata={item.category}
        color={item.color}
        size="medium"
        renderContent={{
          expanded: () => (
            <div className="space-y-4 text-white">
              <h3 className="text-lg font-medium">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white bg-opacity-20 px-3 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Proficiency</span>
                  <span>{item.proficiency}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white bg-opacity-20">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-300"
                    style={{ width: `${item.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ),
        }}
      />
    );
  }
  return null;
};

// Update info panel render functions
const renderCareerInfo = (item: ShowcaseDataType): ReactNode => {
  if ('company' in item) {
    return (
      <div className="space-y-2">
        <span className="text-sm uppercase tracking-wider opacity-80">
          {item.period}
        </span>
        <h2 className="text-4xl font-bold">{item.title}</h2>
        <p className="text-lg opacity-90">{item.company}</p>
        <p className="text-sm opacity-80">{item.location}</p>
      </div>
    );
  }
  return null;
};

const renderStackInfo = (item: ShowcaseDataType): ReactNode => {
  if ('technologies' in item) {
    return (
      <div className="space-y-2">
        <span className="text-sm uppercase tracking-wider opacity-80">
          {item.category}
        </span>
        <h2 className="text-4xl font-bold">{item.title}</h2>
        <p className="text-lg opacity-90">{item.description}</p>
      </div>
    );
  }
  return null;
};

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  variant = 'career',
  backgroundColor = "#000000",
  className = "",
}) => {
  // Get the appropriate data and render functions based on variant
  const getConfig = (): ShowcaseConfig<ShowcaseDataType> => {
    switch (variant) {
      case 'skills':
        return {
          items: skillData(),
          renderItem: renderSkillCard,
          title: "Skills & Expertise",
          subtitle: "Core competencies and technical expertise",
        };
      case 'stack':
        return {
          items: stackData(),
          renderItem: renderStackCard,
          renderInfo: renderStackInfo,
          title: "Tech Stack",
          subtitle: "Technologies and tools I work with",
        };
      case 'career':
      default:
        return {
          items: careerData(),
          renderItem: renderCareerCard,
          renderInfo: renderCareerInfo,
          title: "Career Journey",
          subtitle: "Professional experience and growth",
        };
    }
  };

  const config = getConfig();

  return (
    <ElementSection
      heading={config.title}
      subheading={config.subtitle}
      variant="overlay-headline"
      containerHeight={200}
      backgroundColor={backgroundColor}
      className={className}
      scaleRange={[1, 0.85]}
      borderRadiusRange={[0, 32]}
    >
      <ElementCarousel
        items={config.items}
        renderItem={config.renderItem}
        renderInfo={config.renderInfo}
        infinite
        autoPlay={{
          enabled: true,
          interval: 5000,
          pauseOnHover: true
        }}
      />
    </ElementSection>
  );
};

// Main showcase component that includes all sections
export const Showcase: React.FC = () => {
  return (
    <div className="space-y-24">
      <ShowcaseSection
        variant="career"
        backgroundColor="#1c1c1e"
      />
      <ShowcaseSection
        variant="skills"
        backgroundColor="#2c2c2e"
      />
      <ShowcaseSection
        variant="stack"
        backgroundColor="#3c3c3e"
      />
    </div>
  );
};

export default Showcase;