import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, NavLink, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Plus, FileText } from 'lucide-react'
import * as React from 'react'
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from '#app/components/core/dashboard'
import { GeneralErrorBoundary } from '#app/components/core/error-boundary'
import { Avatar, AvatarFallback, AvatarImage } from '#app/components/ui/avatar'
import { prisma } from '#app/utils/db.server'
import { getUserImgSrc } from '#app/utils/misc'
import { useOptionalUser } from '#app/utils/user'


export async function loader({ params }: LoaderFunctionArgs) {
  const owner = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      username: true,
      image: { select: { id: true } },
      content: { select: { id: true, title: true } },
    },
    where: { username: params.username },
  })
  
  invariantResponse(owner, 'Owner not found', { status: 404 })
  return json({ owner })
}

function ContentSidebar() {
  const data = useLoaderData<typeof loader>()
  const user = useOptionalUser()
  const location = useLocation()
  const isOwner = user?.id === data.owner.id
  const ownerDisplayName = data.owner.name ?? data.owner.username

  return (
    <Sidebar variant="inset" className="col-span-1">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={`/account/${data.owner.username}`}>
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage
                    src={getUserImgSrc(data.owner.image?.id)}
                    alt={ownerDisplayName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {ownerDisplayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{ownerDisplayName}</span>
                  <span className="truncate text-xs">{ownerDisplayName}'s Content</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            {isOwner ? (
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="New Content">
                  <NavLink to="new">
                    <Plus className="h-4 w-4" />
                    <span>New Content</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : null}
            
            {data.owner.content.map((content) => (
              <SidebarMenuItem key={content.id}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={content.title}
                  isActive={location.pathname.includes(content.id)}
                >
                  <NavLink
                    to={content.id}
                    preventScrollReset
                    prefetch="intent"
                  >
                    <FileText className="h-4 w-4" />
                    <span>{content.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default function ContentRoute() {
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    <SidebarProvider defaultOpen>
      <div className="container flex h-full min-h-[400px] px-0 pb-12">
        <div className="grid w-full md:grid-cols-4 bg-muted md:mx-auto md:rounded-3xl md:pr-0">
          {isHydrated ? <ContentSidebar /> : null}
          <SidebarInset className="col-span-3">
            <Outlet />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
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