// #app/utils/editor/image-handler.ts
import { type Editor } from '@tiptap/core'
import { toast } from 'react-hot-toast'
import { getContentImgSrc } from '#app/utils/content/image-module'
import { type ImageFieldset, MAX_UPLOAD_SIZE } from '#app/utils/content/schemas-module/schemas.js'

interface ImageUploadResponse {
  error?: string
  result?: {
    status: 'success'
    data: {
      images: Array<{
        id: string
        altText: string | null
      }>
    }
  }
}

declare module '@tiptap/extension-image' {
  interface ImageOptions {
    inline: boolean
    allowBase64: boolean
  }
  interface ImageAttributes {
    src: string
    alt?: string
    title?: string
    'data-image-id'?: string
  }
}

export async function handleEditorImageUpload(
    file: File,
    editor: Editor,
) {
    if (!file.type.includes('image/')) {
      toast.error('File must be an image')
      return
    }
  
    if (file.size > MAX_UPLOAD_SIZE) {
      toast.error('Image must be less than 3MB')
      return
    }
  
    try {
      const formData = new FormData()
      formData.append('intent', 'upload-image')
      formData.append('images.0.file', file)
      formData.append('images.0.altText', file.name)
  
      const response = await fetch(window.location.pathname, {
        method: 'POST',
        body: formData,
      })
  
      let data: ImageUploadResponse
      
      try {
        data = await response.json()
      } catch (e) {
        console.error('JSON parse error:', e)
        const text = await response.text()
        console.error('Response text:', text)
        throw new Error('Invalid response format')
      }

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Upload failed')
      }
  
      if (!data.result?.data.images?.[0]) {
        throw new Error('No image data received')
      }
  
      const imageData = data.result.data.images[0]
      const imageUrl = getContentImgSrc(imageData.id)
  
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: {
            src: imageUrl,
            alt: imageData.altText || file.name,
            title: file.name,
            'data-image-id': imageData.id
          }
        })
        .run()
  
      return imageData.id
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload image')
      return null
    }
}

export function extractEditorImages(content: any): ImageFieldset[] {
  const images: ImageFieldset[] = []
  
  const traverse = (node: any) => {
    if (node.type === 'image' && node.attrs?.['data-image-id']) {
      images.push({
        id: node.attrs['data-image-id'],
        altText: node.attrs.alt || null,
      })
    }
    if (node.content) {
      node.content.forEach(traverse)
    }
  }
  
  traverse(content)
  return images
}