// app/routes/user+/_settings+/settings.download-data.tsx

import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { Icon } from '#app/interface/foundations/icons/icon'
import { Button } from "#app/interface/shadcn/button"
import { requireUserId } from '#app/utils/auth.server.js'
import { type BreadcrumbHandle } from './settings.tsx'

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="download">Download Data</Icon>,
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
	return json({})
}

export default function DownloadDataRoute() {
	return (
		<div className="mx-auto max-w-md">
			<h1 className="text-h1">Download Your Data</h1>
			<p className="mt-4">
				You can download all of your data as a JSON file. This file will contain
				all the information associated with your account.
			</p>
			<div className="mt-6">
				<Button asChild>
					<Link
						reloadDocument
						download="my-epic-content-data.json"
						to="/resources/download-user-data"
					>
						<Icon name="download">Download Your Data</Icon>
					</Link>
				</Button>
			</div>
		</div>
	)
}