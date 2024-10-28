// #app/components/content/content-editor-module/content-edit-image-view.tsx

import { type FieldMetadata } from '@conform-to/react'
import { ErrorList } from '#app/components/core/forms'
import { Icon } from '#app/components/ui/icon'
import { type ImageFieldset } from '#app/utils/content-schemas/schemas'
import { cn } from '#app/utils/misc'

interface ImagePreviewProps {
    fields: ReturnType<FieldMetadata<ImageFieldset>['getFieldset']>
    previewImage: string | null
    altText: string
    existingImage: boolean
    setPreviewImage: (value: string | null) => void
    fileKey: string
    fileRestProps: Record<string, any>
    hiddenKey?: string
    hiddenRestProps?: Record<string, any>
  }
  
  export function ImagePreview({
    fields,
    previewImage,
    altText,
    existingImage,
    setPreviewImage,
    fileKey,
    fileRestProps,
    hiddenKey,
    hiddenRestProps,
  }: ImagePreviewProps) {
    return (
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
            <PreviewContent
              previewImage={previewImage}
              altText={altText}
              existingImage={existingImage}
            />
            {existingImage ? (
              <input key={hiddenKey} {...hiddenRestProps} />
            ) : null}
            <FileInput
              fileKey={fileKey}
              fileRestProps={fileRestProps}
              setPreviewImage={setPreviewImage}
            />
          </label>
        </div>
        <div className="min-h-[32px] px-4 pb-3 pt-1">
          <ErrorList id={fields.file.errorId} errors={fields.file.errors} />
        </div>
      </div>
    )
  }
  
  function PreviewContent({
    previewImage,
    altText,
    existingImage,
  }: {
    previewImage: string | null
    altText: string
    existingImage: boolean
  }) {
    if (previewImage) {
      return (
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
      )
    }
  
    return (
      <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground">
        <Icon name="plus" />
      </div>
    )
  }
  
  function FileInput({
    fileKey,
    fileRestProps,
    setPreviewImage,
  }: {
    fileKey: string
    fileRestProps: Record<string, any>
    setPreviewImage: (value: string | null) => void
  }) {
    return (
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
    )
  }