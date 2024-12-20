import { type ReactNode } from "react";

// Types
interface FooterSection {
  title: string;
  links: Array<{
    name: string;
    href: string;
  }>;
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

const FooterContent = () => (
  <section className="bg-gray-100 dark:bg-secondary">
    <div className="max-w-5xl mx-auto px-2 md:px-6 py-16">
      <footer>
        {/* Navigation Section */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
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

export const Footer = () => {
  return <FooterContent />;
};

export default Footer;