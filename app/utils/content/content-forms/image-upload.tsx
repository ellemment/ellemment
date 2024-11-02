// #app/utils/content/content-forms/image-upload.tsx

// #app/utils/content/content-forms/image-upload.ts

import { createId as cuid } from '@paralleldrive/cuid2'
import { type ImageFieldset } from '../content-schemas/schemas'

/**
 * Type guard to check if an image has a file
 */
export function imageHasFile(
  image: ImageFieldset,
): image is ImageFieldset & { file: NonNullable<ImageFieldset['file']> } {
  return Boolean(image.file?.size && image.file?.size > 0)
}

/**
 * Type guard to check if an image has an ID
 */
export function imageHasId(
  image: ImageFieldset,
): image is ImageFieldset & { id: NonNullable<ImageFieldset['id']> } {
  return image.id != null
}

/**
 * Represents a processed image ready for database storage
 */
export interface ProcessedImage {
  id?: string
  altText?: string | null
  contentType: string
  blob: Buffer
}

/**
 * Represents an image update operation
 */
export interface ImageUpdate {
  id: string
  altText?: string | null
  contentType?: string
  blob?: Buffer
}

/**
 * Configuration for image processing
 */
export interface ImageProcessingConfig {
  generateId?: () => string
  maxImages?: number
}

/**
 * Result of image processing
 */
export interface ImageProcessingResult {
  newImages: ProcessedImage[]
  imageUpdates: ImageUpdate[]
  deletedImageIds: string[]
}

/**
 * Processes an array of images for database operations
 */
export async function processImages(
  images: ImageFieldset[] = [],
  existingImageIds: string[] = [],
  config: ImageProcessingConfig = {},
): Promise<ImageProcessingResult> {
  const { generateId = cuid } = config

  // Process existing images that need updates
  const imageUpdates = await Promise.all(
    images.filter(imageHasId).map(async (image) => {
      if (imageHasFile(image)) {
        // Image has a new file, create update with new blob
        return {
          id: image.id,
          altText: image.altText,
          contentType: image.file.type,
          blob: Buffer.from(await image.file.arrayBuffer()),
        }
      } else {
        // Only alt text update
        return {
          id: image.id,
          altText: image.altText,
        }
      }
    }),
  )

  // Process new images
  const newImages = await Promise.all(
    images
      .filter(imageHasFile)
      .filter((i) => !i.id)
      .map(async (image) => ({
        id: generateId(),
        altText: image.altText,
        contentType: image.file.type,
        blob: Buffer.from(await image.file.arrayBuffer()),
      })),
  )

  // Determine which existing images should be deleted
  const updatedImageIds = imageUpdates.map((update) => update.id)
  const deletedImageIds = existingImageIds.filter(
    (id) => !updatedImageIds.includes(id),
  )

  return {
    newImages,
    imageUpdates,
    deletedImageIds,
  }
}

/**
 * Generates database operations for image updates
 */
export function generateImageDbOperations(
  result: ImageProcessingResult,
) {
  return {
    deleteMany: { 
      id: { 
        in: result.deletedImageIds 
      } 
    },
    updateMany: result.imageUpdates.map((update) => ({
      where: { id: update.id },
      data: {
        ...update,
        id: update.blob ? cuid() : update.id,
      },
    })),
    create: result.newImages,
  }
}