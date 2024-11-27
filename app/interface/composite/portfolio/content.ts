// #app/interface/composite/portfolio/landing.ts

export const overviewContent = {
  role: "Product Engineer.",
  greeting: "",
  name: "Dony Alior.",
  description: "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.",
  button: {
    text: "Get CV",
    href: "#" 
  },
  social: {
    containerStyles: "flex gap-6",
    iconStyles: "w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
  }
} as const;

export const overviewStats = {
  items: [
    {
      num: 9,
      text: "Technologies",
    },
    {
      num: 9,
      text: "Experience",
    },
    {
      num: 99,
      text: "Projects",
    },
    {
      num: 999,
      text: "Commits",
    },
  ],
  config: {
    duration: 5,
    delay: 2,
    styles: {
      number: "text-4xl xl:text-6xl font-extrabold",
      text: (length: number) => `${
        length < 15 ? "max-w-[100px]" : "max-w-[150px]"
      } leading-snug text-inherit/80`
    }
  }
} as const;

export const skillsContent = {
  title: "Skills",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  skillList: [
    { name: "TypeScript" },
    { name: "Tailwind" },
    { name: "Prisma" },
    { name: "Remix" },
    { name: "GitHub" },
    { name: "Docker" },
  ] as const,
} as const;

export const experienceContent = {
  title: "Experience",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  items: [
    {
      company: "Tech Solutions Inc.",
      position: "Full Stack Developer",
      duration: "2022 - Present",
    },
    {
      company: "Web Design Studio",
      position: "Front-End Developer",
      duration: "2020 - 2021",
    },
    {
      company: "Digital Agency",
      position: "UI/UX Designer",
      duration: "2018 - 2020",
    },
  ],
} as const;

export const servicesContent = {
  items: [
    {
      num: "01",
      title: "Web Development",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque tenetur.",
      href: "",
    },
    {
      num: "02",
      title: "UI/UX Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque tenetur.",
      href: "",
    },
    {
      num: "03",
      title: "Product Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque tenetur.",
      href: "",
    },
    {
      num: "04",
      title: "Product Development",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque tenetur.",
      href: "",
    },
  ]
} as const;

export const workContent = {
  projects: [
    {
      num: "01",
      category: "frontend",
      title: "project 1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magnam modi.",
      stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "Javascript" }],
      image: "/assets/work/thumb1.png",
      live: "",
      github: "",
    },
    {
      num: "02",
      category: "fullstack",
      title: "project 2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magnam modi.",
      stack: [{ name: "Next.js" }, { name: "Tailwind.css" }, { name: "Node.js" }],
      image: "/assets/work/thumb2.png",
      live: "",
      github: "",
    },
    {
      num: "03",
      category: "frontend",
      title: "project 3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magnam modi.",
      stack: [{ name: "Next.js" }, { name: "Tailwind.css" }],
      image: "/assets/work/thumb3.png",
      live: "",
      github: "",
    },
  ],
  defaultProject: {
    num: "01",
    category: "default",
    title: "Default Project",
    description: "Default description",
    stack: [{ name: "Default Stack" }],
    image: "/assets/default.png",
    live: "",
    github: "",
  }
} as const;

