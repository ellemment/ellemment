import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { type ReactNode, useRef } from "react";


// Types
interface FooterSection {
  title: string;
  links: Array<{
    name: string;
    href: string;
  }>;
}

interface OverlayProps {
  heading?: string;
  subheading?: string;
  children?: ReactNode;
}

// Constants
const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Tasks", href: "#tasks" },
      { name: "Calendar", href: "#calendar" },
      { name: "Conferencing", href: "#conferencing" },
      { name: "Invoicing", href: "#invoicing" },
      { name: "Security", href: "#security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#blog" },
      { name: "Pricing", href: "#pricing" },
      { name: "Roadmap", href: "#roadmap" },
      { name: "Changelog", href: "#changelog" },
      { name: "Documentation", href: "#docs" },
    ],
  },
  {
    title: "Case Studies",
    links: [
      { name: "Shadcn", href: "#shadcn" },
      { name: "React", href: "#react" },
      { name: "Tailwind", href: "#tailwind" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { name: "Hubspot", href: "#hubspot" },
      { name: "Slack", href: "#slack" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Company", href: "#company" },
      { name: "Support", href: "#support" },
      { name: "Book a demo", href: "#demo" },
    ],
  },
];


// Components
const FooterOverlay = ({ heading, subheading, children }: OverlayProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -250]);

  return (
    <motion.div
      style={{ y }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-start justify-center bg-background text-inherit"
    >
      {children || (
        <div className="mx-auto w-full max-w-5xl px-2 md:px-6">
          <h2 className="text-4xl font-semibold leading-relaxed tracking-tight md:text-5xl">
            {heading}
          </h2>
          <p className="text-2xl">{subheading}</p>
        </div>
      )}
    </motion.div>
  );
};


const FooterContent = () => (
  <section className="bg-gray-100 max-w-5xl mx-auto px-2 md:px-6 pb-6 pt-24 dark:bg-secondary h-screen flex flex-col justify-end">
    <div className="w-full">
      <footer>
   
        {/* Navigation Section */}
        <div className="grid grid-cols-2 gap-8 border-t pt-20 lg:grid-cols-5">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-medium text-sm">{section.title}</h3>
              <ul className="space-y-4 text-sm font-normal text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.name} className="font-medium hover:text-primary">
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Section */}
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t pt-8 text-center text-xs font-normal text-muted-foreground lg:flex-row lg:items-center">
          <ul className="flex justify-center gap-4 lg:justify-start">
            <li className="hover:text-primary">
              <a href="#privacy">Privacy</a>
            </li>
            <li className="hover:text-primary">
              <a href="#terms">Terms</a>
            </li>
            <li className="hover:text-primary">
              <a href="#imprint">Imprint</a>
            </li>
          </ul>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Shadcnblocks. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </section>
);

const StickyContainer = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <motion.div
      ref={containerRef}
      className="sticky top-0 z-0 bg-secondary"
    >
      {children}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `inset(${Math.min(scrollYProgress.get() * 2 * 100, 100)}% 0 0 0)`,
        }}
      />
    </motion.div>
  );
};

export const Footer = () => {
  return (
    <div className="bg-background">
      <div className="relative h-[200vh]">
        <StickyContainer>
          <FooterContent />
        </StickyContainer>
        <AnimatePresence mode="sync">
          <FooterOverlay heading="built with" subheading="" />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Footer;