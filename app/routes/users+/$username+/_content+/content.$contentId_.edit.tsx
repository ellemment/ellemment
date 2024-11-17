// #app/routes/users+/$username+/_content+/content.$contentId_.edit.tsx

import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/ellemment-ui/shared/error-boundary'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import { ContentEditor } from './__content-editor'

export { action } from './__content-editor.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const content = await prisma.content.findFirst({
	  select: {
		id: true,
		title: true,
		content: true,
		images: {
		  select: {
			id: true,
			altText: true,
		  },
		},
	  },
	  where: {
		id: params.contentId,
		ownerId: userId,
	  },
	})
	
	invariantResponse(content, 'Not found', { status: 404 })
  
  
	return json({ 
	  content: {
		...content,
		content: content.content
	  } 
	})
  }
export default function EditContent() {
  const data = useLoaderData<typeof loader>()
  return <ContentEditor content={data.content} />
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => (
          <p>No content with the id "{params.contentId}" exists</p>
        ),
      }}
    />
  )
}
