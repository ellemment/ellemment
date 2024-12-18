// app/routes/user+/_settings+/settings.name.tsx

import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import {
	json,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { Icon } from '#app/interface/foundations/icons/icon'
import { ErrorList, Field } from '#app/interface/shared/forms'
import { StatusButton } from '#app/interface/shared/status-button'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { redirectWithToast } from '#app/utils/toast.server.js'
import { NameSchema } from '#app/utils/user-validation.js'
import { type BreadcrumbHandle } from './settings.tsx'


export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="pencil-1">Name</Icon>,
	getSitemapEntries: () => null,
}

const NameFormSchema = z.object({
	name: NameSchema,
})

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: { name: true },
	})
	return json({ user })
}

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = await parseWithZod(formData, {
		schema: NameFormSchema,
	})

	if (submission.status !== 'success') {
		return json({ status: 'error', submission } as const, { status: 400 })
	}

	const { name } = submission.value

	await prisma.user.update({
		where: { id: userId },
		data: { name },
	})

	return redirectWithToast('/user/settings', {
		title: 'Name Updated',
		description: `Your name has been changed to ${name}`,
		type: 'success',
	})
}

export default function NameRoute() {
	const data = useLoaderData<typeof loader>()
	const fetcher = useFetcher<typeof action>()

	const [form, fields] = useForm({
		id: 'name-form',
		constraint: getZodConstraint(NameFormSchema),
		lastResult: fetcher.data?.submission as any,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: NameFormSchema })
		},
		defaultValue: { name: data.user.name ?? '' },
	})

	return (
		<fetcher.Form method="POST" {...getFormProps(form)}>
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
	)
}