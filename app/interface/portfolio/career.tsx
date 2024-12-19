import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  title1: string;
  title2: string;
  src: string;
}

const projects: Project[] = [
  {
    title1: "Product",
    title2: "Development Manager",
    src: "/marketing/avatar-alex-suevalov.jpg"
  },
  {
    title1: "Senior",
    title2: "Product Engineer",
    src: "/marketing/avatar-claudio-wunder.jpg"
  },
  {
    title1: "Senior",
    title2: "Data Scientist",
    src: "/marketing/avatar-claudio-wunder.jpg"
  },
  {
    title1: "Web",
    title2: "Developer",
    src: "/marketing/avatar-claudio-wunder.jpg"
  },
];

// Refined animation variants
const imageAnimation = {
  initial: { width: 0, opacity: 0 },
  open: { 
    width: "auto", 
    opacity: 1,
    transition: { 
      width: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      }
    }
  },
  closed: { 
    width: 0,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.2
      },
      width: {
        duration: 0.4,
        delay: 0.1,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  }
};

export default function Career() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const ProjectItem = ({ project, index }: { project: Project; index: number }) => {
    const isActive = activeIndex === index;

    return (
      <div 
        className="group relative flex flex-col md:flex-row items-start md:items-center justify-start w-full cursor-pointer border-t border-black/80 py-4 md:py-6 lg:py-8 transition-colors hover:bg-black/5"
        onMouseEnter={() => {
          setActiveIndex(index);
          setIsHovering(true);
        }} 
        onMouseLeave={() => {
          setActiveIndex(null);
          setIsHovering(false);
        }}
      >
        <div className="flex flex-wrap items-center gap-x-2 md:gap-x-3">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight m-0">
            {project.title1}
          </p>
          <motion.div 
            variants={imageAnimation} 
            initial="initial"
            animate={isActive ? "open" : "closed"} 
            className="hidden md:flex overflow-hidden items-center justify-start"
          >
            <img 
              src={project.src} 
              alt={`${project.title1} ${project.title2}`} 
              className="w-24 lg:w-32 xl:w-40 h-auto object-cover rounded-full"
            />
          </motion.div>
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight m-0">
            {project.title2}
          </p>
        </div>

        {/* Mobile Image */}
        <div className="md:hidden mt-4">
          <img 
            src={project.src} 
            alt={`${project.title1} ${project.title2}`} 
            className={`w-20 h-auto object-cover rounded-full transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-2 md:px-6 py-16 md:py-24 lg:py-32">
        <div className="space-y-8 md:space-y-12">
          {/* Header */}
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Recent Work
            </h2>
            <p className="text-sm text-gray-500 hidden md:block">
              Hover to explore
            </p>
          </div>

          {/* Project List */}
          <div className="relative">
            {projects.map((project, index) => (
              <ProjectItem key={index} project={project} index={index} />
            ))}
            <div className="border-b border-black/80" />

            {/* Decorative Elements */}
            <motion.div 
              className="hidden md:block absolute -right-4 top-0 w-1 h-full bg-black/10"
              animate={{
                opacity: isHovering ? 1 : 0.3
              }}
              transition={{
                duration: 0.3
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}