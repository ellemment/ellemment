import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import * as React from 'react'
import { Icon } from '#app/ellemment-ui/foundations/icons/icon'
import { Card } from '#app/ellemment-ui/shadcn/card'
import { GeneralErrorBoundary } from '#app/ellemment-ui/shared/error-boundary'
import { prisma } from '#app/utils/db.server'
import { useOptionalUser } from '#app/utils/user'

export async function loader({ params }: LoaderFunctionArgs) {
  const owner = await prisma.user.findFirst({
    select: {
      id: true,
      content: { 
        select: { 
          id: true, 
          title: true,
          createdAt: true 
        },
        orderBy: { createdAt: 'desc' }
      },
    },
    where: { username: params.username },
  })
  
  invariantResponse(owner, 'Owner not found', { status: 404 })
  return json({ owner })
}

export default function ContentRoute() {
  const data = useLoaderData<typeof loader>()
  const user = useOptionalUser()
  const location = useLocation()
  const isOwner = user?.id === data.owner.id
  const isRootPath = location.pathname.endsWith('/content')

  if (isRootPath) {
    return (
      <div className="mt-12 max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-4">
          {isOwner && (
            <Card className="transition-colors hover:bg-muted">
              <Link
                to="new"
                className="block p-4"
              >
                <div className="flex items-center gap-3">
                  <Icon name="plus-circled" className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Create an element</span>
                </div>
              </Link>
            </Card>
          )}

          {data.owner.content.map((content) => (
            <Card 
              key={content.id} 
              className="transition-colors hover:bg-muted"
            >
              <Link
                to={content.id}
                className="block p-4"
              >
                <div className="flex items-center gap-3">
                  <Icon name="check-circled" className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{content.title}</span>
                </div>
                <time 
                  className="mt-1 text-sm text-muted-foreground block"
                  dateTime={content.createdAt}
                >
                </time>
              </Link>
            </Card>
          ))}

          {data.owner.content.length === 0 && !isOwner && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No content found.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return <Outlet />
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => (
          <p>No user with the username "{params.username}" exists</p>
        ),
      }}
    />
  )
}