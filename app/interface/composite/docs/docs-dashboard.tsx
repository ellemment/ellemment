// #app/interface/composite/docs/docs-dashboard.tsx

import { Link, useLoaderData, useLocation } from "@remix-run/react"
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#app/interface/shadcn/sidebar"
import { type loader } from "#app/routes/_docs+/docs"
import { cn } from "#app/utils/misc"
import { organizePostsByCategory } from "./docs-nav"

export function DocsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { posts } = useLoaderData<typeof loader>()
  const navigation = organizePostsByCategory(posts)
  const location = useLocation()
  
  // Get current category based on URL
  const currentSlug = location.pathname.split('/docs/')[1]
  const currentCategory = Object.entries(navigation).find(([_, category]) =>
    category.items.some(item => item.slug === currentSlug)
  )?.[1]?.label || "Documentation"
  
  return (
    <>
      <Sidebar 
        variant="inset" 
        {...props}
        className={cn("z-60 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600", props.className)}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span className="text-lg font-semibold">Documentation</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="overflow-y-auto">
          {Object.entries(navigation).map(([categoryKey, category]) => (
            category.items.length > 0 && (
              <div key={categoryKey} className="py-2">
                <h2 className="mb-2 px-2 text-sm font-semibold text-sidebar-foreground/60">
                  {category.label}
                </h2>
                <SidebarMenu>
                  {category.items.map((item) => (
                    <SidebarMenuItem key={item.slug}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={`/docs/${item.slug}`} 
                          prefetch="intent"
                          preventScrollReset
                          reloadDocument={false}
                        >
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>
            )
          ))}
        </SidebarContent>
      </Sidebar>
    </>
  )
}
