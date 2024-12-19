import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Project {
  title1: string;
  title2: string;
  src: string;
  location: string;
  date: string;
}

const projects: Project[] = [
  {
    title1: "Product",
    title2: "Development Manager",
    src: "/logos.png",
    location: "Tokyo, Japan",
    date: "2024"
  },
  {
    title1: "Senior",
    title2: "Product Engineer",
    src: "/logos.png",
    location: "Tokyo, Japan",
    date: "2024"
  },
  {
    title1: "Senior",
    title2: "Data Scientist",
    src: "/logos.png",
    location: "Tokyo, Japan",
    date: "2024"
  },
  {
    title1: "Web",
    title2: "Developer",
    src: "/logos.png",
    location: "Tokyo, Japan",
    date: "2024"
  },
];

const imageAnimation = {
  initial: { width: 0, opacity: 0, margin: 0 },
  open: { 
    width: "auto", 
    opacity: 1,
    margin: "0 0.5rem",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
  },
  closed: { 
    width: 0,
    opacity: 0,
    margin: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
  }
};

export default function Career() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1.2, 0.8]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.15, 0.08]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Header text based on screen size
  const [interactionText, setInteractionText] = useState('Hover to explore');

  useEffect(() => {
    const updateInteractionText = () => {
      setInteractionText(window.innerWidth <= 768 ? 'Click to reveal' : 'Hover to explore');
    };

    updateInteractionText();
    window.addEventListener('resize', updateInteractionText);
    return () => window.removeEventListener('resize', updateInteractionText);
  }, []);

  if (!isMounted) {
    return null; // or a loading state
  }

  const ProjectItem = ({ project, index }: { project: Project; index: number }) => {
    const isActive = activeIndex === index;

    return (
      <div 
        className="relative flex flex-col md:flex-row items-start justify-between w-full cursor-pointer border-b border-black/70"
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <div className="flex flex-row items-start md:items-center justify-between gap-2 py-12 md:py-16 w-full">
          <motion.div 
            className="flex flex-col md:flex-row items-start md:items-center"
            animate={{ 
              scale: isActive ? 0.95 : 1,
              width: isActive ? "85%" : "100%"
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-1 md:gap-2 w-full">
              <p className={`text-xl md:text-2xl lg:text-4xl font-medium tracking-tight transition-all duration-300 ${
                isActive ? 'text-lg md:text-xl lg:text-2xl' : ''
              }`}>
                {project.title1}
              </p>
              <motion.div 
                variants={imageAnimation} 
                initial="initial"
                animate={isActive ? "open" : "closed"} 
                className="overflow-hidden flex items-center justify-start w-0 flex-shrink-0 flex-grow-0"
              >
                <img 
                  src={project.src} 
                  alt={`${project.title1} ${project.title2}`} 
                  className="w-16 md:w-20 lg:w-24 h-auto object-cover rounded-sm"
                />
              </motion.div>
              <p className={`text-xl md:text-2xl lg:text-4xl font-medium tracking-tight transition-all duration-300 ${
                isActive ? 'text-lg md:text-xl lg:text-2xl' : ''
              }`}>
                {project.title2}
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-3 text-sm text-gray-500 mt-2 md:mt-0 whitespace-nowrap">
            <span>{project.location}</span>
            <span>{project.date}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-2 md:px-6 py-24 md:py-32 relative">
        {/* Background Title */}
        <motion.h2 
          className="absolute -top-8 md:-top-12 left-0 text-[8rem] md:text-[12rem] font-medium tracking-tight text-black/[0.03] pointer-events-none select-none"
          style={{ 
            scale: headerScale,
            opacity: headerOpacity,
            transformOrigin: 'left top'
          }}
        >
          Background
        </motion.h2>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-16 md:mb-24">
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-gray-500">
              Background
            </h2>
            <p className="text-sm text-gray-500">
              {interactionText}
            </p>
          </div>

          {/* Project List */}
          <div className="relative [&>*:last-child]:border-b-0">
            {projects.map((project, index) => (
              <ProjectItem key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}