// #app/routes/_beta+/engine._index.tsx
import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, Link, type MetaFunction } from "@remix-run/react";
import {
  Check,
  ChevronRight,
  GalleryVerticalEnd,
} from "lucide-react"
import * as React from "react";
import invariant from "tiny-invariant";

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

import { docsNavigation, type NavSection, type NavItem } from "#app/utils/beta/docs-nav"
import { getDocsElementListings } from "#app/utils/content/docs.server";

export const loader = async (_: LoaderFunctionArgs) => {
  // First check if we have a first item to redirect to
  const firstSection = docsNavigation.navMain[0];
  invariant(firstSection, "Navigation must have at least one section");
  
  const firstItem = firstSection.items[0];
  invariant(firstItem?.url, "First section must have at least one item with a URL");

  // Redirect to first item
  return redirect(`/engine/${firstItem.url.replace(/^\//, '')}`);

  // Note: The code below won't execute due to redirect, but keeping for reference
  const docsMap = await getDocsElementListings();
  const allDocs = Array.from(docsMap.values()).flat();
  return {
    latestDocs: allDocs.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10)
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Engine Documentation" },
    {
      name: "description",
      content: "Technical documentation and guides for the Engine platform.",
    },
  ];
};

export default function DocsIndex() {
  // This component won't render due to the redirect, but keeping for reference
  const { latestDocs } = useLoaderData<typeof loader>();
  const [selectedVersion, setSelectedVersion] = React.useState(docsNavigation.versions[0])

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
                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 w-full">
                      <span className="font-semibold">Documentation</span>
                      <span className="text-sm">v{selectedVersion}</span>
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary/50 text-sidebar-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                      </div>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                  {docsNavigation.versions.map((version) => (
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
          {docsNavigation.navMain.map((section: NavSection) => (
            <Collapsible
              key={section.title}
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
                            <Link
                              to={`/engine/${item.url.replace(/^\//, '')}`} 
                              relative="route" 
                            >
                              {item.title}
                            </Link>
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
  );
}
