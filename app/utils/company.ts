// app/utils/location-data.ts

export interface LocationData {
  background: {
    type: 'solid' | 'gradient' | 'radial';
    colors: string | [string, string];
    noiseOptions?: {
      baseFrequency?: number;
      numOctaves?: number;
      opacity?: number;
    };
  };
  title: string;
  description: string;
  location: string;
  id: string;
}

const defaultLocation: LocationData = {
  background: {
    type: 'solid',
    colors: ['rgba(0,0,255,1)', 'rgba(12,226,239,1)'],
    noiseOptions: {
      baseFrequency: 0.6,
      numOctaves: 3,
      opacity: 0.8
    }
  },
  title: "Python Development",
  description: "Expertise in building scalable applications with Python, focusing on Django and FastAPI frameworks",
  location: "Backend Development",
  id: "skill-1"
};

export function locationData(): LocationData[] {
  return [
    defaultLocation,
    {
      background: {
        type: 'radial',
        colors: ['rgba(0,0,255,1)', 'rgba(12,226,239,1)'],
        noiseOptions: {
          baseFrequency: 0.65,
          numOctaves: 4,
          opacity: 0.7
        }
      },
      title: "React & Next.js",
      description: "Creating modern web applications with React, Next.js, and TypeScript",
      location: "Frontend Development",
      id: "skill-2"
    },
    {
      background: {
        type: 'gradient',
        colors: ['rgba(0,0,255,1)', 'rgba(12,226,239,1)'],
        noiseOptions: {
          baseFrequency: 0.5,
          numOctaves: 2,
          opacity: 0.6
        }
      },
      title: "Cloud Architecture",
      description: "Designing and implementing cloud-native solutions using AWS and Azure",
      location: "Cloud Infrastructure",
      id: "skill-3"
    },
    {
      background: {
        type: 'radial',
        colors: ['rgba(0,0,255,1)', 'rgba(12,226,239,1)'],
        noiseOptions: {
          baseFrequency: 0.7,
          numOctaves: 3,
          opacity: 0.5
        }
      },
      title: "DevOps & CI/CD",
      description: "Setting up automated pipelines and maintaining development infrastructure",
      location: "DevOps",
      id: "skill-4"
    },
    {
      background: {
        type: 'gradient',
        colors: ['rgba(0,0,255,1)', 'rgba(12,226,239,1)'],
        noiseOptions: {
          baseFrequency: 0.55,
          numOctaves: 4,
          opacity: 0.75
        }
      },
      title: "Database Design",
      description: "Expertise in SQL and NoSQL database design and optimization",
      location: "Database Management",
      id: "skill-5"
    },
    {
      background: {
        type: 'radial',
        colors: ['rgba(0,0,255,1)', 'rgba(12,226,239,1)'],
        noiseOptions: {
          baseFrequency: 0.45,
          numOctaves: 5,
          opacity: 0.65
        }
      },
      title: "System Architecture",
      description: "Designing scalable and maintainable system architectures",
      location: "Architecture",
      id: "skill-6"
    }
  ];
}

export const initialData: LocationData = defaultLocation;