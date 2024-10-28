// #app/routes/account+/$username+/_content+/__content-editor.tsx

import { useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type Content, type ContentImage } from '@prisma/client'
import { type SerializeFrom } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { 
  ContentForm, 
} from '#app/components/content/content-editor-module/content-edit-form'
import { ContentEditorSchema } from '#app/utils/content-schemas/schemas'
import { type FormFields } from '#app/utils/content-types/types'
import { useIsPending } from '#app/utils/misc'
import { type action } from './__content-editor.server'

interface ContentEditorProps {
  content?: SerializeFrom<
    Pick<Content, 'id' | 'title' | 'content'> & {
      images: Array<Pick<ContentImage, 'id' | 'altText'>>
    }
  >
}

export function ContentEditor({ content }: ContentEditorProps) {
  const actionData = useActionData<typeof action>()
  const isPending = useIsPending()

  const [form, fields] = useForm({
    id: 'content-editor',
    constraint: getZodConstraint(ContentEditorSchema),
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ContentEditorSchema })
    },
    defaultValue: {
      ...content,
      images: content?.images ?? [{}],
    },
    shouldRevalidate: 'onBlur',
  })

  const formProps = {
    id: form.id,
    ref: { current: null }, 
    reset: form.reset,
    remove: form.remove,
    insert: form.insert,
    errorId: form.errorId,
    errors: form.errors as string[],
  }

  return (
    <div className="absolute inset-0">
      <ContentForm
        form={formProps}
        fields={fields as FormFields}
        content={content}
        isPending={isPending}
      />
    </div>
  )
}
