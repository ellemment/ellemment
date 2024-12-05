import { motion } from 'framer-motion'

interface ResumeEntry {
  company: string
  role: string
  period: string
  location: string
  description: string
}

interface ResumeStackProps {
  entries: ResumeEntry[]
}

export const ResumeStack = ({ entries }: ResumeStackProps) => {
  return (
    <div className="flex flex-col">
      {entries.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ x: index * 40 }}
          whileInView={{ x: 0 }}
          exit={{ x: index * 40 }}
          viewport={{ 
            once: false,
            margin: "-100px"
          }}
          transition={{ 
            duration: 0.7,
            ease: "easeInOut"
          }}
          className={`relative py-8 transition-colors duration-300 group
            ${index !== entries.length - 1 ? 'border-b border-border' : ''}`}
        >
          <div className="flex flex-col gap-2">
            {/* Company and Location Row */}
            <div className="text-base text-muted-foreground">
              {entry.company} • {entry.location}
            </div>

            {/* Role Row */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold tracking-tight transition-colors">
                {entry.role}
              </h3>
            </div>

            {/* Description and Period Row */}
            <div 
              className="flex justify-between items-center text-sm text-muted-foreground opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
            >
              <span>{entry.description}</span>
              <span>{entry.period}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Usage example:
export const ResumeSection = () => {
  const resumeEntries: ResumeEntry[] = [
    {
      company: "Rakuten Group",
      role: "Product Development Manager",
      period: "Present",
      location: "Tokyo, Japan",
      description: "Built data intelligence handling millions of products of the marketplace.",
    },
    {
      company: "Gipocrat",
      role: "Senior Product Engineer & Founder",
      period: "2024",
      location: "Tokyo, Japan",
      description: "Built e-commerce platform handling millions of products.",
    },
    {
      company: "Infinity LLC",
      role: "Full Stack Web Developer & Chief Technology Officer",
      period: "2023",
      location: "Tokyo, Japan",
      description: "Delivered twenty custom websites and automation tools.",
    },
    {
      company: "NTT DATA Corporation",
      role: "Consultant, Data Scientist",
      period: "2021/22",
      location: "Tokyo, Japan",
      description: "Led data analytics for major pharma companies.",
    },
    {
      company: "Ensulen LLC",
      role: "Full Stack Web Developer & Co-founder",
      period: "2015/21",
      location: "Tokyo, Japan",
      description: "Developed WordPress solutions for thirty plus clients.",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="space-y-8">
        {/* section title 
        <header className="space-y-4">
          <h2 className="text-4xl font-bold">Experience</h2>
        </header>
        */}
        <ResumeStack entries={resumeEntries} />
      </div>
    </section>
  )
}
