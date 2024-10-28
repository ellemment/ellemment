// #app/components/content/content-editor-module/content-edit-delete.tsx

import { getFormProps, useForm } from '@conform-to/react'
import { Form, useActionData } from '@remix-run/react'
import { ErrorList } from '#app/components/core/forms'
import { Icon } from '#app/components/ui/icon'
import { StatusButton } from '#app/components/ui/status-button'
import  { type ActionData } from '#app/utils/content-types/types'
import { useIsPending } from '#app/utils/misc'

interface DeleteContentProps {
  id: string
}

export function DeleteContent({ id }: DeleteContentProps) {
  const actionData = useActionData<ActionData>()
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
