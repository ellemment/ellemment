import { type Theme } from '#app/utils/theme.server'
import aws from './aws.svg'
import docker from './docker.svg'
import eslint from './eslint.svg'
import fakerJS from './faker.svg'
import figma from './figma.svg'
import fly from './fly.svg'
import gcp from './gcp.svg'
import github from './github.svg'
import javascript  from './javascript.svg'
// Import all SVG files
import msw from './msw.svg'
import playwright from './playwright.svg'
import prettier from './prettier.svg'
import prisma from './prisma.svg'
import python from './python.svg'
import radixUI from './radix.svg'
import reactEmail from './react-email.svg'
import remix from './remix.svg'
import resend from './resend.svg'
import sentry from './sentry.svg'
import shadcnUI from './shadcn-ui.svg'
import sql from './sql.svg'
import sqlite from './sqlite.svg'
import tailwind from './tailwind.svg'
import testingLibrary from './testing-library.png'
import typescript from './typescript.svg'
import vitest from './vitest.svg'
import zod from './zod.svg'

interface ThemedLogo {
	light: string
	dark: string
}

interface Logo {
	src: ThemedLogo
	alt: string
	href: string
	column: number
	row: number
}

interface SkillLogo {
	name: string
	src: ThemedLogo
}

// Create themed versions of each logo
const createThemedLogo = (logo: string): ThemedLogo => ({
	light: logo + '?theme=light',
	dark: logo + '?theme=dark',
})

// Apply themed versions to all logos
export const skillLogos: Record<string, ThemedLogo> = {
	'TypeScript': createThemedLogo(typescript),
	'JavaScript': createThemedLogo(javascript),
	'Figma': createThemedLogo(figma),
	'Python': createThemedLogo(python),
	'SQL': createThemedLogo(sql),
	'GitHub': createThemedLogo(github),
	'Docker': createThemedLogo(docker),
	'AWS': createThemedLogo(aws),
	'GCP': createThemedLogo(gcp),
} as const;

export const logos: Logo[] = [
	{
		src: createThemedLogo(remix),
		alt: 'Remix',
		href: 'https://remix.run',
		column: 1,
		row: 1,
	},
	{
		src: createThemedLogo(fly),
		alt: 'Fly.io',
		href: 'https://fly.io',
		column: 1,
		row: 2,
	},
	{
		src: createThemedLogo(sqlite),
		alt: 'SQLite',
		href: 'https://sqlite.org',
		column: 1,
		row: 3,
	},
	{
		src: createThemedLogo(prisma),
		alt: 'Prisma',
		href: 'https://prisma.io',
		column: 2,
		row: 2,
	},
	{
		src: createThemedLogo(zod),
		alt: 'Zod',
		href: 'https://zod.dev/',
		column: 2,
		row: 3,
	},
	{
		src: createThemedLogo(github),
		alt: 'GitHub',
		href: 'https://github.com',
		column: 2,
		row: 4,
	},
	{
		src: createThemedLogo(resend),
		alt: 'Resend',
		href: 'https://resend.com',
		column: 2,
		row: 5,
	},
	{
		src: createThemedLogo(reactEmail),
		alt: 'React Email',
		href: 'https://react.email',
		column: 2,
		row: 6,
	},
	{
		src: createThemedLogo(tailwind),
		alt: 'Tailwind CSS',
		href: 'https://tailwindcss.com',
		column: 3,
		row: 3,
	},
	{
		src: createThemedLogo(radixUI),
		alt: 'Radix UI',
		href: 'https://www.radix-ui.com/',
		column: 3,
		row: 4,
	},
	{
		src: createThemedLogo(shadcnUI),
		alt: 'shadcn/ui',
		href: 'https://ui.shadcn.com/',
		column: 3,
		row: 5,
	},
	{
		src: createThemedLogo(playwright),
		alt: 'Playwright',
		href: 'https://playwright.dev/',
		column: 4,
		row: 1,
	},
	{
		src: createThemedLogo(msw),
		alt: 'MSW',
		href: 'https://mswjs.io',
		column: 4,
		row: 2,
	},
	{
		src: createThemedLogo(fakerJS),
		alt: 'Faker.js',
		href: 'https://fakerjs.dev/',
		column: 4,
		row: 3,
	},
	{
		src: createThemedLogo(vitest),
		alt: 'Vitest',
		href: 'https://vitest.dev',
		column: 4,
		row: 4,
	},
	{
		src: createThemedLogo(testingLibrary),
		alt: 'Testing Library',
		href: 'https://testing-library.com',
		column: 4,
		row: 5,
	},
	{
		src: createThemedLogo(docker),
		alt: 'Docker',
		href: 'https://www.docker.com',
		column: 4,
		row: 6,
	},
	{
		src: createThemedLogo(typescript),
		alt: 'TypeScript',
		href: 'https://typescriptlang.org',
		column: 5,
		row: 2,
	},
	{
		src: createThemedLogo(prettier),
		alt: 'Prettier',
		href: 'https://prettier.io',
		column: 5,
		row: 3,
	},
	{
		src: createThemedLogo(eslint),
		alt: 'ESLint',
		href: 'https://eslint.org',
		column: 5,
		row: 4,
	},
	{
		src: createThemedLogo(sentry),
		alt: 'Sentry',
		href: 'https://sentry.io',
		column: 5,
		row: 5,
	},
]

// Helper function to get themed logo
export const getThemedLogo = (logo: ThemedLogo, theme: Theme = 'light') => {
	return theme === 'light' ? logo.light : logo.dark
}

// Modified helper functions
export const getLogoByName = (name: keyof typeof skillLogos, theme: Theme = 'light'): string => {
	const logo = skillLogos[name]
	return logo ? getThemedLogo(logo, theme) : ''
}

export const getLogosByCategory = (category: string, theme: Theme = 'light'): Logo[] => {
	return logos.filter(logo => {
		const alt = logo.alt.toLowerCase()
		const categoryLower = category.toLowerCase()
		return alt.includes(categoryLower)
	}).map(logo => ({
		...logo,
		src: {
			light: getThemedLogo(logo.src, 'light'),
			dark: getThemedLogo(logo.src, 'dark')
		}
	}))
}

// Types exports
export type { Logo, SkillLogo, ThemedLogo }