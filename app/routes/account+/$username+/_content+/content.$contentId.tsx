// #app/routes/account+/$username+/_content+/content.$contentId.tsx

import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	json,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import {
	Form,
	Link,
	useActionData,
	useLoaderData,
	type MetaFunction,
} from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/core/error-boundary.tsx'
import { floatingToolbarClassName } from '#app/components/core/floating-toolbar.tsx'
import { ErrorList } from '#app/components/core/forms.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getContentImgSrc, useIsPending } from '#app/utils/misc.tsx'
import { requireUserWithPermission } from '#app/utils/permissions.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'
import { userHasPermission, useOptionalUser } from '#app/utils/user.ts'
import { type loader as contentLoader } from './content.tsx'

export async function loader({ params }: LoaderFunctionArgs) {
	const content = await prisma.content.findUnique({
		where: { id: params.contentId },
		select: {
			id: true,
			title: true,
			content: true,
			ownerId: true,
			updatedAt: true,
			images: {
				select: {
					id: true,
					altText: true,
				},
			},
		},
	})

	invariantResponse(content, 'Not found', { status: 404 })

	const date = new Date(content.updatedAt)
	const timeAgo = formatDistanceToNow(date)

	return json({
		content,
		timeAgo,
	})
}

const DeleteFormSchema = z.object({
	intent: z.literal('delete-content'),
	contentId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFormSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { contentId } = submission.value

	const content = await prisma.content.findFirst({
		select: { id: true, ownerId: true, owner: { select: { username: true } } },
		where: { id: contentId },
	})
	invariantResponse(content, 'Not found', { status: 404 })

	const isOwner = content.ownerId === userId
	await requireUserWithPermission(
		request,
		isOwner ? `delete:content:own` : `delete:content:any`,
	)

	await prisma.content.delete({ where: { id: content.id } })

	return redirectWithToast(`/account/${content.owner.username}/content`, {
		type: 'success',
		title: 'Success',
		description: 'Your content has been deleted.',
	})
}

export default function ContentRoute() {
	const data = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const isOwner = user?.id === data.content.ownerId
	const canDelete = userHasPermission(
		user,
		isOwner ? `delete:content:own` : `delete:content:any`,
	)
	const displayBar = canDelete || isOwner

	return (
		<div className="absolute inset-0 flex flex-col px-10">
			<h2 className="mb-2 pt-12 text-h2 lg:mb-6">{data.content.title}</h2>
			<div className={`${displayBar ? 'pb-24' : 'pb-12'} overflow-y-auto`}>
				<ul className="flex flex-wrap gap-5 py-5">
					{data.content.images.map((image) => (
						<li key={image.id}>
							<a href={getContentImgSrc(image.id)}>
								<img
									src={getContentImgSrc(image.id)}
									alt={image.altText ?? ''}
									className="h-32 w-32 rounded-lg object-cover"
								/>
							</a>
						</li>
					))}
				</ul>
				<p className="whitespace-break-spaces text-sm md:text-lg">
					{data.content.content}
				</p>
			</div>
			{displayBar ? (
				<div className={floatingToolbarClassName}>
					<span className="text-sm text-foreground/90 max-[524px]:hidden">
						<Icon name="clock" className="scale-125">
							{data.timeAgo} ago
						</Icon>
					</span>
					<div className="grid flex-1 grid-cols-2 justify-end gap-2 min-[525px]:flex md:gap-4">
						{canDelete ? <DeleteContent id={data.content.id} /> : null}
						<Button
							asChild
							className="min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0"
						>
							<Link to="edit">
								<Icon name="pencil-1" className="scale-125 max-md:scale-150">
									<span className="max-md:hidden">Edit</span>
								</Icon>
							</Link>
						</Button>
					</div>
				</div>
			) : null}
		</div>
	)
}

export function DeleteContent({ id }: { id: string }) {
	const actionData = useActionData<typeof action>()
	const isPending = useIsPending()
	const [form] = useForm({
		id: 'delete-content',
		lastResult: actionData?.result,
	})

	return (
		<Form method="POST" {...getFormProps(form)}>
			<input type="hidden" name="contentId" value={id} />
			<StatusButton
				type="submit"
				name="intent"
				value="delete-content"
				variant="destructive"
				status={isPending ? 'pending' : (form.status ?? 'idle')}
				disabled={isPending}
				className="w-full max-md:aspect-square max-md:px-0"
			>
				<Icon name="trash" className="scale-125 max-md:scale-150">
					<span className="max-md:hidden">Delete</span>
				</Icon>
			</StatusButton>
			<ErrorList errors={form.errors} id={form.errorId} />
		</Form>
	)
}

export const meta: MetaFunction<
	typeof loader,
	{ 'routes/users+/$username_+/content': typeof contentLoader }
> = ({ data, params, matches }) => {
	const contentMatch = matches.find(
		(m) => m.id === 'routes/users+/$username_+/content',
	)
	const displayName = contentMatch?.data?.owner.name ?? params.username
	const contentTitle = data?.content.title ?? 'Content'
	const contentContentsSummary =
		data && data.content.content.length > 100
			? data?.content.content.slice(0, 97) + '...'
			: 'No content'
	return [
		{ title: `${contentTitle} | ${displayName}'s Content | Epic Content` },
		{
			name: 'description',
			content: contentContentsSummary,
		},
	]
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				403: () => <p>You are not allowed to do that</p>,
				404: ({ params }) => (
					<p>No content with the id "{params.contentId}" exists</p>
				),
			}}
		/>
	)
}