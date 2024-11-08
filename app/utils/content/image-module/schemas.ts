// app/utils/content/image-module/schemas.ts

import { z } from 'zod'

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

export const ImageFieldsetSchema = z.object({
  id: z.string().optional(),
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      'File size must be less than 3MB'
    ),
  altText: z.string().optional(),
})

export type ImageFieldset = z.infer<typeof ImageFieldsetSchema>