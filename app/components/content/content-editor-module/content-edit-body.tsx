
import { type FieldMetadata } from '@conform-to/react'
import { TextareaField } from '#app/components/core/forms'
import { type ContentEditorData } from '#app/utils/content-schemas/schemas'

interface ContentEditBodyProps {
  field: FieldMetadata<string, ContentEditorData, string[]>
}

export function ContentEditBody({ field }: ContentEditBodyProps) {
  return (
    <TextareaField
      labelProps={{ children: 'Content' }}
      textareaProps={{
        name: 'content',
      }}
      errors={field.errors}
    />
  )
}