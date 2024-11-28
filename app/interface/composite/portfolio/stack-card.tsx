// #app/interface/composite/portfolio/stack-card.tsx

import { type ThemedLogo, skillLogos , getThemedLogo } from '#app/routes/_marketing+/logos/logos'
import { useTheme } from '#app/utils/theme'

interface StackEntry {
  title: string
  logos: ThemedLogo[]
}

const stackEntries: StackEntry[] = [
  {
    title: 'User Experience Design',
    logos: [
      skillLogos['Figma'],
    ].filter((logo): logo is ThemedLogo => logo !== undefined),
  },
  {
    title: 'Web Applications Development',
    logos: [
      skillLogos['TypeScript'],
      skillLogos['JavaScript'],
    ].filter((logo): logo is ThemedLogo => logo !== undefined),
  },
  {
    title: 'System Architecture Engineering',
    logos: [
      skillLogos['Docker'],
      skillLogos['AWS'],
      skillLogos['GCP'],
    ].filter((logo): logo is ThemedLogo => logo !== undefined),
  },
  {
    title: 'Data Solutions Development',
    logos: [
      skillLogos['Python'],
      skillLogos['SQL'],
    ].filter((logo): logo is ThemedLogo => logo !== undefined),
  },
  {
    title: 'Business Processes Transformation',
    logos: [
      skillLogos['Python'],
    ].filter((logo): logo is ThemedLogo => logo !== undefined),
  },
]

interface StackCardProps {
  title: string
  logos: ThemedLogo[]
}

const StackCard = ({ title, logos }: StackCardProps) => {
  const theme = useTheme()

  return (
    <div className="relative p-8 bg-background border border-border rounded-none min-h-[140px] hover:bg-secondary/80 transition-all duration-300 group">
      {/* Title */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
          {title}
        </h3>
      </div>

      {/* Logos in bottom-right corner */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="w-8 h-8 transition-transform hover:scale-110"
          >
            <img
              src={getThemedLogo(logo, theme)}
              alt=""
              className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ 
                filter: theme === 'dark' ? 'invert(1)' : 'invert(0)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export const SkillsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="space-y-8">
        <header className="space-y-4">
          <h2 className="text-4xl font-bold">Skills</h2>
        </header>
        <div className="flex flex-col gap-4">
          {stackEntries.map((entry, index) => (
            <StackCard key={index} {...entry} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { StackCard, type StackEntry, stackEntries }


