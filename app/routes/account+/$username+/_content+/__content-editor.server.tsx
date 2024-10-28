// #app/routes/account+/$username+/_content+/__content-editor.server.tsx

import { parseWithZod } from '@conform-to/zod'
import { createId as cuid } from '@paralleldrive/cuid2'
import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect,
  type ActionFunctionArgs,
} from '@remix-run/node'
import { z } from 'zod'

import { requireUserId } from '#app/utils/auth.server'
import {
  ContentEditorSchema,
  MAX_UPLOAD_SIZE,
  type ImageFieldset,
} from '#app/utils/content-schemas/schemas'
import { prisma } from '#app/utils/db.server'

function imageHasFile(
  image: ImageFieldset,
): image is ImageFieldset & { file: NonNullable<ImageFieldset['file']> } {
  return Boolean(image.file?.size && image.file?.size > 0)
}

function imageHasId(
  image: ImageFieldset,
): image is ImageFieldset & { id: NonNullable<ImageFieldset['id']> } {
  return image.id != null
}

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
    imageUpdates = [],
    newImages = [],
  } = submission.value

  const updatedContent = await prisma.content.upsert({
    select: { id: true, owner: { select: { username: true } } },
    where: { id: contentId ?? '__new_content__' },
    create: {
      ownerId: userId,
      title,
      content,
      images: { create: newImages },
    },
    update: {
      title,
      content,
      images: {
        deleteMany: { id: { notIn: imageUpdates.map((i: { id: string }) => i.id) } },
        updateMany: imageUpdates.map((updates: { id: string; blob?: Buffer }) => ({
          where: { id: updates.id },
          data: { ...updates, id: updates.blob ? cuid() : updates.id },
        })),
        create: newImages,
      },
    },
  })

  return redirect(
    `/account/${updatedContent.owner.username}/content/${updatedContent.id}`,
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)

  const formData = await parseMultipartFormData(
    request,
    createMemoryUploadHandler({ maxPartSize: MAX_UPLOAD_SIZE }),
  )

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
    }).transform(async ({ images = [], ...data }) => {
      return {
        ...data,
        imageUpdates: await Promise.all(
          images.filter(imageHasId).map(async (i) => {
            if (imageHasFile(i)) {
              return {
                id: i.id,
                altText: i.altText,
                contentType: i.file.type,
                blob: Buffer.from(await i.file.arrayBuffer()),
              }
            } else {
              return {
                id: i.id,
                altText: i.altText,
              }
            }
          }),
        ),
        newImages: await Promise.all(
          images
            .filter(imageHasFile)
            .filter((i) => !i.id)
            .map(async (image) => {
              return {
                altText: image.altText,
                contentType: image.file.type,
                blob: Buffer.from(await image.file.arrayBuffer()),
              }
            }),
        ),
      }
    }),
    async: true,
  })

  return handleContentSubmission(request, userId, submission)
}
