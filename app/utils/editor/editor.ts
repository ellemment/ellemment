// #app/components/tiptap/modules/lib/utils/editor.ts
import { createId as cuid } from '@paralleldrive/cuid2'
import { type EditorView } from "@tiptap/pm/view"
import { toast } from "react-hot-toast"
import { type ImageFieldset, MAX_UPLOAD_SIZE } from '#app/utils/content/content-schemas/schemas.js'
import { getContentImgSrc } from '#app/utils/misc'

export async function handleImageUpload(
  file: File,
  view: EditorView,
  event: Event
) {
  event.preventDefault()

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
    const imageId = cuid()
    
    // Only send image-related data
    formData.append(`image.file`, file)
    formData.append(`image.id`, imageId)
    formData.append(`image.altText`, file.name)
    formData.append('intent', 'upload-image')

    const response = await fetch(window.location.pathname, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const data = await response.json()
      console.error('Upload error:', data)
      throw new Error(data.message || 'Upload failed')
    }

    // Insert image into editor
    if (view.state.schema.nodes.image) {
      const node = view.state.schema.nodes.image.create({
        src: getContentImgSrc(imageId), // Use the actual image URL
        alt: file.name,
        imageId: imageId
      })
      const transaction = view.state.tr.replaceSelectionWith(node)
      view.dispatch(transaction)
    }

  } catch (error) {
    console.error('Error uploading image:', error)
    toast.error('Failed to upload image')
  }
}

// Optional: Helper function to extract images from editor content
export function extractImagesFromContent(content: any): ImageFieldset[] {
  const images: ImageFieldset[] = []
  const traverse = (node: any) => {
    if (node.type === 'image' && node.attrs?.imageId) {
      images.push({
        id: node.attrs.imageId,
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