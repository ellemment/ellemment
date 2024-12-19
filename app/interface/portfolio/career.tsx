import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LinksFunction } from '@remix-run/node';

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

const anim = {
  initial: { width: 0 },
  open: { 
    width: "auto", 
    transition: { 
      duration: 0.4, 
      ease: [0.23, 1, 0.32, 1] 
    }
  },
  closed: { width: 0 }
};

export default function Career() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const ProjectItem = ({ project, index }: { project: Project; index: number }) => {
    const isActive = activeIndex === index;

    return (
      <div 
        className="flex items-center justify-start w-full cursor-pointer border-t-2 border-black py-[0.8vw]"
        onMouseEnter={() => setActiveIndex(index)} 
        onMouseLeave={() => setActiveIndex(null)}
      >
        <p className="text-[3vw] m-0 mr-[0.75vw]">{project.title1}</p>
        <motion.div 
          variants={anim} 
          animate={isActive ? "open" : "closed"} 
          className="overflow-hidden flex justify-start w-0"
        >
          <img 
            src={project.src} 
            alt={`${project.title1} ${project.title2}`} 
            className="w-[10vw] h-auto object-cover"
          />
        </motion.div>
        <p className="text-[3vw] m-0 ml-[0.75vw]">{project.title2}</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen p-8">
      <div className="w-full max-w-5xl mx-auto">
        <p className="text-3xl font-medium mb-24">Recent Work</p>
        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} index={index} />
        ))}
        <div className="border-b-2 border-black" />
      </div>
    </div>
  );
}