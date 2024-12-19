import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Line from './message';


const caseStudies = [
  {
    id: 1,
    subtitle: "Curology",
    title: "A custom formula for your skin's unique needs",
    img: "curology-min"
  },
  {
    id: 2,
    subtitle: "Yourspace",
    title: "Open space floor plans for you next venture",
    img: "yourspace-min"
  },
  {
    id: 3,
    subtitle: "Lumin",
    title: "For your best look ever",
    img: "lumin-min"
  }
];

const IntroOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none">
    <motion.div 
      className="h-full relative"
      initial={false}
    >
      <motion.div
        className="absolute h-full w-full bg-black"
        initial={{ height: "100%" }}
        animate={{ height: 0 }}
        transition={{ 
          duration: 2.4, 
          ease: [0.87, 0, 0.13, 1],
          delay: 2.0
        }}
      />
      <div className="absolute top-0 w-full h-1/2">
        <motion.div 
          className="flex flex-col justify-center max-w-5xl px-2 md:px-6 mx-auto h-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ 
            duration: 2.4, 
            ease: [0.87, 0, 0.13, 1],
            delay: 2.0
          }}
        >
          <h2 className="text-5xl font-semibold leading-tight relative z-25 text-white overflow-hidden">
            <div className="h-14 mb-4 relative overflow-hidden">
              <motion.span 
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.87, 0, 0.13, 1],
                  delay: 0.4
                }}
              >
                Product Engineer
              </motion.span>
            </div>
            <div className="h-14 mb-2 leading-tight relative z-25 text-white overflow-hidden">
              <motion.span 
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.87, 0, 0.13, 1],
                  delay: 0.6
                }}
              >
                - Dony Alior
              </motion.span>
            </div>
          </h2>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

const Banner = () => {
  return (
    <section className="h-[50vh] relative">
      <motion.div 
        className="w-full mx-auto h-full bg-white"
        initial={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex flex-col justify-center max-w-5xl px-2 md:px-6 mx-auto h-full">
          <h2 className="text-5xl font-semibold leading-tight relative z-25">
            <div className="h-14 mb-4 relative">
              <span className="block">
                Product Engineer
              </span>
            </div>
        
          </h2>
          <div className="relative z-10 w-64">
            <a href="/" className="flex items-center text-md font-medium group">
              Get in touch 
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};



interface Dimensions {
  width: number;
  height: number;
}

interface LandingProps {
  dimensions: Dimensions;
}

const Landing = ({ dimensions }: LandingProps) => {
  useEffect(() => {
    let vh = dimensions.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [dimensions.height]);

  return (
    <div className="relative h-screen bg-white">
      <IntroOverlay />
      <Banner />
      <Line />
    </div>
  );
};

export default Landing;