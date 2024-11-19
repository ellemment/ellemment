// #app/interface/composite/account/account-settings.tsx

import { Link, Form, useLoaderData, useLocation } from "@remix-run/react"
import * as React from "react"
import { Icon } from "#app/interface/foundations/icons/icon"
import { Avatar, AvatarImage, AvatarFallback } from "#app/interface/shadcn/avatar"
import { Card } from "#app/interface/shadcn/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#app/interface/shadcn/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#app/interface/shadcn/sidebar"
import { type loader } from "#app/routes/user+/_settings+/settings"
import { cn, getUserImgSrc } from "#app/utils/misc"
import { useOptionalUser } from "#app/utils/user"


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

export function AccountSettingsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useLoaderData<typeof loader>()
  const loggedInUser = useOptionalUser()
  const location = useLocation()
  const isOwner = loggedInUser?.id === data.user.id
  const [isOpen, setIsOpen] = React.useState(!location.pathname.includes('/settings'))

  return (
    <Sidebar
      variant="inset"
      {...props}
      className={cn(
        "z-60",
        props.className
      )}
    >
      <SidebarHeader>
        <SidebarMenu>
          {isOwner ? (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger className="w-full">
                <Card className="h-16 border-0 shadow-none bg-transparent p-4 px-2">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 w-full">
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
                      <div className="flex flex-col items-start w-full">
                        <span className="text-md font-semibold text-left">
                          {data.user.name || data.user.username}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Elements
                        </span>
                      </div>
                    </div>
                    <Icon
                      name={isOpen ? "chevron-down" : "chevron-right"}
                      className="h-4 w-4 text-muted-foreground"
                    />
                  </div>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-2 pt-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={`/users/${data.user.username}/content`}>Elements</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/user/settings">Settings</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <Card className="h-16 border-0 shadow-none bg-transparent p-4 px-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 w-full">
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
                  <div className="flex flex-col items-start w-full">
                    <span className="text-md font-semibold text-left">
                      {data.user.name || data.user.username}
                    </span>
                    <span className="text-sm text-muted-foreground text-left">
                      Elements
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-4">
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
        <div className="py-2">
          <h2 className="mb-2 px-2 text-sm font-semibold text-sidebar-foreground/60">
            Session
          </h2>
          <Form action="/logout" method="POST">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  type="submit"
                  variant="outline"
                  className={cn(
                    "text-primary hover:text-primary",
                    "hover:bg-transparent",
                    "shadow-none",
                    "hover:shadow-none",
                    "ring-0",
                    "hover:ring-0",
                    "underline-offset-4",
                    "hover:underline",
                    "[&>svg]:text-primary"
                  )}
                >
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

