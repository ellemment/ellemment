// app/utils/content/image-module/types.ts

import { type FieldMetadata } from '@conform-to/react'
import { type ContentEditorData } from '#app/utils/content/schemas-module/schemas'
import { type ImageFieldset } from './schemas'

export interface ImageChooserProps {
  meta: FieldMetadata<ImageFieldset>
  index: number
}

export interface ContentEditImagesProps {
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

export interface ImagePreviewState {
  url: string | null
  file?: File
}