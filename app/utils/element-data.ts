// #app/utils/element-data.ts

// Skill Types and Data
export interface SkillData {
    id: string;
    color: string;
    title: string;
    description: string;
    skill: string;
  }
  
  const defaultSkill: SkillData = {
    id: "skill-1",
    color: "#30D158",
    title: "Python Development",
    description: "Expertise in building scalable applications with Python, focusing on Django and FastAPI frameworks",
    skill: "Backend Development"
  };
  
  export function skillData(): SkillData[] {
    return [
      defaultSkill,
      {
        id: "skill-2",
        color: "#32ADE6",
        title: "React & Next.js",
        description: "Creating modern web applications with React, Next.js, and TypeScript",
        skill: "Frontend Development"
      },
      {
        id: "skill-3",
        color: "#FFCC00",
        title: "Cloud Architecture",
        description: "Designing and implementing cloud-native solutions using AWS and Azure",
        skill: "Cloud Infrastructure"
      },
      {
        id: "skill-4",
        color: "#BF5AF2",
        title: "DevOps & CI/CD",
        description: "Setting up automated pipelines and maintaining development infrastructure",
        skill: "DevOps"
      },
      {
        id: "skill-5",
        color: "#FF9500",
        title: "Database Design",
        description: "Expertise in SQL and NoSQL database design and optimization",
        skill: "Database Management"
      },
      {
        id: "skill-6",
        color: "#FF375F",
        title: "System Architecture",
        description: "Designing scalable and maintainable system architectures",
        skill: "Architecture"
      }
    ];
  }
  
  // Career Types and Data
  export interface CareerData {
    id: string;
    color: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    responsibilities: string[];
  }
  
  const defaultCareer: CareerData = {
    id: "career-1",
    color: "#FF375F",
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Leading development of enterprise-scale applications and mentoring junior developers",
    responsibilities: [
      "Architecting scalable solutions",
      "Team leadership and mentoring",
      "Code review and quality assurance"
    ]
  };
  
  export function careerData(): CareerData[] {
    return [
      defaultCareer,
      {
        id: "career-2",
        color: "#32ADE6",
        title: "Full Stack Developer",
        company: "InnovateTech",
        location: "New York, NY",
        period: "2020 - 2022",
        description: "Developed and maintained multiple client-facing applications",
        responsibilities: [
          "Full-stack application development",
          "API design and implementation",
          "Performance optimization"
        ]
      },
      {
        id: "career-3",
        color: "#30D158",
        title: "Backend Developer",
        company: "DataFlow Systems",
        location: "Austin, TX",
        period: "2018 - 2020",
        description: "Built robust backend systems and microservices",
        responsibilities: [
          "Backend service development",
          "Database optimization",
          "System integration"
        ]
      },
      {
        id: "career-4",
        color: "#FFCC00",
        title: "Software Engineer",
        company: "CloudTech Inc",
        location: "Seattle, WA",
        period: "2016 - 2018",
        description: "Worked on cloud-based solutions and infrastructure",
        responsibilities: [
          "Cloud infrastructure development",
          "DevOps implementation",
          "Monitoring and logging"
        ]
      },
      {
        id: "career-5",
        color: "#BF5AF2",
        title: "Junior Developer",
        company: "StartUp Labs",
        location: "Boston, MA",
        period: "2015 - 2016",
        description: "Full-stack development for startup projects",
        responsibilities: [
          "Feature development",
          "Bug fixing",
          "Testing and documentation"
        ]
      },
      {
        id: "career-6",
        color: "#FF9500",
        title: "Software Engineer Intern",
        company: "Tech Innovations",
        location: "Chicago, IL",
        period: "2015",
        description: "Contributed to various development projects",
        responsibilities: [
          "Feature implementation",
          "Code maintenance",
          "Technical documentation"
        ]
      }
    ];
  }
  
  // Tech Stack Types and Data
  export interface StackData {
    id: string;
    color: string;
    category: string;
    title: string;
    description: string;
    technologies: string[];
    proficiency: number; // 0-100
  }
  
  const defaultStack: StackData = {
    id: "stack-1",
    color: "#30D158",
    category: "Frontend",
    title: "Modern Web Development",
    description: "Expertise in modern web technologies and frameworks",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    proficiency: 90
  };
  
  export function stackData(): StackData[] {
    return [
      defaultStack,
      {
        id: "stack-2",
        color: "#32ADE6",
        category: "Backend",
        title: "Server Development",
        description: "Building robust and scalable backend services",
        technologies: ["Python", "Node.js", "Django", "Express"],
        proficiency: 85
      },
      {
        id: "stack-3",
        color: "#FFCC00",
        category: "Database",
        title: "Data Management",
        description: "Database design and optimization",
        technologies: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
        proficiency: 80
      },
      {
        id: "stack-4",
        color: "#BF5AF2",
        category: "DevOps",
        title: "Infrastructure & Deployment",
        description: "Cloud infrastructure and CI/CD",
        technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
        proficiency: 75
      },
      {
        id: "stack-5",
        color: "#FF9500",
        category: "Testing",
        title: "Quality Assurance",
        description: "Testing and quality assurance tools",
        technologies: ["Jest", "Cypress", "PyTest", "Selenium"],
        proficiency: 85
      },
      {
        id: "stack-6",
        color: "#FF375F",
        category: "Tools",
        title: "Development Tools",
        description: "Development and productivity tools",
        technologies: ["Git", "VS Code", "Postman", "Jira"],
        proficiency: 90
      }
    ];
  }
  
  // Export default elements
  export const initialSkill = defaultSkill;
  export const initialCareer = defaultCareer;
  export const initialStack = defaultStack;
  
  // Utility type for all element types
  export type ElementData = SkillData | CareerData | StackData;
  
  // Export a function to get all data
  export function getAllData() {
    return {
      skills: skillData(),
      career: careerData(),
      stack: stackData()
    };
  }