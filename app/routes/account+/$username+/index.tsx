// #app/routes/account+/$username+/index.tsx

import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, type MetaFunction } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/core/error-boundary.tsx'
import { Spacer } from '#app/components/core/spacer.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Card } from '#app/components/ui/card'
import { Icon } from '#app/components/ui/icon.tsx'
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
		<div className="container mb-48 mt-36">
			<div className="flex flex-col items-center justify-center">
				<Spacer size="4xs" />

				<div className="container flex flex-col items-center rounded-3xl bg-muted p-12">
					<div className="relative w-52">
						<div className="absolute -top-40">
							<div className="relative">
								<img
									src={getUserImgSrc(data.user.image?.id)}
									alt={userDisplayName}
									className="h-52 w-52 rounded-full object-cover"
								/>
							</div>
						</div>
					</div>

					<Spacer size="sm" />

					<div className="flex flex-col items-center">
						<div className="flex flex-wrap items-center justify-center gap-4">
							<h1 className="text-center text-h2">{userDisplayName}</h1>
						</div>
						<p className="mt-2 text-center text-muted-foreground">
							Joined {data.userJoinedDisplay}
						</p>
						{isLoggedInUser ? (
							<Form action="/logout" method="POST" className="mt-3">
								<Button type="submit" variant="link" size="sm">
									<Icon name="exit" className="scale-125 max-md:scale-150">
										Logout
									</Icon>
								</Button>
							</Form>
						) : null}
						<div className="mt-10 flex gap-4">
							{isLoggedInUser ? (
								<>
									<Button asChild>
										<Link to="content" prefetch="intent">
											My Content
										</Link>
									</Button>
									<Button asChild>
										<Link to="/account/settings" prefetch="intent">
											Edit profile
										</Link>
									</Button>
								</>
							) : (
								<Button asChild>
									<Link to={(`/account/${user.username}/content`)} prefetch="intent">
										{userDisplayName}'s Content
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-12 max-w-2xl mx-auto p-6 space-y-6">
				<div className="space-y-4">
					{isLoggedInUser && (
						<Card className="transition-colors hover:bg-muted">
							<Link to="content/new" className="block p-4">
								<div className="flex items-center gap-3">
									<Icon name="plus-circled" className="h-5 w-5 text-muted-foreground" />
									<span className="font-medium">Create Content</span>
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