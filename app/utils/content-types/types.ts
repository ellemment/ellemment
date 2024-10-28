// #app/utils/content-types/types.ts


import { type FieldMetadata } from '@conform-to/react'
import { z } from 'zod'
import { type ImageFieldset } from '#app/utils/content-schemas/schemas'

export const DeleteFormSchema = z.object({
  intent: z.literal('delete-content'),
  contentId: z.string(),
})

export type ActionData = {
  result: {
    status: 'error' | 'success'
    errors?: Array<{ id?: string; message: string }>
  }
}

export interface ContentData {
  id: string
  title: string
  content: string
  ownerId: string
  images: Array<{ id: string; altText: string | null }>
}

export interface ContentViewData {
  id: string
  title: string
  content: string
  ownerId: string
  images: Array<ContentImageData>
}

export interface ContentImageData {
  id: string
  altText: string | null
}

export interface ContentToolbarProps {
  timeAgo: string
  contentId: string
  canDelete: boolean
  displayBar: boolean
}

export interface ImageGalleryProps {
  images: Array<ContentImageData>
}

export interface AltTextInputProps {
  fields: ReturnType<FieldMetadata<ImageFieldset>['getFieldset']>
  textareaKey: string
  textareaRestProps: Record<string, unknown>
  setAltText: (value: string) => void
}

// Add these new interfaces
export interface ContentTitleProps {
  title: string
}

export interface ContentBodyProps {
  content: string
  images: ContentImageData[]
  displayBar: boolean
}

export interface ContentViewProps {
  content: ContentViewData
  timeAgo: string
  canDelete: boolean
  isOwner: boolean
}


import { type SerializeFrom } from '@remix-run/node'
import { type Content, type ContentImage } from '@prisma/client'
import { type ContentEditorData } from '../content-schemas/schemas'

export interface FormFields {
  title: FieldMetadata<string, ContentEditorData, string[]>
  content: FieldMetadata<string, ContentEditorData, string[]>
  images: FieldMetadata<ImageFieldset[], ContentEditorData, string[]> & {
    getFieldList: () => Array<FieldMetadata<ImageFieldset, ContentEditorData, string[]>>
  }
}

export interface ContentFormProps {
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