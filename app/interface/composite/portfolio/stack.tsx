// #app/interface/composite/portfolio/stack.tsx


import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform, type MotionValue,  useInView } from "framer-motion";
import React, { useRef } from "react";
import { cn } from '#app/utils/misc.js'


interface CarouselCard {
  id: number;
  url: string;
  title: string;
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


const ScrollCardOne = ({ card }: { card: CarouselCard }) => {
  return (
    <Card className="group relative w-[450px] aspect-[26/33] overflow-hidden border-0">
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <CardHeader className="absolute bottom-0 text-white z-10">
        <CardTitle className="text-3xl">{card.title}</CardTitle>
        <CardDescription className="text-gray-200">
          Project Description Here
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const ScrollCardTwo = ({ card }: { card: CarouselCard }) => {
  return (
    <Card className="group relative aspect-[26/33] overflow-hidden bg-secondary/80 backdrop-blur-sm border-2">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
      <CardHeader className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
        <CardTitle className="text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {card.title}
        </CardTitle>
        <CardDescription className="max-w-[80%] text-base">
          Interactive Project Description
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const ScrollCardThree = ({ card }: { card: CarouselCard }) => {
  return (
    <Card className="group relative w-[450px] aspect-[26/33] overflow-hidden border-primary/50 border-2">
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl">{card.title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
        </div>
        <CardDescription className="mt-auto">
          Project Description Here
        </CardDescription>
      </div>
    </Card>
  );
};

const ScrollCardFour = ({ card }: { card: CarouselCard }) => {
  return (
    <Card className="group relative w-[450px] aspect-[26/33] overflow-hidden bg-background">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        <div className="bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
        <div className="bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300" />
        <div className="bg-primary/15 group-hover:bg-primary/20 transition-colors duration-300" />
        <div className="bg-primary/20 group-hover:bg-primary/25 transition-colors duration-300" />
      </div>
      <CardHeader className="relative z-10 h-full flex flex-col justify-center items-center">
        <CardTitle className="text-3xl mb-2">{card.title}</CardTitle>
        <CardDescription className="text-center max-w-[80%]">
          Project Description Here
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const ScrollCardFive = ({ card }: { card: CarouselCard }) => {
  return (
    <Card className="group relative w-[450px] aspect-[26/33] overflow-hidden border-0 bg-gradient-to-br from-background to-secondary">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        <CardTitle className="text-3xl">{card.title}</CardTitle>
        <CardDescription className="text-lg">
          Project Description Here
        </CardDescription>
      </div>
    </Card>
  );
};

const ScrollCardSix = ({ card }: { card: CarouselCard }) => {
  return (
    <Card className="group relative w-[450px] aspect-[26/33] overflow-hidden border-2 border-dashed border-primary/30">
      <div className="absolute inset-0 bg-secondary/50" />
      <div className="relative z-10 h-full p-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <CardTitle className="text-4xl mb-4">{card.title}</CardTitle>
          <CardDescription className="max-w-[80%]">
            Project Description Here
          </CardDescription>
        </div>
        <div className="mt-auto flex justify-end">
          <div className="h-12 w-12 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-all duration-300 group-hover:scale-110" />
        </div>
      </div>
    </Card>
  );
};



const carouselCards = [
  {
    url: "/imgs/abstract/1.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/imgs/abstract/2.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/imgs/abstract/3.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Title 6",
    id: 6,
  },
]; 


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


const HorizontalCardScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-50%"]);

  const getCardComponent = (index: number) => {
    switch (index % 6) {
      case 0:
        return ScrollCardOne;
      case 1:
        return ScrollCardTwo;
      case 2:
        return ScrollCardThree;
      case 3:
        return ScrollCardFour;
      case 4:
        return ScrollCardFive;
      case 5:
        return ScrollCardSix;
      default:
        return ScrollCardOne;
    }
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-4">
          {carouselCards.map((card, index) => {
            const CardComponent = getCardComponent(index);
            return <CardComponent card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
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


const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-background text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
