// #app/interface/composite/portfolio/skills.tsx

import { useScroll, useTransform, motion, useInView, type MotionValue, easeOut } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import * as React from "react"
import { cn } from '#app/utils/misc.js'

interface ComponentProps {
  scrollYProgress: MotionValue<number>;
}

interface SkillsContainerProps {
  children: React.ReactNode;
}

export const Skills = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  

  return (
    <>
      <section ref={targetRef} className="bg-secondary  h-[350vh]">
        <div className="h-screen sticky top-0 z-0 overflow-hidden">
          <SkillsContainer>
            <Copy scrollYProgress={scrollYProgress} />
            <div className="h-full w-full max-w-7xl mx-auto grid grid-rows-[2fr_2fr] gap-2">
              <Images scrollYProgress={scrollYProgress} />
            </div>
          </SkillsContainer>
        </div>
      </section>
    </>
  );
};

const Copy = ({ scrollYProgress }: ComponentProps) => {
  const copyRef = useRef(null);
  const isInView = useInView(copyRef, { amount: 0.3 });
  
  const copyScale = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.3, 0.8], 
    [1, 1, 1, 0.5], 
    { ease: easeOut }
  );
  
  const copyOpacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.3, 0.8], 
    [1, 1, 1, 0], 
    { ease: easeOut }
  );

  const copyZIndex = useTransform(
    scrollYProgress,
    [0.8, 1],
    [15, 0] // Set z-index to 0 when grid is closed
  );

  return (
    <motion.div
      ref={copyRef}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -100 }}
      transition={{ 
        duration: 1.2,
        y: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1]
        },
        opacity: {
          duration: 1,
          ease: [0.33, 1, 0.68, 1]
        }
      }}
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        zIndex: copyZIndex,
      }}
      className="absolute inset-0 px-8 w-full flex items-center justify-center"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -100 }}
        transition={{ 
          duration: 1,
          delay: 0.2,
          ease: [0.33, 1, 0.68, 1]
        }}
        className="text-inherit text-5xl md:text-7xl font-bold text-center max-w-xl"
      >
        Skills and Expertise
      </motion.h1>
    </motion.div>
  );
};

const Images = ({ scrollYProgress }: ComponentProps) => {
  const topLeft = useRef(null);
  const topRight = useRef(null);
  const bottomLeft = useRef(null);
  const bottomRight = useRef(null);

  const commonOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    [0, 1]
  );

  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.5, 1]);
  const topLeftX = useTransform(scrollYProgress, [0.2, 0.8], ["-25%", "0%"]);
  const topLeftY = useTransform(scrollYProgress, [0.2, 0.8], ["-20%", "0%"]);
  const topRightX = useTransform(scrollYProgress, [0.2, 0.8], ["25%", "0%"]);
  const topRightY = useTransform(scrollYProgress, [0.2, 0.8], ["20%", "0%"]);
  const bottomLeftX = useTransform(scrollYProgress, [0.2, 0.8], ["-25%", "0%"]);
  const bottomLeftY = useTransform(scrollYProgress, [0.2, 0.8], ["-40%", "0%"]);
  const bottomRightX = useTransform(scrollYProgress, [0.2, 0.8], ["25%", "0%"]);
  const bottomRightY = useTransform(scrollYProgress, [0.2, 0.8], ["20%", "0%"]);

  return (
    <>
      <div className="h-svh grid grid-cols-5 gap-2 px-2 md:px-4 py-4 md:py-10">
        {/* Top Row */}
        <div className="col-span-5 md:col-span-3 h-full md:block flex">
          <motion.div
            ref={topLeft}
            className="flex-1 h-full"
            style={{
              zIndex: 20,
              scale,
              x: topLeftX,
              y: topLeftY,
              opacity: commonOpacity
            }}
          >
            <SkillCardOne scrollYProgress={scrollYProgress} />
          </motion.div>
          
          <motion.div
            ref={topRight}
            className="flex-1 h-full md:hidden"
            style={{
              zIndex: 20,
              scale,
              x: topRightX,
              y: topRightY,
              opacity: commonOpacity
            }}
          >
            <SkillCardTwo scrollYProgress={scrollYProgress} />
          </motion.div>
        </div>

        <motion.div
          ref={topRight}
          className="hidden md:block col-span-2 h-full"
          style={{
            zIndex: 20,
            scale,
            x: topRightX,
            y: topRightY,
            opacity: commonOpacity
          }}
        >
          <SkillCardTwo scrollYProgress={scrollYProgress} />
        </motion.div>
        
        {/* Bottom Row */}
        <div className="col-span-5 md:col-span-2 h-full md:block flex">
          <motion.div
            ref={bottomLeft}
            className="flex-1 h-full"
            style={{
              zIndex: 20,
              scale,
              x: bottomLeftX,
              y: bottomLeftY,
              opacity: commonOpacity
            }}
          >
            <SkillCardThree scrollYProgress={scrollYProgress} />
          </motion.div>
          
          <motion.div
            ref={bottomRight}
            className="flex-1 h-full md:hidden"
            style={{
              zIndex: 20,
              scale,
              x: bottomRightX,
              y: bottomRightY,
              opacity: commonOpacity
            }}
          >
            <SkillCardFour scrollYProgress={scrollYProgress} />
          </motion.div>
        </div>

        <motion.div
          ref={bottomRight}
          className="hidden md:block col-span-3 h-full"
          style={{
            zIndex: 20,
            scale,
            x: bottomRightX,
            y: bottomRightY,
            opacity: commonOpacity
          }}
        >
          <SkillCardFour scrollYProgress={scrollYProgress} />
        </motion.div>
      </div>
    </>
  );
};

