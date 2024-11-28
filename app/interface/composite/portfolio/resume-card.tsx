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
    <div className="flex flex-col gap-4">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="relative p-8 bg-background border border-border rounded-none min-h-[140px] hover:bg-secondary/80 transition-all duration-300 group"
        >
          {/* Left Content */}
          <div className="flex flex-col gap-2">
            {/* Company */}
            <span className="text-base text-muted-foreground">
              {entry.company}
            </span>
            
            {/* Role and Period Row */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
                {entry.role}
              </h3>
              <span className="text-sm text-muted-foreground">
                {entry.period}
              </span>
            </div>
            
            {/* Location and Description Row */}
            <p className="text-sm text-muted-foreground">
              {entry.location} • {entry.description}
            </p>
          </div>
        </div>
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
      period: "07.2024 - Present",
      location: "Tokyo, Japan",
      description: "Built data intelligence handling millions of products of the marketplace.",
    },
    {
      company: "Gipocrat",
      role: "Senior Product Engineer & Founder",
      period: "03.2024 - 07.2024",
      location: "Tokyo, Japan",
      description: "Built e-commerce platform handling millions of products.",
    },
    {
      company: "Infinity LLC",
      role: "Full Stack Web Developer & Chief Technology Officer",
      period: "03.2023 - 01.2024",
      location: "Tokyo, Japan",
      description: "Delivered twenty custom websites and automation tools.",
    },
    {
      company: "NTT DATA Corporation",
      role: "Consultant, Data Scientist",
      period: "04.2021 - 12.2022",
      location: "Tokyo, Japan",
      description: "Led data analytics for major pharma companies.",
    },
    {
      company: "Ensulen LLC",
      role: "Full Stack Web Developer & Co-founder",
      period: "03.2015 - 04.2021",
      location: "Tokyo, Japan",
      description: "Developed WordPress solutions for thirty plus clients.",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="space-y-8">
        <header className="space-y-4">
          <h2 className="text-4xl font-bold">Experience</h2>
        </header>
        <ResumeStack entries={resumeEntries} />
      </div>
    </section>
  )
}
