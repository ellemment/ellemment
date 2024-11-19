// app/routes/user+/_settings+/settings.index.tsx

import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import {
	json,
	redirect,
	unstable_createMemoryUploadHandler,
	unstable_parseMultipartFormData,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { useLoaderData, useFetcher, useNavigation } from '@remix-run/react'
import { useState } from 'react'
import { z } from 'zod'
import { Icon } from '#app/interface/foundations/icons/icon'
import { Button } from '#app/interface/shadcn/button'
import { ErrorList, Field } from '#app/interface/shared/forms'
import { StatusButton } from '#app/interface/shared/status-button'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { getUserImgSrc, useDoubleCheck } from '#app/utils/misc.js'
import { redirectWithToast } from '#app/utils/toast.server.js'
import { NameSchema, UsernameSchema } from '#app/utils/user-validation.js'

const NameFormSchema = z.object({
	name: NameSchema,
})

const UsernameFormSchema = z.object({
	username: UsernameSchema,
})

const MAX_SIZE = 1024 * 1024 * 3 // 3MB

const DeleteImageSchema = z.object({
	intent: z.literal('delete'),
})

const NewImageSchema = z.object({
	intent: z.literal('submit'),
	photoFile: z
		.instanceof(File)
		.refine((file) => file.size > 0, 'Image is required')
		.refine((file) => file.size <= MAX_SIZE, 'Image size must be less than 3MB'),
})

const PhotoFormSchema = z.discriminatedUnion('intent', [
	DeleteImageSchema,
	NewImageSchema,
])

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			username: true,
				image: { select: { id: true } },
		},
	})
	return json({ user })
}

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const contentType = request.headers.get('content-type')

	// Handle photo updates
	if (contentType?.includes('multipart/form-data')) {
		const formData = await unstable_parseMultipartFormData(
			request,
			unstable_createMemoryUploadHandler({ maxPartSize: MAX_SIZE })
		)
		const submission = await parseWithZod(formData, {
			schema: PhotoFormSchema.transform(async (data) => {
				if (data.intent === 'delete') return { intent: 'delete' }
				if (data.photoFile.size <= 0) return z.NEVER
				return {
					intent: data.intent,
					image: {
						contentType: data.photoFile.type,
						blob: Buffer.from(await data.photoFile.arrayBuffer()),
					},
				}
			}),
			async: true,
		})

		if (submission.status !== 'success') {
			return json({ result: submission.reply() }, { status: 400 })
		}

		const { image, intent } = submission.value

		if (intent === 'delete') {
			await prisma.userImage.deleteMany({ where: { userId } })
			return redirectWithToast('/user/settings', {
				title: 'Photo Deleted',
				description: 'Your profile photo has been deleted',
				type: 'success',
			})
		}

		await prisma.$transaction(async ($prisma) => {
			await $prisma.userImage.deleteMany({ where: { userId } })
				await $prisma.user.update({
					where: { id: userId },
					data: { image: { create: image } },
				})
		})

		return redirectWithToast('/user/settings', {
			title: 'Photo Updated',
			description: 'Your profile photo has been updated',
			type: 'success',
		})
	}

	// Handle name updates
	const formData = await request.formData()
	const intent = formData.get('intent')

	if (intent === 'name') {
		const submission = await parseWithZod(formData, {
			schema: NameFormSchema,
		})
		if (submission.status !== 'success') {
			return json({ result: submission.reply() }, { status: 400 })
		}
		const { name } = submission.value
		await prisma.user.update({ where: { id: userId }, data: { name } })
		return redirectWithToast('/user/settings', {
			title: 'Name Updated',
			description: `Your name has been changed to ${name}`,
			type: 'success',
		})
	}

	if (intent === 'username') {
		const submission = await parseWithZod(formData, {
			schema: UsernameFormSchema,
		})
		if (submission.status !== 'success') {
			return json({ result: submission.reply() }, { status: 400 })
		}
		const { username } = submission.value
		await prisma.user.update({ where: { id: userId }, data: { username } })
		return redirectWithToast('/user/settings', {
			title: 'Username Updated',
			description: `Your username has been changed to ${username}`,
			type: 'success',
		})
	}

	return redirect('/user/settings')
}

function NameSection() {
	const data = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()

	const [form, fields] = useForm({
		id: 'name-form',
		constraint: getZodConstraint(NameFormSchema),
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: NameFormSchema })
		},
		defaultValue: { name: data.user.name ?? '' },
	})

	return (
		<section className="space-y-4">
			<fetcher.Form method="POST" {...getFormProps(form)}>
				<input type="hidden" name="intent" value="name" />
				<Field
					labelProps={{ children: 'Name' }}
					inputProps={{
						...getInputProps(fields.name, { type: 'text' }),
					}}
					errors={fields.name.errors}
				/>
				<ErrorList errors={form.errors} id={form.errorId} />
				<StatusButton
					type="submit"
					status={fetcher.state === 'submitting' ? 'pending' : 'idle'}
				>
					Save Name
				</StatusButton>
			</fetcher.Form>
		</section>
	)
}

