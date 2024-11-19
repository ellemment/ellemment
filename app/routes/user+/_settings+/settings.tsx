// app/routes/user+/_settings+/settings.tsx

import { invariantResponse } from '@epic-web/invariant'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLocation } from '@remix-run/react'
import { z } from 'zod'
import { AccountSettingsSidebar , settingsNavItems } from '#app/interface/composite/account/account-settings'
import { Icon } from '#app/interface/foundations/icons/icon'
import { Separator } from '#app/interface/shadcn/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#app/interface/shadcn/sidebar'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'

export const BreadcrumbHandle = z.object({ breadcrumb: z.any() })
export type BreadcrumbHandle = z.infer<typeof BreadcrumbHandle>

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="file-text">Edit Profile</Icon>,
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: {
			id: true,
			username: true,
			name: true,
			email: true,
			image: {
				select: { id: true },
			},
		},
	})
	invariantResponse(user, 'User not found', { status: 404 })
	return json({ user })
}

export default function SettingsLayout() {
	const location = useLocation()
	
	const currentPath = location.pathname.split('/').pop() || ''
	const isIndex = currentPath === 'settings'
	const pageTitle = isIndex 
		? 'Settings'
		: settingsNavItems
			.flatMap(section => section.items)
			.find(item => item.to.includes(currentPath))?.title

	return (
		<div className="mx-auto max-w-7xl relative flex">
			<SidebarProvider defaultOpen={true} className="rounded-xl">
				<div className="flex flex-1">
					<AccountSettingsSidebar />
					<SidebarInset className="bg-gray-300 dark:bg-secondary">
						<header className="flex h-16 shrink-0 items-center gap-2 border-b">
							<div className="flex items-center gap-2 px-4 w-full">
								<SidebarTrigger className="-ml-1" />
								<Separator 
									orientation="vertical" 
									className="mx-2 h-4 bg-gray-700 dark:bg-gray-300" 
									decorative 
								/>
								{pageTitle && (
									<span className="text-lg font-semibold">
										{pageTitle}
									</span>
								)}
							</div>
						</header>
						<main className="flex-1 overflow-y-auto p-4 ">
							<Outlet />
						</main>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}
