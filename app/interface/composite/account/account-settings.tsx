// #app/interface/composite/account/account-settings.tsx

import { Link, Form } from "@remix-run/react"
import * as React from "react"
import { Icon } from "#app/interface/foundations/icons/icon"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#app/interface/shadcn/sidebar"
import { cn } from "#app/utils/misc"

export const settingsNavItems = [
  {
    title: "Account",
    items: [
      { title: "Username", icon: "avatar", to: "./username" },
      { title: "Name", icon: "pencil-1", to: "./name" },
      { title: "Profile Photo", icon: "camera", to: "./photo" },
      { title: "Email", icon: "envelope-closed", to: "./change-email" },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Two Factor Auth", icon: "lock-closed", to: "./two-factor" },
      { title: "Password", icon: "dots-horizontal", to: "./password" },
      { title: "Sessions", icon: "laptop", to: "./your-sessions" },
      { title: "Connections", icon: "link-2", to: "./connections" },
    ],
  },
  {
    title: "Data",
    items: [
      { title: "Download Data", icon: "download", to: "./download-data" },
      { title: "Delete Account", icon: "trash", to: "./delete-data" },
    ],
  },
]

export function AccountSettingsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <span className="text-lg font-semibold">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
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

