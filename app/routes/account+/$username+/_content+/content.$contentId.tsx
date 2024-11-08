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
} from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { ContentView } from '#app/components/content/view-module/content-view.js'
import { GeneralErrorBoundary } from '#app/components/core/error-boundary'
import { requireUserId } from '#app/utils/auth.server'
import { jsonToHtml } from '#app/utils/content/markdown-module/tiptap.server.js'
import { DeleteFormSchema } from '#app/utils/content/types-module/types.js'
import { prisma } from '#app/utils/db.server'
import { requireUserWithPermission } from '#app/utils/permissions.server'
import { redirectWithToast } from '#app/utils/toast.server'
import { userHasPermission, useOptionalUser } from '#app/utils/user'
import { type loader as contentLoader } from './content'

export async function loader({ params }: LoaderFunctionArgs) {
  const content = await prisma.content.findUnique({
    where: { id: params.contentId },
    select: {
      id: true,
      title: true,
      content: true,
      ownerId: true,
      updatedAt: true,
      images: {
        select: {
          id: true,
          altText: true,
        },
      },
    },
  })
  invariantResponse(content, 'Not found', { status: 404 })

  // Convert markdown content to HTML for display
  const processedContent = jsonToHtml(content.content)
  
  const date = new Date(content.updatedAt)
  const timeAgo = formatDistanceToNow(date)
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
  const intent = formData.get('intent')

  if (intent === 'delete-content') {
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

  // Handle other intents here if needed
  return json({ error: 'Invalid intent' }, { status: 400 })
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
    <ContentView
      content={data.content}
      timeAgo={data.timeAgo}
      canDelete={canDelete}
      isOwner={isOwner}
    />
  )
}

export const meta: MetaFunction<
  typeof loader,
  { 'routes/users+/$username_+/content': typeof contentLoader }
> = ({ data, params, matches }) => {
  const contentMatch = matches.find(
    (m) => m.id === 'routes/users+/$username_+/content',
  )
  const displayName = contentMatch?.data?.owner.name ?? params.username
  const contentTitle = data?.content.title ?? 'Content'
  const contentContentsSummary =
    data && data.content.content.length > 100
      ? data?.content.content.slice(0, 97) + '...'
      : 'No content'
  return [
    { title: `${contentTitle} | ${displayName}'s Content | Epic Content` },
    {
      name: 'description',
      content: contentContentsSummary,
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