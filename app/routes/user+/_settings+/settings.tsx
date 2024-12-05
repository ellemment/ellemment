// app/routes/user+/_settings+/settings.tsx

import { invariantResponse } from '@epic-web/invariant'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, Link, Form, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { Icon } from '#app/interface/foundations/icons/icon'
import { Avatar, AvatarImage, AvatarFallback } from "#app/interface/shadcn/avatar"
import { Card } from "#app/interface/shadcn/card"
import { useIsMobile } from "#app/interface/shadcn/hooks/use-mobile"
import { 
  SidebarInset, 
  SidebarProvider, 
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGlobalHeader
} from '#app/interface/shadcn/sidebar'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { cn, getUserImgSrc } from "#app/utils/misc"

export const settingsNavItems = [
  {
    title: "Account",
    items: [
      { title: "Email", icon: "envelope-closed", to: "./change-email" },
      { title: "Password", icon: "dots-horizontal", to: "./password" },
      { title: "Sessions", icon: "laptop", to: "./your-sessions" },
      { title: "Connections", icon: "link-2", to: "./connections" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Two Factor Auth", icon: "lock-closed", to: "./two-factor" },
      { title: "Download Data", icon: "download", to: "./download-data" },
      { title: "Delete Account", icon: "trash", to: "./delete-data" },
    ],
  },
]

export const BreadcrumbHandle = z.object({ breadcrumb: z.any() })
export type BreadcrumbHandle = z.infer<typeof BreadcrumbHandle>

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="file-text">Edit Profile</Icon>,
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: {
			id: true,
			username: true,
			name: true,
			email: true,
			image: {
				select: { id: true },
			},
		},
	})
	invariantResponse(user, 'User not found', { status: 404 })
	return json({ user })
}

function SettingsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useLoaderData<typeof loader>()
  const isMobile = useIsMobile()

  return (
    <Sidebar 
      variant="sidebar" 
      side="right"
      collapsible={isMobile ? "icon" : "none"}
      {...props}
      className={cn("z-60", props.className)}
    >
      <SidebarContent>
        {/* User Profile Card */}
        <div className="py-2">
          <Card className="h-16 border-0 shadow-none bg-transparent p-4 px-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage
                  src={data.user ? getUserImgSrc(data.user.image?.id) : ''}
                  alt={data.user?.name ?? data.user?.username}
                  className="object-cover"
                />
                <AvatarFallback className="text-sm">
                  {data.user?.name?.[0]?.toUpperCase() ??
                    data.user?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-md font-semibold">
                  {data.user.name || data.user.username}
                </span>
                <span className="text-sm text-muted-foreground">
                  @{data.user.username}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Sections */}
        {settingsNavItems.map((section) => (
          <div key={section.title} className="py-2">
            <h2 className="mb-2 px-2 text-sm font-semibold text-sidebar-foreground/60">
              {section.title}
            </h2>
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
            </SidebarMenu>
          </div>
        ))}

        {/* Logout Section */}
        <div className="py-2">
          <h2 className="mb-2 px-2 text-sm font-semibold text-sidebar-foreground/60">
            Session
          </h2>
          <Form action="/logout" method="POST">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton type="submit">
                  <Icon name="exit" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </Form>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default function SettingsLayout() {
  const isMobile = useIsMobile()
  
  return (
    <div className="mx-auto max-w-7xl px-2 relative flex flex-col">
      <SidebarProvider defaultOpen={true}>
        <SidebarGlobalHeader title="Account Settings" showTrigger={isMobile} />
        <div className="flex w-full relative">
          <SettingsSidebar />
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
