// app/utils/location-data.ts

export interface GradientStop {
  color: string;
  position: number;
}

export interface LocationData {
  gradient: {
    angle: number;
    stops: GradientStop[];
  };
  title: string;
  description: string;
  location: string;
  id: string; // Added for unique identification
}

const defaultLocation: LocationData = {
  gradient: {
    angle: 108,
    stops: [
      { color: "#0894FF", position: 0 },
      { color: "#C959DD", position: 34 },
      { color: "#FF2E54", position: 68 },
      { color: "#FF9004", position: 100 }
    ]
  },
  location: "Python",
  description: "The journey to Rich Coast typically starts in the is a country in the Central American region of North America.",
  title: "Skill One",
  id: "skill-1"
};

export function locationData(): LocationData[] {
  return [
    defaultLocation,
    {
      gradient: {
        angle: 135,
        stops: [
          { color: "#FF3CAC", position: 0 },
          { color: "#784BA0", position: 50 },
          { color: "#2B86C5", position: 100 }
        ]
      },
      title: "Skill Two",
      description: "Columbia Forest Products is North America's largest manufacturer of quality, decorative hardwood plywood and veneers for homes",
      location: "Python",
      id: "skill-2"
    },
    {
      gradient: {
        angle: 160,
        stops: [
          { color: "#FF416C", position: 0 },
          { color: "#FF4B2B", position: 100 }
        ]
      },
      title: "Skill Three",
      description: "From laid-back beachside luxury to the thrilling buzz of the city, every destination marches to its own beat.",
      location: "JavaScript",
      id: "skill-3"
    },
    {
      gradient: {
        angle: 90,
        stops: [
          { color: "#4158D0", position: 0 },
          { color: "#C850C0", position: 46 },
          { color: "#FFCC70", position: 100 }
        ]
      },
      title: "Skill Four",
      description: "A stunning ancient jungle city with hundreds of intricately constructed temples",
      location: "Java",
      id: "skill-4"
    },
    {
      gradient: {
        angle: 45,
        stops: [
          { color: "#8EC5FC", position: 0 },
          { color: "#E0C3FC", position: 100 }
        ]
      },
      title: "Skill Five",
      description: "Tropical beaches, volcano hikes, ancient temples, and friendly people",
      location: "C#",
      id: "skill-5"
    },
    {
      gradient: {
        angle: 45,
        stops: [
          { color: "#8EC5FC", position: 0 },
          { color: "#E0C3FC", position: 100 }
        ]
      },
      title: "Skill Six",
      description: "Tropical beaches, volcano hikes, ancient temples, and friendly people",
      location: "C++",
      id: "skill-6"
    }
  ];
}

export const initialData: LocationData = defaultLocation;