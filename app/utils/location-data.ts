export interface LocationData {
    img: string;
    title: string;
    description: string;
    location: string;
  }
  
  const defaultLocation: LocationData = {
    img: "https://images.unsplash.com/photo-1635657987551-1ff6d5a7efd7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Python",
    description: "The journey to Rich Coast typically starts in the is a country in the Central American region of North America.",
    title: "Skill One",
  };
  
  export function locationData(): LocationData[] {
    return [
      defaultLocation,
      {
        img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Skill Two",
        description: "Columbia Forest Products is North America's largest manufacturer of quality, decorative hardwood plywood and veneers for homes",
        location: "Python",
      },
      {
        img: "https://images.unsplash.com/photo-1608752027817-eaa02f60bf6d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Skill Three",
        description: "From laid-back beachside luxury to the thrilling buzz of the city, every destination marches to its own beat.",
        location: "JavaScript",
      },
      {
        img: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
        title: "Skill Four",
        description: "A stunning ancient jungle city with hundreds of intricately constructed temples",
        location: "Java",
      },
      {
        img: "https://images.unsplash.com/photo-1648620907826-b5cc6a05ada4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Skill Five",
        description: "Tropical beaches, volcano hikes, ancient temples, and friendly people",
        location: "C#",
      },
    ];
  }
  
  // Export the first item separately to ensure it's always defined
  export const initialData: LocationData = defaultLocation;