function UsernameSection() {
	const data = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()

	const [form, fields] = useForm({
		id: 'username-form',
		constraint: getZodConstraint(UsernameFormSchema),
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UsernameFormSchema })
		},
		defaultValue: { username: data.user.username },
	})

	return (
		<section className="space-y-4">
			<fetcher.Form method="POST" {...getFormProps(form)}>
				<input type="hidden" name="intent" value="username" />
				<Field
					labelProps={{ children: 'Username' }}
					inputProps={{
						...getInputProps(fields.username, { type: 'text' }),
					}}
					errors={fields.username.errors}
				/>
				<ErrorList errors={form.errors} id={form.errorId} />
				<StatusButton
					type="submit"
					status={fetcher.state === 'submitting' ? 'pending' : 'idle'}
				>
					Save Username
				</StatusButton>
			</fetcher.Form>
		</section>
	)
}

function PhotoSection() {
	const data = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()
	const navigation = useNavigation()
	const [newImageSrc, setNewImageSrc] = useState<string | null>(null)
	const doubleCheckDeleteImage = useDoubleCheck()

	const [form, fields] = useForm({
		id: 'profile-photo',
		constraint: getZodConstraint(PhotoFormSchema),
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: PhotoFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	const pendingIntent = navigation.formData?.get('intent')
	const lastSubmissionIntent = fields.intent.value

	return (
		<section className="flex flex-col items-center justify-center gap-10">
			<fetcher.Form
				method="POST"
				encType="multipart/form-data"
				className="flex flex-col items-center justify-center gap-10"
				onReset={() => setNewImageSrc(null)}
				{...getFormProps(form)}
			>
				<img
					src={
						newImageSrc ?? (data.user ? getUserImgSrc(data.user.image?.id) : '')
					}
					className="h-52 w-52 rounded-full object-cover"
					alt={data.user?.name ?? data.user?.username}
				/>
				<ErrorList errors={fields.photoFile.errors} id={fields.photoFile.id} />
				<div className="flex gap-4">
					<input
						{...getInputProps(fields.photoFile, { type: 'file' })}
							accept="image/*"
							className="peer sr-only"
							required
							tabIndex={newImageSrc ? -1 : 0}
							onChange={(e) => {
								const file = e.currentTarget.files?.[0]
								if (file) {
									const reader = new FileReader()
									reader.onload = (event) => {
										setNewImageSrc(event.target?.result?.toString() ?? null)
									}
									reader.readAsDataURL(file)
								}
							}}
					/>
					<Button
						asChild
						className="cursor-pointer peer-valid:hidden peer-focus-within:ring-2 peer-focus-visible:ring-2"
					>
						<label htmlFor={fields.photoFile.id}>
							<Icon name="pencil-1">Change</Icon>
						</label>
					</Button>
					<StatusButton
						name="intent"
						value="submit"
						type="submit"
						className="peer-invalid:hidden"
						status={
							pendingIntent === 'submit'
								? 'pending'
								: lastSubmissionIntent === 'submit'
									? form.status ?? 'idle'
									: 'idle'
						}
					>
						Save Photo
					</StatusButton>
					<Button
						variant="destructive"
						className="peer-invalid:hidden"
						{...form.reset.getButtonProps()}
					>
						<Icon name="trash">Reset</Icon>
					</Button>
					{data.user.image?.id ? (
						<StatusButton
							className="peer-valid:hidden"
							variant="destructive"
							{...doubleCheckDeleteImage.getButtonProps({
								type: 'submit',
								name: 'intent',
								value: 'delete',
							})}
							status={
								pendingIntent === 'delete'
									? 'pending'
									: lastSubmissionIntent === 'delete'
										? form.status ?? 'idle'
										: 'idle'
							}
						>
							<Icon name="trash">
								{doubleCheckDeleteImage.doubleCheck
									? 'Are you sure?'
									: 'Delete'}
							</Icon>
						</StatusButton>
					) : null}
				</div>
				<ErrorList errors={form.errors} />
			</fetcher.Form>
		</section>
	)
}

export default function SettingsIndex() {
	return (
		<div className="space-y-8">
			<div className="grid gap-8">
				<PhotoSection />
				<NameSection />
				<UsernameSection />
			</div>
		</div>
	)
}