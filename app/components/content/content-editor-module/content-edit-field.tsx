// #app/components/content/content-editor-module/content-edit-field.tsx

import { ErrorList } from '#app/components/core/forms'
import { Label } from '#app/components/ui/label'
import { Textarea } from '#app/components/ui/textarea'
import { type AltTextInputProps } from '#app/utils/content-types/types'

export function AltTextInput({
  fields,
  textareaKey,
  textareaRestProps,
  setAltText,
}: AltTextInputProps) {
  return (
    <div className="flex-1">
      <Label htmlFor={fields.altText.id}>Alt Text</Label>
      <Textarea
        key={textareaKey}
        onChange={(e) => setAltText(e.currentTarget.value)}
        {...textareaRestProps}
      />
      <div className="min-h-[32px] px-4 pb-3 pt-1">
        <ErrorList
          id={fields.altText.errorId}
          errors={fields.altText.errors}
        />
      </div>
    </div>
  )
}