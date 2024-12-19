import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Line from './message';

// Animation variants remain the same
const fadeUpVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1]
    }
  }
};

const fadeOutVariants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: {
      duration: 2.4,
      ease: [0.87, 0, 0.13, 1],
      delay: 2.0
    }
  }
};

const IntroOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none">
    <motion.div className="h-full relative" initial={false}>
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
          className="flex flex-col justify-center max-w-5xl mx-auto h-full px-2 md:px-6"
          variants={fadeOutVariants}
          initial="visible"
          animate="hidden"
        >
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
            <div className="h-14 mb-6 overflow-hidden">
              <motion.span 
                className="block"
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                Product Engineer
              </motion.span>
            </div>
            <div className="h-14 mb-1 overflow-hidden">
              <motion.span 
                className="block"
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
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

const Banner = () => (
  <section className="h-[50vh] relative">
    <motion.div 
      className="w-full h-full bg-white"
      initial={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex flex-col justify-center max-w-5xl mx-auto h-full px-2 md:px-6">
        <h2 className="text-4xl md:text-5xl font-semibold leading-relaxed tracking-tight">
          <div className="h-14 mb-6">
            <span className="block antialiased">Product Engineer</span>
          </div>
        </h2>
        <div className="w-64">
          <a href="/" className="flex items-center text-sm font-normal group hover:opacity-80 transition-opacity">
            Get in touch 
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

const Content = () => (
  <div className="max-w-5xl mx-auto md:pt-6 px-2 md:px-0">
    <div className="grid grid-cols-12 gap-y-8 md:gap-y-0">
      {/* Empty space - adjusted to ~35% */}
      <div className="hidden md:block col-span-4 lg:col-span-4" />
      
      {/* Content area - expanded to maintain golden ratio */}
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
        <div className="flex flex-col space-y-16 md:space-y-24">
          {/* For Everyone section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="md:w-24">
              <p className="text-sm font-medium text-gray-600 antialiased tracking-tight leading-relaxed mb-1 md:mb-0 md:pt-1.5">
                For Everyone
              </p>
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed lg:leading-relaxed antialiased text-gray-900 tracking-tight">
                Combining unique design and rich technology, we build digital
                products exactly as they were designed, without shortcuts or
                simplifications.
              </p>
            </div>
          </div>

          {/* I help with section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="md:w-24">
              <p className="text-sm font-medium text-gray-600 antialiased tracking-tight leading-relaxed mb- md:mb-0 md:pt-1.5">
                I Help With
              </p>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 md:gap-2.5">
                {['Back End', 'Front End', 'Product Management'].map((skill) => (
                  <span 
                    key={skill}
                    className="border border-black rounded-full text-xs md:text-sm font-medium py-1.5 md:py-2 px-3 md:px-4 hover:bg-black hover:text-white transition-colors duration-300 whitespace-nowrap antialiased tracking-tight"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface Dimensions {
  width: number;
  height: number;
}

interface LandingProps {
  dimensions: Dimensions;
}

const Landing = ({ dimensions }: LandingProps) => {
  useEffect(() => {
    const updateVh = () => {
      const vh = dimensions.height * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVh();
    window.addEventListener('resize', updateVh);
    
    return () => window.removeEventListener('resize', updateVh);
  }, [dimensions.height]);

  return (
    <div className="relative min-h-screen bg-white">
      <IntroOverlay />
      <Banner />
      <Line />
      <Content />
    </div>
  );
};

export default Landing;