// #app

import { motion, useScroll, useTransform} from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from '#app/interface/shadcn/avatar'



interface CenterCardProps {
  children: React.ReactNode;
}


export const SmoothScrollHero = () => {
  return (
    <div className="bg-background">
      <Hero />
    </div>
  );
};


const GreetingPill = () => {
  const { scrollY } = useScroll();

  const contentOpacity = useTransform(
    scrollY,
    [0, window.innerHeight / 2],
    [1, 0]
  );

  return (
    <div className="w-full h-full max-w-5xl  container px-2 md:px-6 flex flex-col items-start justify-center">
      {/* Available Now indicator */}
      <motion.div 
        className="flex items-center gap-2 mb-4 text-sm text-zinc-600"
        style={{ opacity: contentOpacity }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Available Now
      </motion.div>

      <div className="relative flex flex-col items-start">
        {/* Replace expanding background with static background */}
        <div 
          className="absolute bg-black/5 backdrop-blur-sm min-w-[200px] min-h-[48px] rounded-full z-10"
        />
        
        {/* Static content - highest z-index */}
        <div className="relative z-20 flex items-center gap-2 px-2 py-2">
          <Avatar className="!w-8 !h-8">
            <AvatarImage
              src="/marketing/avatar-dony.png"
              alt="Dony Alior"
              className="h-full w-full object-cover"
            />
            <AvatarFallback>TD</AvatarFallback>
          </Avatar>
          <span className="text-black text-md font-medium">
            Hi! I'm Dony Alior
          </span>
        </div>

        {/* Headline and Description - lowest z-index */}
        <motion.div 
          className="relative z-[5] text-left mt-6"
          style={{ opacity: contentOpacity }}
        >
          <h1 className="text-4xl md:text-7xl font-semibold text-zinc-900 mb-8">
            Product Engineer
          </h1>
          <p className="text-sm font-normal md:text-md text-zinc-600">
            Building Amazing Products.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const CenterCard = ({ children }: CenterCardProps) => {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(
    scrollY,
    [0, window.innerHeight / 2],
    [1, 0]
  );

  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div
      className="relative w-full h-screen"
    >
      <CenterCard>
        <GreetingPill />
      </CenterCard>
      <div className="absolute bottom-0 left-0 right-0 h-96 rounded-t-3xl to-zinc-950" />
    </div>
  );
};


