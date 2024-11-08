// #app/routes/account+/$username+/_content+/content.$contentId_.tsx

import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from '@remix-run/node'
import {
  useLoaderData,
  type MetaFunction,
  Link,
} from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { DeleteContent } from '#app/components/content/editor-module/content-edit'
import { GeneralErrorBoundary } from '#app/components/core/error-boundary'
import { Button } from '#app/components/ui/button'
import { Icon } from '#app/components/ui/icon'
import { requireUserId } from '#app/utils/auth.server'
import { getContentImgSrc } from '#app/utils/content/image-module'
import { jsonToHtml } from '#app/utils/content/markdown-module/tiptap.server.js'
import { DeleteFormSchema } from '#app/utils/content/types-module/types.js'
import { prisma } from '#app/utils/db.server'
import { requireUserWithPermission } from '#app/utils/permissions.server'
import { redirectWithToast } from '#app/utils/toast.server'
import { userHasPermission, useOptionalUser } from '#app/utils/user'


export async function loader({ params }: LoaderFunctionArgs) {
  const content = await prisma.content.findUnique({
    where: { id: params.contentId },
    select: {
      id: true,
      title: true,
      content: true,
      ownerId: true,
      updatedAt: true,
      owner: {
        select: {
          username: true
        }
      },
      images: {
        select: {
          id: true,
          altText: true,
          contentId: true,
        },
      },
    },
  })
  invariantResponse(content, 'Not found', { status: 404 })

  const processedContent = jsonToHtml(content.content)
  const timeAgo = formatDistanceToNow(new Date(content.updatedAt))
  
  return json({
    content: {
      ...content,
      content: processedContent,
    },
    timeAgo,
  })
}
export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const submission = parseWithZod(formData, {
    schema: DeleteFormSchema,
  })

  if (submission.status !== 'success') {
    return json(
      { result: submission.reply() },
      { status: submission.status === 'error' ? 400 : 200 },
    )
  }

  const { contentId } = submission.value
  const content = await prisma.content.findFirst({
    select: { id: true, ownerId: true, owner: { select: { username: true } } },
    where: { id: contentId },
  })
  
  invariantResponse(content, 'Not found', { status: 404 })
  
  const isOwner = content.ownerId === userId
  await requireUserWithPermission(
    request,
    isOwner ? `delete:content:own` : `delete:content:any`,
  )
  
  await prisma.content.delete({ where: { id: content.id } })
  
  return redirectWithToast(`/account/${content.owner.username}/content`, {
    type: 'success',
    title: 'Success',
    description: 'Your content has been deleted.',
  })
}

function ImageGallery({ images }: { images: Array<{ id: string; altText: string | null }> }) {
  return (
    <div className="space-y-4">
      {images.map(image => (
        <img 
          key={image.id}
          src={getContentImgSrc(image.id)}
          alt={image.altText || ''}
          className="rounded-lg max-h-96 w-full object-cover"
        />
      ))}
    </div>
  )
}

export default function ContentRoute() {
  const data = useLoaderData<typeof loader>()
  const user = useOptionalUser()
  
  const isOwner = user?.id === data.content.ownerId
  const canDelete = userHasPermission(
    user,
    isOwner ? `delete:content:own` : `delete:content:any`,
  )
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">{data.content.title}</h1>
            <p className="text-sm text-muted-foreground">Updated {data.timeAgo} ago</p>
          </div>
          <div className="flex items-center gap-4">
            {isOwner && (
              <Button asChild variant="outline">
                <Link to="edit">
                  <Icon name="pencil-2" className="mr-2" />
                  Edit
                </Link>
              </Button>
            )}
            {canDelete && <DeleteContent id={data.content.id} />}
          </div>
        </div>
        
        {data.content.images && data.content.images.length > 0 && (
          <ImageGallery images={data.content.images} />
        )}
        
        <div 
          className="prose prose-zinc dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content.content }}
        />
      </div>
    </div>
  )
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const contentTitle = data?.content.title ?? 'Content'
  const contentSummary =
    data && data.content.content.length > 100
      ? data.content.content.slice(0, 97) + '...'
      : 'No content'
      
  return [
    { title: `${contentTitle} | Epic Content` },
    {
      name: 'description',
      content: contentSummary,
    },
  ]
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        403: () => <p>You are not allowed to do that</p>,
        404: ({ params }) => (
          <p>No content with the id "{params.contentId}" exists</p>
        ),
      }}
    />
  )
}