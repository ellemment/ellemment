// app/utils/content/image-module/types.ts

import { type FieldMetadata } from '@conform-to/react'
import { type ContentEditorData } from '#app/utils/content/schemas-module/schemas'
import { type ImageFieldset } from './schemas'

// Existing interfaces
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

// New interfaces from routes
export interface ImageUploadResult {
  id: string
  altText: string
  contentType: string
  blob: Buffer
  error?: string
}

export interface ImageProcessingResult {
  newImages?: ImageUploadResult[]
  removedImageIds?: string[]
  error?: string
}

export interface SerializedContentImage {
  id: string
  altText: string | null
}

// Used in route responses
export interface ImageUploadResponse {
  ok: boolean
  result: {
    status: 'success'
    data: {
      images: Array<{
        id: string
        altText: string
      }>
    }
  }
}