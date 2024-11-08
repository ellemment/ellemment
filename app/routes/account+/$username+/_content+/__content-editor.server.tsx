// #app/routes/account+/$username+/_content+/__content-editor.server.tsx

import { parseWithZod } from '@conform-to/zod'
import {
  json,
  redirect,
  type ActionFunctionArgs,
} from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server'
import { 
  processImages, 
  generateImageDbOperations,
  parseMultipartFormDataWithImage, 
  createImageUploadResponse 
} from '#app/utils/content/image-module/upload'
import { ContentEditorSchema } from '#app/utils/content/schemas-module/schemas'
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

  const imageProcessingResult = await processImages(images, existingImageIds)
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
  
  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()
  const intent = formData.get('intent')

  if (intent === 'upload-image') {
    try {
      const formData = await parseMultipartFormDataWithImage(request)
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
      const imageProcessingResult = await processImages(images, [])
      return createImageUploadResponse(imageProcessingResult)
      
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