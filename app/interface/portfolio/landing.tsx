// #app

import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { Icon } from '#app/interface/foundations/icons/icon'
import { Avatar, AvatarImage, AvatarFallback } from '#app/interface/shadcn/avatar'


// Add TypeScript interfaces for the components
interface ParallaxCardProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

interface CompanyProps {
  title: string;
  date: string;
  location: string;
}

interface CenterCardProps {
  children: React.ReactNode;
}


export const SmoothScrollHero = () => {
  return (
    <div className="bg-background">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
        <Career />
      </ReactLenis>
    </div>
  );
};


const SECTION_HEIGHT = 1500;

const GreetingPill = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    [1, 30]
  );

  const y = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    [0, 0]
  );

  const borderRadius = useTransform(
    scrollY,
    [0, SECTION_HEIGHT / 2],
    ['100px', '0px']  
  );

  const contentOpacity = useTransform(
    scrollY,
    [0, SECTION_HEIGHT / 4],
    [1, 0]
  );

  return (
    <div className="relative flex flex-col items-center">
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

      <div className="relative flex flex-col items-center">
        {/* Expanding background - middle z-index */}
        <motion.div 
          className="absolute bg-black/5 backdrop-blur-sm min-w-[200px] min-h-[48px] z-10"
          style={{
            scale,
            borderRadius,
            transformOrigin: 'center center',
            y
          }}
        />
        
        {/* Static content - highest z-index */}
        <div className="relative z-20 flex items-center gap-2 px-4 py-2">
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
          className="relative z-[5] text-center mt-6"
          style={{ opacity: contentOpacity }}
        >
          <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 mb-8">
            Product Engineer
          </h1>
          <p className="text-md md:text-xl text-zinc-600">
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
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
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
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterCard>
        <GreetingPill />
      </CenterCard>
      <ParallaxCards />
      <div className="absolute bottom-0 left-0 right-0 h-96 rounded-t-3xl to-zinc-950" />
    </div>
  );
};

const ParallaxCards = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxCard
        src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxCard
        src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxCard
        src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
    </div>
  );
};

const ParallaxCard = ({ className, alt, src, start, end }: ParallaxCardProps) => {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Career = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-inherit"
    >
      <Company title="NG-21" date="Dec 9th" location="Florida" />
      <Company title="Starlink" date="Dec 20th" location="Texas" />
      <Company title="Starlink" date="Jan 13th" location="Florida" />
      <Company title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <Company title="NROL-186" date="Mar 1st" location="California" />
      <Company title="GOES-U" date="Mar 8th" location="California" />
      <Company title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

const Company = ({ title, date, location }: CompanyProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-inherit">{title}</p>
        <p className="text-sm uppercase text-inherit/50">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-inherit/50">
        <p>{location}</p>
        <Icon name="map-pin" className="w-4 h-4"></Icon>
      </div>
    </motion.div>
  );
};


