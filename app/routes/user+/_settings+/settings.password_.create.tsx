// app/routes/user+/_settings+/settings.password_.create.tsx

import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { Icon } from '#app/interface/foundations/icons/icon'
import { Button } from "#app/interface/shadcn/button"
import { ErrorList, Field } from '#app/interface/shared/forms'
import { StatusButton } from '#app/interface/shared/status-button'
import { getPasswordHash, requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { useIsPending } from '#app/utils/misc.js'
import { PasswordAndConfirmPasswordSchema } from '#app/utils/user-validation.js'
import { type BreadcrumbHandle } from './settings.tsx'

export const handle: BreadcrumbHandle & SEOHandle = {
  breadcrumb: <Icon name="dots-horizontal">Password</Icon>,
  getSitemapEntries: () => null,
}

const CreatePasswordForm = PasswordAndConfirmPasswordSchema

async function requireNoPassword(userId: string) {
  const user = await prisma.user.findUnique({
    select: { username: true, password: { select: { userId: true } } },
    where: { id: userId },
  })
  if (user?.password) {
    throw redirect(`/users/${user.username}/settings/passoword`)
  }
  return user?.username
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  await requireNoPassword(userId)
  return json({})
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  const username = await requireNoPassword(userId)
  const formData = await request.formData()
  const submission = await parseWithZod(formData, {
    async: true,
    schema: CreatePasswordForm,
  })

  if (submission.status !== 'success') {
    return json(
      {
        result: submission.reply({
          hideFields: ['password', 'confirmPassword'],
        }),
      },
      { status: submission.status === 'error' ? 400 : 200 },
    )
  }

  const { password } = submission.value

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: {
        create: {
          hash: await getPasswordHash(password),
        },
      },
    },
  })

  return redirect(`/users/${username}/settings`, { status: 302 })
}

export default function CreatePasswordRoute() {
  const actionData = useActionData<typeof action>()
  const isPending = useIsPending()

  const [form, fields] = useForm({
    id: 'password-create-form',
    constraint: getZodConstraint(CreatePasswordForm),
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreatePasswordForm })
    },
    shouldRevalidate: 'onBlur',
  })

  return (
    <Form method="POST" {...getFormProps(form)} className="mx-auto max-w-md">
      <Field
        labelProps={{ children: 'New Password' }}
        inputProps={{
          ...getInputProps(fields.password, { type: 'password' }),
          autoComplete: 'new-password',
        }}
        errors={fields.password.errors}
      />
      <Field
        labelProps={{ children: 'Confirm New Password' }}
        inputProps={{
          ...getInputProps(fields.confirmPassword, {
            type: 'password',
          }),
          autoComplete: 'new-password',
        }}
        errors={fields.confirmPassword.errors}
      />
      <ErrorList id={form.errorId} errors={form.errors} />
      <div className="grid w-full grid-cols-2 gap-6">
        <Button variant="secondary" asChild>
          <Link to="..">Cancel</Link>
        </Button>
        <StatusButton
          type="submit"
          status={isPending ? 'pending' : form.status ?? 'idle'}
        >
          Create Password
        </StatusButton>
      </div>
    </Form>
  )
}