// #app/components/content/content-editor-module/content-edit-title.tsx

import { type FieldMetadata } from '@conform-to/react'
import { Field } from '#app/components/core/forms'
import { type ContentEditorData } from '#app/utils/content-schemas/schemas'

interface ContentEditTitleProps {
  field: FieldMetadata<string, ContentEditorData, string[]>
}

export function ContentEditTitle({ field }: ContentEditTitleProps) {
  return (
    <Field
      labelProps={{ children: 'Title' }}
      inputProps={{
        autoFocus: true,
        name: 'title',
        type: 'text',
      }}
      errors={field.errors}
    />
  )
}