import { motion } from 'framer-motion';
import Line from '#app/interface/shared/line';

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
        <div className="flex flex-row gap-4">
          <a href="/" className="flex opacity-50 items-center text-sm font-normal group hover:opacity-80 transition-opacity">
            Explore
          </a>
          <a href="/" className="flex items-center text-sm font-normal group hover:opacity-80 transition-opacity">
            Get in touch
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

const Content = () => (
  <div className="h-[50vh] max-w-5xl mx-auto md:pt-6 px-2 md:px-0">
    <div className="grid grid-cols-12 gap-y-8 md:gap-y-0">
      <div className="hidden md:block col-span-4 lg:col-span-4" />
      <div className="col-span-12 md:col-span-8 lg:col-span-8">
        <div className="flex flex-col space-y-16 md:space-y-18">
          <Section 
            title="For Everyone"
            content="Combining unique design and rich technology, we build digital products exactly as they were designed, without shortcuts or simplifications."
          />
          <SkillsSection />
        </div>
      </div>
    </div>
  </div>
);

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
    <div className="md:w-24">
      <p className="text-sm font-medium text-gray-600 antialiased tracking-tight leading-relaxed mb-1 md:mb-0 md:pt-1.5">
        {title}
      </p>
    </div>
    <div className="flex-1">
      <p className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed lg:leading-relaxed antialiased text-gray-900 tracking-tight">
        {content}
      </p>
    </div>
  </div>
);

const SkillsSection = () => (
  <div className="flex flex-col md:flex-row gap-6 md:gap-6">
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
);

const Hero = () => (
  <div className="relative min-h-screen bg-white">
    <Banner />
    <Line />
    <Content />
  </div>
);

export default Hero;