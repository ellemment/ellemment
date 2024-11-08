import { Link } from "@remix-run/react"
import {
  Check,
  ChevronRight,
  // Remove unused import
  GalleryVerticalEnd,
} from "lucide-react"
import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#app/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#app/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "#app/components/ui/sidebar"

import { docsNavigation } from "#app/utils/docs/docs-nav.js"

// Define interfaces for the navigation structure
interface NavItem {
  title: string;
  path?: string;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

// Define an interface for the latestDocs prop
interface LatestDoc {
  path: string;
  dateDisplay: string;
  title: string;
  summary: string;
}

// Update the component to use the existing docsNavigation
export function DocsLayout({ latestDocs }: { latestDocs: LatestDoc[] }) {
  const [selectedVersion, setSelectedVersion] = React.useState(docsNavigation.versions[0])

  // Cast sections to NavSection[] if it exists, otherwise use an empty array
  const sections: NavSection[] = (docsNavigation as any).sections || [];

  return (
    <SidebarProvider className="mb-20">
      <Sidebar variant="floating" className="sticky top-0 bg-background pb-20 mb-20">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="mb-4 border border-sidebar-border rounded-lg">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex flex-1 flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Engine</span>
                      <span className="">v{selectedVersion}</span>
                    </div>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary/50 text-sidebar-primary-foreground">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                  {docsNavigation.versions.map((version: string) => (
                    <DropdownMenuItem
                      key={version}
                      onSelect={() => setSelectedVersion(version)}
                    >
                      v{version}{" "}
                      {version === selectedVersion && (
                        <Check className="ml-auto" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          {sections.map((section: NavSection) => (
            <Collapsible
              key={section.id}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    {section.title}{" "}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item: NavItem) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.path || "#"}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarHeader>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex bg-background h-16 items-center gap-2 px-4">
          <SidebarTrigger className="ml-1 md:hidden" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {latestDocs.map((doc) => (
            <Link
              key={doc.path}
              to={doc.path}
              className="block p-4 rounded-lg border hover:border-foreground/20"
            >
              <div className="text-sm text-muted-foreground mb-1">
                {doc.dateDisplay}
              </div>
              <h3 className="font-semibold mb-2">{doc.title}</h3>
              <p className="text-sm text-muted-foreground">
                {doc.summary}
              </p>
            </Link>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
