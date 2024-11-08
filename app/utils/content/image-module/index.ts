// app/utils/content/image-module/index.ts

export * from './types'
export * from './schemas'
export * from './hooks'


// Utility functions 
export function getContentImgSrc(imageId: string) {
  return `/resources/content-images/${imageId}`
}