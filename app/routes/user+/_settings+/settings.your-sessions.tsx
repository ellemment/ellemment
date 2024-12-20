// app/routes/user+/_settings+/settings.your-sessions.tsx

import { invariantResponse } from '@epic-web/invariant'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { Icon } from '#app/interface/foundations/icons/icon'
import { StatusButton } from '#app/interface/shared/status-button'
import { requireUserId, sessionKey } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { useDoubleCheck } from '#app/utils/misc.js'
import { authSessionStorage } from '#app/utils/session.server.js'
import { type BreadcrumbHandle } from './settings.tsx'

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="laptop">Your Sessions</Icon>,
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: {
			_count: {
				select: {
					sessions: {
						where: {
							expirationDate: { gt: new Date() },
						},
					},
				},
			},
		},
	})
	return json({ user })
}

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const sessionId = authSession.get(sessionKey)
	invariantResponse(
		sessionId,
		'You must be authenticated to sign out of other sessions',
	)
	await prisma.session.deleteMany({
		where: {
			userId,
			id: { not: sessionId },
		},
	})
	return json({ status: 'success' } as const)
}

export default function YourSessionsRoute() {
	const data = useLoaderData<typeof loader>()
	const dc = useDoubleCheck()
	const fetcher = useFetcher<typeof action>()
	const otherSessionsCount = data.user._count.sessions - 1

	return (
		<div className="flex flex-col justify-start">
			{otherSessionsCount ? (
				<>
					<p className="mt-4">You are logged in on {otherSessionsCount} other devices.</p>
					<fetcher.Form method="POST" className="mt-6">
						<StatusButton
							{...dc.getButtonProps({
								type: 'submit',
								name: 'intent',
								value: 'signout',
							})}
							variant={dc.doubleCheck ? 'destructive' : 'default'}
							status={
								fetcher.state !== 'idle'
									? 'pending'
									: fetcher.data?.status ?? 'idle'
							}
						>
							<Icon name="avatar">
								{dc.doubleCheck
									? `Are you sure?`
									: `Sign out of ${otherSessionsCount} other sessions`}
							</Icon>
						</StatusButton>
					</fetcher.Form>
				</>
			) : (
				<p className="mt-4">
					<Icon name="avatar">This is your only active session</Icon>
				</p>
			)}
		</div>
	)
}