import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, Link } from '@remix-run/react'
import * as React from "react"
import { Icon } from "#app/interface/foundations/icons/icon"
import { Avatar, AvatarImage, AvatarFallback } from "#app/interface/shadcn/avatar"
import { Card } from "#app/interface/shadcn/card"
import { useIsMobile } from '#app/interface/shadcn/hooks/use-mobile'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarProvider,
  SidebarGlobalHeader
} from "#app/interface/shadcn/sidebar"
import { GeneralErrorBoundary } from '#app/interface/shared/error-boundary'
import { prisma } from '#app/utils/db.server'
import { cn, getUserImgSrc } from "#app/utils/misc"
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

function ContentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useLoaderData<typeof loader>()
  const loggedInUser = useOptionalUser()
  const isOwner = data.owner.id === loggedInUser?.id
  const isMobile = useIsMobile()

  const dashboardNavItems = [
    {
      items: [
        ...(isOwner ? [{ title: "Create", icon: "plus-circled", to: "./new" }] : []),
      ],
    },
  ]

  return (
    <Sidebar
      variant="sidebar"
      side="right"
      collapsible={isMobile ? "icon" : "none"}
      {...props}
      className={cn("z-60", props.className)}
    >
      <SidebarHeader>
        <SidebarMenu>
          <Card className="h-16 border-0 shadow-none bg-transparent p-4 px-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage
                    src={data.owner ? getUserImgSrc(data.owner.image?.id) : ''}
                    alt={data.owner?.name ?? data.owner?.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-sm">
                    {data.owner?.name?.[0]?.toUpperCase() ??
                      data.owner?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start w-full">
                  <span className="text-md font-semibold text-left">
                    {data.owner.name || data.owner.username}
                  </span>
                  <span className="text-sm text-muted-foreground text-left">
                    @{data.owner.username}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        {dashboardNavItems.map((section, index) => (
          <div key={index} className="py-2">
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <Icon name={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {data.owner.content.map((content) => (
                <SidebarMenuItem key={content.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`./${content.id}`}>
                      <Icon name="file-text" />
                      <span>{content.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

export default function ContentRoute() {
  const isMobile = useIsMobile()

  return (
    <div className="mx-auto max-w-7xl px-2 relative flex flex-col">
      <SidebarProvider defaultOpen={true}>
        <SidebarGlobalHeader title="Elements" showTrigger={isMobile} />
        <div className="flex w-full relative">
          <ContentSidebar />
          <SidebarInset className="min-w-0 flex flex-col">
            <main className="flex-1 overflow-y-auto p-2 md:p-4 md:py-2 min-w-0">
              <div className="max-w-full">
                <Outlet />
              </div>
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