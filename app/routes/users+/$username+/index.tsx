// #app/routes/account+/$username+/index.tsx

import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, type MetaFunction } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon.tsx'
import { Button } from "#app/ellemment-ui/shadcn/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '#app/ellemment-ui/shadcn/card'
import { GeneralErrorBoundary } from '#app/ellemment-ui/shared/error-boundary'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc } from '#app/utils/misc.tsx'
import { useOptionalUser } from '#app/utils/user.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const user = await prisma.user.findFirst({
		select: {
			id: true,
			name: true,
			username: true,
			createdAt: true,
			image: { select: { id: true } },
			content: {
				select: {
					id: true,
					title: true,
					createdAt: true
				},
				orderBy: { createdAt: 'desc' }
			}
		},
		where: {
			username: params.username,
		},
	})

	invariantResponse(user, 'User not found', { status: 404 })

	return json({ 
		user, 
		userJoinedDisplay: user.createdAt.toLocaleDateString() 
	})
}

export default function ProfileRoute() {
	const data = useLoaderData<typeof loader>()
	const user = data.user
	const userDisplayName = user.name ?? user.username
	const loggedInUser = useOptionalUser()
	const isLoggedInUser = data.user.id === loggedInUser?.id

	return (
		<div className="container mb-48 mt-2">
			<div className="mt-12 max-w-2xl mx-auto p-6 space-y-2">
				<Card>
					<CardHeader className="flex flex-row items-center gap-4">
						<img
							src={getUserImgSrc(data.user.image?.id)}
							alt={userDisplayName}
							className="h-20 w-20 rounded-full object-cover"
						/>
						<div>
							<CardTitle>{userDisplayName}</CardTitle>
							<CardDescription>Joined {data.userJoinedDisplay}</CardDescription>
						</div>
					</CardHeader>
					<CardFooter>
						{isLoggedInUser ? (
							<div className="flex gap-4">
								<Button asChild variant="link">
									<Link to="/user/settings" prefetch="intent">
										Settings
									</Link>
								</Button>
								<Form action="/logout" method="POST">
									<Button type="submit" variant="link" size="sm">
										Sign Out
									</Button>
								</Form>
							</div>
						) : null}
					</CardFooter>
				</Card>

				<div className="space-y-4">
					{isLoggedInUser && (
						<Card className="transition-colors hover:bg-muted">
							<Link to="content/new" className="block p-4">
								<div className="flex items-center gap-3">
									<Icon name="plus-circled" className="h-5 w-5 text-muted-foreground" />
									<span className="font-medium">Create an element</span>
								</div>
							</Link>
						</Card>
					)}

					{user.content.map((content) => (
						<Card key={content.id} className="transition-colors hover:bg-muted">
							<Link to={`content/${content.id}`} className="block p-4">
								<div className="flex items-center gap-3">
									<Icon name="check-circled" className="h-5 w-5 text-muted-foreground" />
									<span className="font-medium">{content.title}</span>
								</div>
							</Link>
						</Card>
					))}

					{user.content.length === 0 && !isLoggedInUser && (
						<div className="text-center py-12 text-muted-foreground">
							<p>No content found.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
	const displayName = data?.user.name ?? params.username
	return [
		{ title: `${displayName} | Epic Content` },
		{
			name: 'description',
			content: `Profile of ${displayName} on Epic Content`,
		},
	]
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No user with the username "{params.username}" exists</p>
				),
			}}
		/>
	)
}