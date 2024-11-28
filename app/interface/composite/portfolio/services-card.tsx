interface ServiceEntry {
  title: string
  description: string
}

interface ServicesStackProps {
  entries: ServiceEntry[]
}

export const ServicesStack = ({ entries }: ServicesStackProps) => {
  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="relative p-8 bg-background border border-border rounded-none min-h-[140px] hover:bg-secondary/80 transition-all duration-300 group"
        >
          {/* Left Content */}
          <div className="flex flex-col gap-2 max-w-[75%]">
            <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
              {entry.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {entry.description}
            </p>
          </div>

          {/* Right Content - Status */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Usage example:
export const ServicesSection = () => {
  const serviceEntries: ServiceEntry[] = [
    {
      title: "Full Stack Development",
      description: "End-to-end web application development combining modern frontend frameworks with robust backend solutions. Built for scalability and performance.",
    },
    {
      title: "Digital Product Design",
      description: "User-centered design solutions that transform business requirements into intuitive digital experiences. Focus on conversion and engagement.",
    },
    {
      title: "Data Intelligence Architecture",
      description: "Custom data solutions leveraging AI and analytics for informed business decisions. Built for scale and accuracy.",
    },
    {
      title: "Technical Process Optimization",
      description: "Streamlining business operations through custom automation and integration solutions. Focus on efficiency and ROI.",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="space-y-8">
        <header className="space-y-4">
          <h2 className="text-4xl font-bold">Services</h2>
        </header>
        <ServicesStack entries={serviceEntries} />
      </div>
    </section>
  )
}
