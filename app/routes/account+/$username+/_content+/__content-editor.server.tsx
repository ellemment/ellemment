// #app/routes/account+/$username+/_content+/__content-editor.server.tsx

import { parseWithZod } from '@conform-to/zod'
import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect,
  type ActionFunctionArgs,
} from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server'
import { processImages, generateImageDbOperations } from '#app/utils/content/forms-module/image-upload'
import { MAX_UPLOAD_SIZE } from '#app/utils/content/image-module'
import {
  ContentEditorSchema,
} from '#app/utils/content/schemas-module/schemas'
import { prisma } from '#app/utils/db.server'

export async function handleContentSubmission(
  request: Request,
  userId: string,
  submission: Awaited<ReturnType<typeof parseWithZod>>,
) {
  if (submission.status !== 'success') {
    return json(
      { result: submission.reply() },
      { status: submission.status === 'error' ? 400 : 200 },
    )
  }

  const {
    id: contentId,
    title,
    content,
    images = [],
  } = submission.value

  // Get existing image IDs if updating content
  const existingImageIds = contentId
    ? (
      await prisma.content.findUnique({
        where: { id: contentId },
        select: { images: { select: { id: true } } },
      })
    )?.images.map((img) => img.id) ?? []
    : []

  // Process images
  const imageProcessingResult = await processImages(images, existingImageIds)

  // Generate database operations
  const imageOperations = generateImageDbOperations(imageProcessingResult)

  const updatedContent = await prisma.content.upsert({
    select: { id: true, owner: { select: { username: true } } },
    where: { id: contentId ?? '__new_content__' },
    create: {
      ownerId: userId,
      title,
      content,
      images: { create: imageOperations.create },
    },
    update: {
      title,
      content,
      images: imageOperations,
    },
  })

  return redirect(
    `/account/${updatedContent.owner.username}/content/${updatedContent.id}`,
  )
}




export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  
  // Use a regular formData parse first to check intent
  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()
  const intent = formData.get('intent')

  if (intent === 'upload-image') {
    try {
      const formData = await parseMultipartFormData(
        request,
        createMemoryUploadHandler({ 
          maxPartSize: MAX_UPLOAD_SIZE,
          filter: ({ contentType }) => contentType?.includes('image/') ?? false 
        }),
      )

      const submission = await parseWithZod(formData, {
        schema: ContentEditorSchema.pick({ images: true }),
        async: true,
      })

      if (submission.status !== 'success') {
        return json({
          error: 'Invalid submission',
          details: submission.reply()
        }, { status: 400 })
      }

      const { images = [] } = submission.value
      
      // Process images
      const imageProcessingResult = await processImages(images, [])
      
      if (!imageProcessingResult.newImages?.length) {
        return json({
          error: 'No images were processed'
        })
      }
      
      return json({
        ok: true,
        result: {
          status: 'success',
          data: {
            images: imageProcessingResult.newImages.map(img => ({
              id: img.id,
              altText: img.altText
            }))
          }
        }
      })
    } catch (error) {
      console.error('Image upload error:', error)
      return json({
        error: error instanceof Error ? error.message : 'Failed to process image upload'
      }, { status: 500 })
    }
  }

  // Handle regular content submission
  const submission = await parseWithZod(formData, {
    schema: ContentEditorSchema.superRefine(async (data, ctx) => {
      if (!data.id) return
      const content = await prisma.content.findUnique({
        select: { id: true },
        where: { id: data.id, ownerId: userId },
      })
      if (!content) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Content not found',
        })
      }
    }),
    async: true,
  })

  return handleContentSubmission(request.clone(), userId, submission)
}