// #app/components/content/content-editor-module/content-edit-image-choose.tsx

import { type FieldMetadata, getFieldsetProps, getInputProps, getTextareaProps } from '@conform-to/react'
import { useState } from 'react'
import { ErrorList } from '#app/components/core/forms'
import { Icon } from '#app/components/ui/icon'
import { Label } from '#app/components/ui/label'
import { Textarea } from '#app/components/ui/textarea'
import  { type ImageFieldset } from '#app/utils/content-schemas/schemas'
import { cn, getContentImgSrc } from '#app/utils/misc'

export function ImageChooser({ meta }: { meta: FieldMetadata<ImageFieldset> }) {
    const fields = meta.getFieldset()
    const existingImage = Boolean(fields.id.initialValue)
    const [previewImage, setPreviewImage] = useState<string | null>(
      fields.id.initialValue ? getContentImgSrc(fields.id.initialValue) : null,
    )
    const [altText, setAltText] = useState(fields.altText.initialValue ?? '')
  
    // Handle textarea props
    const textareaProps = getTextareaProps(fields.altText)
    const { key: textareaKey, ...textareaRestProps } = textareaProps
  
    // Handle file input props
    const fileInputProps = getInputProps(fields.file, { type: 'file' })
    const { key: fileKey, ...fileRestProps } = fileInputProps
  
    // Handle hidden input props if needed
    const hiddenInputProps = existingImage ? getInputProps(fields.id, { type: 'hidden' }) : null
    const { key: hiddenKey, ...hiddenRestProps } = hiddenInputProps || {}
  
    return (
      <fieldset {...getFieldsetProps(meta)}>
        <div className="flex gap-3">
          <div className="w-32">
            <div className="relative h-32 w-32">
              <label
                htmlFor={fields.file.id}
                className={cn('group absolute h-32 w-32 rounded-lg', {
                  'bg-accent opacity-40 focus-within:opacity-100 hover:opacity-100':
                    !previewImage,
                  'cursor-pointer focus-within:ring-2': !existingImage,
                })}
              >
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt={altText ?? ''}
                      className="h-32 w-32 rounded-lg object-cover"
                    />
                    {existingImage ? null : (
                      <div className="pointer-events-none absolute -right-0.5 -top-0.5 rotate-12 rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow-md">
                        new
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground">
                    <Icon name="plus" />
                  </div>
                )}
                {existingImage ? (
                  <input key={hiddenKey} {...hiddenRestProps} />
                ) : null}
                <input
                  key={fileKey}
                  aria-label="Image"
                  className="absolute left-0 top-0 z-0 h-32 w-32 cursor-pointer opacity-0"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setPreviewImage(reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    } else {
                      setPreviewImage(null)
                    }
                  }}
                  accept="image/*"
                  {...fileRestProps}
                />
              </label>
            </div>
            <div className="min-h-[32px] px-4 pb-3 pt-1">
              <ErrorList id={fields.file.errorId} errors={fields.file.errors} />
            </div>
          </div>
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
        </div>
        <div className="min-h-[32px] px-4 pb-3 pt-1">
          <ErrorList id={meta.errorId} errors={meta.errors} />
        </div>
      </fieldset>
    )
  }