const SkillCardOne = ({ scrollYProgress }: ComponentProps) => {
  const [removeRightBorder, setRemoveRightBorder] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setRemoveRightBorder(latest > 0.7);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <Card className={cn(
      "h-full",
      removeRightBorder && "max-md:rounded-r-none max-md:border-r-0 max-md:shadow-none"
    )}>
      <CardHeader>
        <CardTitle>Frontend Development</CardTitle>
        <CardDescription>Modern web technologies and frameworks</CardDescription>
      </CardHeader>
      <CardContent>
        React, Next.js, TypeScript, Tailwind CSS
      </CardContent>
    </Card>
  );
};

const SkillCardTwo = ({ scrollYProgress }: ComponentProps) => {
  const [removeLeftBorder, setRemoveLeftBorder] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setRemoveLeftBorder(latest > 0.7);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <Card className={cn(
      "h-full",
      removeLeftBorder && "max-md:rounded-l-none max-md:border-l-0 max-md:shadow-none"
    )}>
      <CardHeader>
        <CardTitle>Backend Development</CardTitle>
        <CardDescription>Server-side technologies</CardDescription>
      </CardHeader>
      <CardContent>
        Node.js, Express, PostgreSQL, REST APIs
      </CardContent>
    </Card>
  );
};

const SkillCardThree = ({ scrollYProgress }: ComponentProps) => {
  const [removeRightBorder, setRemoveRightBorder] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setRemoveRightBorder(latest > 0.7);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <Card className={cn(
      "h-full",
      removeRightBorder && "max-md:rounded-r-none max-md:border-r-0 max-md:shadow-none"
    )}>
      <CardHeader>
        <CardTitle>UI/UX Design</CardTitle>
        <CardDescription>Design and user experience</CardDescription>
      </CardHeader>
      <CardContent>
        Figma, Adobe XD, Responsive Design
      </CardContent>
    </Card>
  );
};

const SkillCardFour = ({ scrollYProgress }: ComponentProps) => {
  const [removeLeftBorder, setRemoveLeftBorder] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setRemoveLeftBorder(latest > 0.7);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <Card className={cn(
      "h-full",
      removeLeftBorder && "max-md:rounded-l-none max-md:border-l-0 max-md:shadow-none"
    )}>
      <CardHeader>
        <CardTitle>DevOps & Tools</CardTitle>
        <CardDescription>Development operations and tooling</CardDescription>
      </CardHeader>
      <CardContent>
        Git, Docker, CI/CD, AWS
      </CardContent>
    </Card>
  );
};

// StickyContainer now only handles the initial sticky state with copy
const SkillsContainer = ({ children }: SkillsContainerProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Adjust scale to include exit animation
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.85, 1, 1, 0.85]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ["3rem", "0rem", "0rem", "3rem"]
  );


  return (
    <motion.div
      style={{
        scale,
        borderRadius,
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

