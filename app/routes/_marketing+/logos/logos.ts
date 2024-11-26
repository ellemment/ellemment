import docker from './docker.svg'
import eslint from './eslint.svg'
import fakerJS from './faker.svg'
import fly from './fly.svg'
import github from './github.svg'
import msw from './msw.svg'
import playwright from './playwright.svg'
import prettier from './prettier.svg'
import prisma from './prisma.svg'
import radixUI from './radix.svg'
import reactEmail from './react-email.svg'
import remix from './remix.svg'
import resend from './resend.svg'
import sentry from './sentry.svg'
import shadcnUI from './shadcn-ui.svg'
import sqlite from './sqlite.svg'
import tailwind from './tailwind.svg'
import testingLibrary from './testing-library.png'
import typescript from './typescript.svg'
import vitest from './vitest.svg'
import zod from './zod.svg'

// Add these type definitions at the top of the file
interface Logo {
	src: string
	alt: string
	href: string
	column: number
	row: number
}

interface SkillLogo {
	name: string
	src: string
}

export const skillLogos: Record<string, string> = {
	'TypeScript': typescript,
	'Tailwind': tailwind,
	'Prisma': prisma,
	'Remix': remix,
	'GitHub': github,
	'Docker': docker,
	'Radix UI': radixUI,
	'shadcn/ui': shadcnUI,
} as const;

export const logos: Logo[] = [
	{
		src: remix,
		alt: 'Remix',
		href: 'https://remix.run',
		column: 1,
		row: 1,
	},
	{
		src: fly,
		alt: 'Fly.io',
		href: 'https://fly.io',
		column: 1,
		row: 2,
	},
	{
		src: sqlite,
		alt: 'SQLite',
		href: 'https://sqlite.org',
		column: 1,
		row: 3,
	},
	{
		src: prisma,
		alt: 'Prisma',
		href: 'https://prisma.io',
		column: 2,
		row: 2,
	},
	{
		src: zod,
		alt: 'Zod',
		href: 'https://zod.dev/',
		column: 2,
		row: 3,
	},
	{
		src: github,
		alt: 'GitHub',
		href: 'https://github.com',
		column: 2,
		row: 4,
	},
	{
		src: resend,
		alt: 'Resend',
		href: 'https://resend.com',
		column: 2,
		row: 5,
	},
	{
		src: reactEmail,
		alt: 'React Email',
		href: 'https://react.email',
		column: 2,
		row: 6,
	},
	{
		src: tailwind,
		alt: 'Tailwind CSS',
		href: 'https://tailwindcss.com',
		column: 3,
		row: 3,
	},
	{
		src: radixUI,
		alt: 'Radix UI',
		href: 'https://www.radix-ui.com/',
		column: 3,
		row: 4,
	},
	{
		src: shadcnUI,
		alt: 'shadcn/ui',
		href: 'https://ui.shadcn.com/',
		column: 3,
		row: 5,
	},
	{
		src: playwright,
		alt: 'Playwright',
		href: 'https://playwright.dev/',
		column: 4,
		row: 1,
	},
	{
		src: msw,
		alt: 'MSW',
		href: 'https://mswjs.io',
		column: 4,
		row: 2,
	},
	{
		src: fakerJS,
		alt: 'Faker.js',
		href: 'https://fakerjs.dev/',
		column: 4,
		row: 3,
	},
	{
		src: vitest,
		alt: 'Vitest',
		href: 'https://vitest.dev',
		column: 4,
		row: 4,
	},
	{
		src: testingLibrary,
		alt: 'Testing Library',
		href: 'https://testing-library.com',
		column: 4,
		row: 5,
	},
	{
		src: docker,
		alt: 'Docker',
		href: 'https://www.docker.com',
		column: 4,
		row: 6,
	},
	{
		src: typescript,
		alt: 'TypeScript',
		href: 'https://typescriptlang.org',
		column: 5,
		row: 2,
	},
	{
		src: prettier,
		alt: 'Prettier',
		href: 'https://prettier.io',
		column: 5,
		row: 3,
	},
	{
		src: eslint,
		alt: 'ESLint',
		href: 'https://eslint.org',
		column: 5,
		row: 4,
	},
	{
		src: sentry,
		alt: 'Sentry',
		href: 'https://sentry.io',
		column: 5,
		row: 5,
	},
]

// Individual exports for direct usage
export {
	docker,
	typescript,
	tailwind,
	prisma,
	remix,
	github,
	radixUI,
	shadcnUI,
}

// Export stars image
export { default as stars } from './stars.jpg'

// Helper functions for logo handling
export const getLogoByName = (name: keyof typeof skillLogos): string => {
	return skillLogos[name] || '';
};

export const getLogosByCategory = (category: string): Logo[] => {
	return logos.filter(logo => {
		const alt = logo.alt.toLowerCase();
		const categoryLower = category.toLowerCase();
		return alt.includes(categoryLower);
	});
};

// Types exports for usage in other components
export type { Logo, SkillLogo };