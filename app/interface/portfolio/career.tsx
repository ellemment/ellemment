// #app/interface/portfolio/career.tsx

import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
import { motion } from "framer-motion";


interface CompanyProps {
  title: string;
  date: string;
  location: string;
}

const Company = ({ title, date, location }: CompanyProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-border pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl font-semibold text-inherit">{title}</p>
        <p className="text-sm font-normal text-inherit/50">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm  text-inherit/50">
        <p>{location}</p>
      </div>
    </motion.div>
  );
};

export const Career = () => {
  return (
    <div className="bg-background">
      <CareerList />
    </div>
  );
};


export const CareerList = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
      }}
    >
      <section
        id="launch-schedule"
        className="mx-auto max-w-5xl px-4 py-48 text-inherit"
      >
        <Company title="Product Development Manager" date="Tokyo, Japan" location="Rakuten" />
        <Company title="Chief Technology Officer" date="Tokyo, Japan" location="Infinity" />
        <Company title="Data Scientist" date="Tokyo, Japan" location="NTT Data" />
        <Company title="Software Engineer" date="Tokyo, Japan" location="Gipocrat" />
      </section>
    </ReactLenis>
  );
};



