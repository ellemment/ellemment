import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { AccountDashboard, dashboardNavItems } from '#app/interface/composite/account/account-dashboard'
import { Separator } from '#app/interface/shadcn/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#app/interface/shadcn/sidebar'
import { GeneralErrorBoundary } from '#app/interface/shared/error-boundary'
import { prisma } from '#app/utils/db.server'
import { useOptionalUser } from '#app/utils/user'

export async function loader({ params }: LoaderFunctionArgs) {
  const owner = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      username: true,
      createdAt: true,
      image: { select: { id: true } },
      content: {
        select: {
          id: true,
          title: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      }
    },
    where: { username: params.username },
  })

  invariantResponse(owner, 'Owner not found', { status: 404 })
  return json({ owner })
}

export default function ContentRoute() {
  const data = useLoaderData<typeof loader>()
  const loggedInUser = useOptionalUser()
  const location = useLocation()
  const isOwner = data.owner.id === loggedInUser?.id
  
  const currentPath = location.pathname.split('/').pop() || ''
  const pageTitle = dashboardNavItems
    .flatMap(section => section.items)
    .find(item => item.to.includes(currentPath))?.title || 'Elements'

  return (
    <div className="mx-auto max-w-7xl relative flex">
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-1">
          <AccountDashboard user={data.owner} />
          <SidebarInset className="bg-gray-300 dark:bg-secondary px-2">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 h-4" />
                <span className="text-lg font-semibold">{pageTitle}</span>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
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