// #app/components/tiptap/modules/lib/utils/editor.ts
import { createId as cuid } from '@paralleldrive/cuid2'
import { type EditorView } from "@tiptap/pm/view"
import { toast } from "react-hot-toast"
import { type ImageFieldset, MAX_UPLOAD_SIZE } from '#app/utils/content/content-schemas/schemas.js'
import { getContentImgSrc } from '#app/utils/misc'

export const handleImageUpload = async (
  file: File,
  view: EditorView,
  event: ClipboardEvent | DragEvent | Event
): Promise<void> => {
  // Check if the file is an image
  if (!file.type.includes("image/")) {
    toast.error("File type not supported.")
    return
  }

  // Check file size
  if (file.size > MAX_UPLOAD_SIZE) {
    toast.error(`File size too big (max ${Math.floor(MAX_UPLOAD_SIZE / 1024 / 1024)}MB).`)
    return
  }

  // #app/components/tiptap/modules/lib/utils/editor.ts
  const insertImage = async (file: File): Promise<void> => {
    // Guard against server-side execution
    if (typeof window === 'undefined') return

    try {
      const formData = new FormData()
      const imageId = cuid()

      formData.append('images[0][file]', file)
      formData.append('images[0][altText]', file.name)

      // Rest of your code...
    } catch (error) {
      console.error('Error handling image upload:', error)
      throw error
    }
  }

  try {
    await toast.promise(
      insertImage(file),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: "Failed to upload image.",
      }
    )
  } catch (error) {
    console.error('Error handling image upload:', error)
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