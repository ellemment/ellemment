import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '#app/interface/shadcn/card';

// Types
export interface ScrollCardProps {
  variant: 'one' | 'two' | 'three' | 'four' | 'five' | 'six';
}

const ScrollCardOne = () => (
    <>
      <CardHeader className="relative z-10 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Modern Architecture
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex-grow">
        <div className="h-full flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-secondary/20 blur-lg" />
        </div>
      </CardContent>
  
      <CardFooter className="relative z-10 mt-auto">
        <div className="w-full">
          <CardDescription className="text-base font-medium text-primary/80">
            Exploring contemporary design principles
          </CardDescription>
          <div className="mt-2 h-1 w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </CardFooter>
  
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </>
  );
  
  const ScrollCardTwo = () => (
    <>
      <CardHeader className="relative z-10 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Card Two
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex-grow">
        <div className="h-full flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-secondary/20 blur-lg" />
        </div>
      </CardContent>
  
      <CardFooter className="relative z-10 mt-auto">
        <div className="w-full">
          <CardDescription className="text-base font-medium text-primary/80">
            Contents
          </CardDescription>
          <div className="mt-2 h-1 w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </CardFooter>
  
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </>
  );
  
  const ScrollCardThree = () => (
    <>
      <CardHeader className="relative z-10 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Card Three
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex-grow">
        <div className="h-full flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-secondary/20 blur-lg" />
        </div>
      </CardContent>
  
      <CardFooter className="relative z-10 mt-auto">
        <div className="w-full">
          <CardDescription className="text-base font-medium text-primary/80">
            Contents
          </CardDescription>
          <div className="mt-2 h-1 w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </CardFooter>
  
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </>
  );
  
  const ScrollCardFour = () => (
    <>
      <CardHeader className="relative z-10 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Card Four
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex-grow">
        <div className="h-full flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-secondary/20 blur-lg" />
        </div>
      </CardContent>
  
      <CardFooter className="relative z-10 mt-auto">
        <div className="w-full">
          <CardDescription className="text-base font-medium text-primary/80">
            Contents
          </CardDescription>
          <div className="mt-2 h-1 w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </CardFooter>
  
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </>
  );
  
  const ScrollCardFive = () => (
    <>
      <CardHeader className="relative z-10 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Card Five
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex-grow">
        <div className="h-full flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-secondary/20 blur-lg" />
        </div>
      </CardContent>
  
      <CardFooter className="relative z-10 mt-auto">
        <div className="w-full">
          <CardDescription className="text-base font-medium text-primary/80">
            Contents
          </CardDescription>
          <div className="mt-2 h-1 w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </CardFooter>
  
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </>
  );
  
  const ScrollCardSix = () => (
    <>
      <CardHeader className="relative z-10 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Card Six
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex-grow">
        <div className="h-full flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-secondary/20 blur-lg" />
        </div>
      </CardContent>
  
      <CardFooter className="relative z-10 mt-auto">
        <div className="w-full">
          <CardDescription className="text-base font-medium text-primary/80">
            Contents
          </CardDescription>
          <div className="mt-2 h-1 w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </CardFooter>
    </>
  );
  
  // Card Variants Configuration
  const CARD_VARIANTS = {
    one: {
      id: 'scroll-card-1',
      containerClasses: "border-0",
      innerContent: () => <ScrollCardOne />
    },
    two: {
      id: 'scroll-card-2',
      containerClasses: "border-0",
      innerContent: () => <ScrollCardTwo />
    },
    three: {
      id: 'scroll-card-3',
      containerClasses: "border-0",
      innerContent: () => <ScrollCardThree />
    },
    four: {
      id: 'scroll-card-4',
      containerClasses: "border-0",
      innerContent: () => <ScrollCardFour />
    },
    five: {
      id: 'scroll-card-5',
      containerClasses: "border-0",
      innerContent: () => <ScrollCardFive />
    },
    six: {
      id: 'scroll-card-6',
      containerClasses: "border-0",
      innerContent: () => <ScrollCardSix />
    }
  };

// Base ScrollCard Component
export const ScrollCard: React.FC<ScrollCardProps> = ({ variant }) => {
  const variantConfig = CARD_VARIANTS[variant];
  
  return (
    <Card className={`
      group relative overflow-hidden
      w-[85vw] sm:w-[45vw] lg:w-[30vw] 
      aspect-[26/33]
      ${variantConfig.containerClasses}
    `}>
      {variantConfig.innerContent()}
    </Card>
  );
};

export const cardOrder = ['one', 'two', 'three', 'four', 'five', 'six'] as const; 

