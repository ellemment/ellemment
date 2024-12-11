import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useInView, type MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '#app/interface/shadcn/card';

interface ScrollCardProps {
  variant: 'one' | 'two' | 'three' | 'four' | 'five' | 'six';
}

interface ComponentProps {
  scrollYProgress: MotionValue<number>;
}

interface ParallaxContentProps {
  children: React.ReactNode;
}

interface StackContainerProps {
  children: React.ReactNode;
}



const Copy = ({ scrollYProgress }: ComponentProps) => {
  const copyRef = useRef(null);
  const isInView = useInView(copyRef, { amount: 0.3 });
  
  const copyOpacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.35],
    [1, 1, 0]
  );
  
  return (
    <motion.div
      ref={copyRef}
      style={{
        opacity: copyOpacity,
      }}
      className="absolute inset-0 px-8 w-full z-50 flex items-center justify-center"
    >
      <h1 className="text-inherit z-50 text-5xl md:text-7xl font-bold text-center max-w-xl">
        How it is built message
      </h1>
    </motion.div>
  );
};

// Individual Card Components
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
const ScrollCard: React.FC<ScrollCardProps> = ({ variant }) => {
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

const cardOrder = ['one', 'two', 'three', 'four', 'five', 'six'] as const;

export const HorizontalCardScroll: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", "-95%"]
  );

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          style={{ x }} 
          className="flex gap-4 md:gap-4 px-4 md:px-6 lg:px-8"
        >
          {cardOrder.map((variant) => (
            <ScrollCard
              key={CARD_VARIANTS[variant].id}
              variant={variant}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalCardScroll;

export const StackSection = () => {
  return (
    <div className="bg-secondary">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <ParallaxContainer />
      </ReactLenis>
    </div>
  );
};


export const ParallaxContainer = () => {
  const containerRef = useRef(null);
  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
  });

  return (
    <div ref={containerRef} className="bg-secondary">
      <ParallaxContent>
        {/* First section: Sticky container with copy */}
        <StackContainer>
          <Copy scrollYProgress={containerProgress} />
        </StackContainer>
        
        {/* Second section: Cards reveal and horizontal scroll */}
        <CardsSection />
      </ParallaxContent>
    </div>
  );
};

// New component to handle cards reveal and scroll
const CardsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });


  
  // Controls the vertical reveal of the entire cards section
  const y = useTransform(
    sectionProgress,
    [0, 0.1, 0.15],
    ["100%", "100%", "0%"]
  );

  const opacity = useTransform(
    sectionProgress,
    [0, 0.1, 0.15],
    [0, 0, 1]
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{ y, opacity }}
      className="relative"
    >
      <HorizontalCardScroll />
    </motion.div>
  );
};

// Update ParallaxContent to handle the full height needed
const ParallaxContent = ({ children }: ParallaxContentProps) => {
  return (
    <div>
      <div className="relative h-[400vh] bg-secondary">
        {children}
      </div>
    </div>
  );
};

// StickyContainer now only handles the initial sticky state with copy
const StackContainer = ({ children }: StackContainerProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Adjust scale to include exit animation
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1], // Added midpoint and exit point
    [0.80, 1, 1, 1] // Scale back to 0.85 at exit
  );


  return (
    <motion.div
      style={{
        scale,
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
      ref={targetRef}
      className="z-0 overflow-hidden bg-secondary flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

