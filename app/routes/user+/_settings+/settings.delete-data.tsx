// app/routes/user+/_settings+/settings.delete-data.tsx

import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { type ActionFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { Icon } from '#app/interface/foundations/icons/icon'
import { StatusButton } from '#app/interface/shared/status-button'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { useDoubleCheck } from '#app/utils/misc.js'
import { redirectWithToast } from '#app/utils/toast.server.js'
import { type BreadcrumbHandle } from './settings.tsx'

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="trash">Delete Data</Icon>,
	getSitemapEntries: () => null,
}

export async function action({ request }: ActionFunctionArgs) { 
	const userId = await requireUserId(request)
	await prisma.user.delete({ where: { id: userId } })
	return redirectWithToast('/', {
		type: 'success',
		title: 'Data Deleted',
		description: 'All of your data has been deleted',
	})
}

export default function DeleteDataRoute() {
	const dc = useDoubleCheck()
	const fetcher = useFetcher<typeof action>()

	return (
		<div className="flex flex-col justify-start">
			<p className="mt-4">
				Are you sure you want to delete your account? This action cannot be
				undone.
			</p>
			<fetcher.Form method="POST" className="mt-6">
				<StatusButton
					{...dc.getButtonProps({
						type: 'submit',
						name: 'intent',
						value: 'delete',
					})}
					variant="destructive"
					status={fetcher.state !== 'idle' ? 'pending' : 'idle'}
				>
					<Icon name="trash">
						{dc.doubleCheck ? `Are you sure?` : `Delete Account`}
					</Icon>
				</StatusButton>
			</fetcher.Form>
		</div>
	)
}