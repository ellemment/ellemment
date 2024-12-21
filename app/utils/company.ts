// app/utils/location-data.ts

export interface LocationData {
    color: string;
    title: string;
    description: string;
    location: string;
    id: string;
  }
  
  const defaultLocation: LocationData = {
    color: "#30D158",
    title: "Python Development",
    description: "Expertise in building scalable applications with Python, focusing on Django and FastAPI frameworks",
    location: "Backend Development",
    id: "skill-1"
  };
  
  export function locationData(): LocationData[] {
    return [
      defaultLocation,
      {
        color: "#32ADE6",
        title: "React & Next.js",
        description: "Creating modern web applications with React, Next.js, and TypeScript",
        location: "Frontend Development",
        id: "skill-2"
      },
      {
        color: "#FFCC00",
        title: "Cloud Architecture",
        description: "Designing and implementing cloud-native solutions using AWS and Azure",
        location: "Cloud Infrastructure",
        id: "skill-3"
      },
      {
        color: "#BF5AF2",
        title: "DevOps & CI/CD",
        description: "Setting up automated pipelines and maintaining development infrastructure",
        location: "DevOps",
        id: "skill-4"
      },
      {
        color: "#FF9500",
        title: "Database Design",
        description: "Expertise in SQL and NoSQL database design and optimization",
        location: "Database Management",
        id: "skill-5"
      },
      {
        color: "#FF375F",
        title: "System Architecture",
        description: "Designing scalable and maintainable system architectures",
        location: "Architecture",
        id: "skill-6"
      }
    ];
  }
  
  export const initialData: LocationData = defaultLocation;