// app/routes/user+/_settings+/settings.index.tsx

import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { useRouteLoaderData } from '@remix-run/react'
import { type loader } from './settings'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

export default function SettingsIndex() {
	const data = useRouteLoaderData<typeof loader>('routes/user+/_settings+/settings')
	
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">Account Settings</h2>
			<p className="text-muted-foreground">
				Manage your account settings and preferences.
			</p>
		</div>
	)
}