// #app/utils/content-schemas/schemas.ts

import { z } from 'zod'

// Constants
export const titleMinLength = 1
export const titleMaxLength = 100
export const contentMinLength = 1
export const contentMaxLength = 10000
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

// Schemas
export const ImageFieldsetSchema = z.object({
  id: z.string().optional(),
  file: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE
    }, 'File size must be less than 3MB'),
  altText: z.string().optional(),
})

export const ContentEditorSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(titleMinLength).max(titleMaxLength),
  content: z.string().min(contentMinLength).max(contentMaxLength),
  images: z.array(ImageFieldsetSchema).max(5).optional(),
})

export const DeleteFormSchema = z.object({
  intent: z.literal('delete-content'),
  contentId: z.string(),
})

// Types
export type ImageFieldset = z.infer<typeof ImageFieldsetSchema>
export type ContentEditorData = z.infer<typeof ContentEditorSchema>
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