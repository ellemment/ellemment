// #app/components/content/content-editor-module/content-edit-form.tsx

import { type Content, type ContentImage } from '@prisma/client'
import { type SerializeFrom } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { ErrorList } from '#app/components/core/forms'
import { type FormFields } from '#app/utils/content-types/types'
import { ContentEditBody } from './content-edit-body'
import { ContentEditImages } from './content-edit-images'
import { ContentEditTitle } from './content-edit-title'
import { ContentEditToolbar } from './content-edit-toolbar'

interface ContentFormProps {
  form: {
    id: string
    ref: React.RefObject<HTMLFormElement>
    reset: { getButtonProps: () => Record<string, unknown> }
    remove: {
      getButtonProps: (props: {
        name: string
        index: number
      }) => Record<string, unknown>
    }
    insert: { getButtonProps: (props: { name: string }) => Record<string, unknown> }
    errorId?: string
    errors?: string[]
  }
  fields: FormFields
  content?: SerializeFrom<
    Pick<Content, 'id' | 'title' | 'content'> & {
      images: Array<Pick<ContentImage, 'id' | 'altText'>>
    }
  >
  isPending: boolean
}

export function ContentForm({ form, fields, content, isPending }: ContentFormProps) {
  return (
    <Form
      method="POST"
      className="flex h-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden px-10 pb-28 pt-12"
      ref={form.ref}
      id={form.id}
      encType="multipart/form-data"
    >
      <button type="submit" className="hidden" />
      {content ? <input type="hidden" name="id" value={content.id} /> : null}

      <div className="flex flex-col gap-1">
        <ContentEditTitle field={fields.title} />
        <ContentEditBody field={fields.content} />
        <ContentEditImages field={fields.images} form={form} />
      </div>

      <ErrorList id={form.errorId} errors={form.errors ?? []} />

      <ContentEditToolbar 
        formId={form.id}
        isPending={isPending}
        reset={form.reset}
      />
    </Form>
  )
}