// #app/routes/_beta+/engine.$slug.tsx
import { type LoaderFunctionArgs, type LinksFunction, json } from "@remix-run/node";
import { useLocation, useLoaderData, Link, type MetaFunction } from "@remix-run/react";
import {
    Check,
    ChevronRight,
    GalleryVerticalEnd,
} from "lucide-react"
import * as React from "react";
import invariant from "tiny-invariant";
import DocsBreadcrumb from "#app/components/composite/breadcrumb";
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
    Separator,
} from "#app/components/ui/separator"
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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "#app/components/ui/sidebar"



import { docsNavigation, type NavSection, type NavItem } from "#app/utils/beta/docs-nav"
import { getDocsElement, getDocsElementListings } from "#app/utils/content/docs.server";
import mdStyles from "#app/utils/markdown/styles/md.css?url";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: mdStyles },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { slug } = params;
    invariant(slug, "Expected slug parameter");

    try {
        const [doc, docsMap] = await Promise.all([
            getDocsElement(slug),
            getDocsElementListings()
        ]);

        const allDocs = Array.from(docsMap.values()).flat();
        return json({
            doc,
            latestDocs: allDocs.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5)
        });
    } catch {
        throw new Response("Not Found", { status: 404 });
    }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) {
        return [
            { title: "Not Found" },
            { name: "description", content: "Page not found" },
        ];
    }

    return [
        { title: `${data.doc.title} - Engine Documentation` },
        { name: "description", content: data.doc.summary },
    ];
};

export default function DocsPage() {
    const { doc } = useLoaderData<typeof loader>();
    const [selectedVersion, setSelectedVersion] = React.useState(docsNavigation.versions[0])
    const location = useLocation()

    // Check if current route matches item URL
    const isActiveRoute = (url: string) => {
        const cleanUrl = url.replace(/^\//, '');
        return location.pathname === `/engine/${cleanUrl}`;
    }


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
                                            <span className="font-semibold">Documentation</span>
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
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <Link
                                                        to={`/engine/${section.url.replace(/^\//, '')}`}
                                                        className="font-medium text-sidebar-foreground hover:text-sidebar-foreground/80"
                                                    >

                                                    </Link>
                                                </SidebarMenuButton>
                                                <SidebarMenuSub>
                                                    {section.items.map((item: NavItem) => (
                                                        <SidebarMenuSubItem key={item.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={isActiveRoute(item.url)}
                                                            >
                                                                <Link
                                                                    to={`/engine/${item.url.replace(/^\//, '')}`}
                                                                    relative="route"
                                                                    className="pl-4 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground"
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </SidebarMenuItem>
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
                    <Separator orientation="vertical" className="md:hidden mr-2 h-4" />
                    <DocsBreadcrumb />
                </header>
                <div className="flex flex-1 flex-col">
                    <article className="container px-4 pb-8">
                        <div className="prose dark:prose-invert max-w-4xl mx-auto">
                            <div
                                className="md-prose"
                                dangerouslySetInnerHTML={{ __html: doc.html }} />
                        </div>
                    </article>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
