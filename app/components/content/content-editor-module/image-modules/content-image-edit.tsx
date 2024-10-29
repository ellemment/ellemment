// #app/components/content/content-editor-module/content-edit-images.tsx
import { type FieldMetadata } from '@conform-to/react'
import { Button } from '#app/components/ui/button'
import { Icon } from '#app/components/ui/icon'
import { Label } from '#app/components/ui/label'
import { type ContentEditorData, type ImageFieldset } from '#app/utils/content/content-schemas/schemas.js'
import { ImageChooser } from './content-image-choose'

interface ContentEditImagesProps {
  field: FieldMetadata<ImageFieldset[], ContentEditorData, string[]> & {
    getFieldList: () => Array<FieldMetadata<ImageFieldset, ContentEditorData, string[]>>
  }
  form: {
    remove: {
      getButtonProps: (props: {
        name: string
        index: number
      }) => Record<string, unknown>
    }
    insert: { getButtonProps: (props: { name: string }) => Record<string, unknown> }
  }
}

export function ContentEditImages({ field, form }: ContentEditImagesProps) {
  const imageList = field.getFieldList()
  
  return (
    <div>
      <Label>Images</Label>
      <ul className="flex flex-col gap-4">
        {imageList.map((image, index: number) => {
          // Create a unique key using multiple values if needed
          const uniqueKey = `${image.key}-${index}-${image.id || 'new'}`
          
          return (
            <li
              key={uniqueKey}
              className="relative border-b-2 border-muted-foreground"
            >
              <button
                className="absolute right-0 top-0 text-foreground-destructive"
                {...form.remove.getButtonProps({
                  name: field.name,
                  index,
                })}
              >
                <span aria-hidden>
                  <Icon name="cross-1" />
                </span>{' '}
                <span className="sr-only">
                  Remove image {index + 1}
                </span>
              </button>
              <ImageChooser meta={image} />
            </li>
          )
        })}
      </ul>
      <Button
        className="mt-3"
        {...form.insert.getButtonProps({ name: field.name })}
      >
        <span aria-hidden>
          <Icon name="plus">Image</Icon>
        </span>{' '}
        <span className="sr-only">Add image</span>
      </Button>
    </div>
  )
}