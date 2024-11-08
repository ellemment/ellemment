// #app/utils/content/image-module/upload.ts

import { Buffer } from 'buffer'
import {
    unstable_createMemoryUploadHandler,
    json,
    unstable_parseMultipartFormData as parseMultipartFormData,
  } from '@remix-run/node'
import { MAX_UPLOAD_SIZE } from '#app/utils/content/schemas-module/schemas'
import { type ImageProcessingResult, type ImageUploadResult } from './types'

export async function parseMultipartFormDataWithImage(request: Request) {
  return parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler({ 
      maxPartSize: MAX_UPLOAD_SIZE,
      filter: ({ contentType }) => contentType?.includes('image/') ?? false 
    })
  )
}

export async function processImage(file: File): Promise<ImageUploadResult | null> {
  if (!file) return null
  
  try {
    const arrayBuffer = await file.arrayBuffer()
    const blob = Buffer.from(arrayBuffer)
    
    return {
      id: crypto.randomUUID(),
      altText: file.name.split('.')[0] || file.name || 'Untitled',
      contentType: file.type || 'application/octet-stream',
      blob
    }
  } catch (error) {
    console.error('Failed to process image:', error)
    return null
  }
}

export async function processImages(
  images: Array<{ file?: File; id?: string; altText?: string }>,
  existingImageIds: string[]
): Promise<ImageProcessingResult> {
  try {
    // Handle removed images
    const removedImageIds = existingImageIds.filter(
      id => !images.find(img => img.id === id)
    )

    // Process new images
    const newImagePromises = images
      .filter(img => img.file)
      .map(async img => {
        const result = await processImage(img.file!)
        if (result) {
          return {
            ...result,
            altText: img.altText || result.altText
          }
        }
        return null
      })

    const processedImages = await Promise.all(newImagePromises)
    const newImages = processedImages.filter((img): img is ImageUploadResult => img !== null)

    return { newImages, removedImageIds }
  } catch (error) {
    console.error('Failed to process images:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to process images'
    }
  }
}

export function generateImageDbOperations(result: ImageProcessingResult) {
  const operations: {
    create?: Array<{
      id: string
      altText: string
      contentType: string
      blob: Buffer
    }>
    delete?: Array<{ id: string }>
  } = {}

  if (result.newImages?.length) {
    operations.create = result.newImages.map(img => ({
      id: img.id,
      altText: img.altText,
      contentType: img.contentType,
      blob: img.blob
    }))
  }

  if (result.removedImageIds?.length) {
    operations.delete = result.removedImageIds.map(id => ({ id }))
  }

  return operations
}

export function createImageUploadResponse(result: ImageProcessingResult) {
  if (result.error || !result.newImages?.length) {
    return json({
      error: result.error || 'No images were processed'
    }, { status: 400 })
  }

  return json({
    ok: true,
    result: {
      status: 'success',
      data: {
        images: result.newImages.map(img => ({
          id: img.id,
          altText: img.altText
        }))
      }
    }
  })
}