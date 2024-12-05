// #app/routes/_docs+/docs.index.tsx

import { type LoaderFunction, type LinksFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useIsMobile } from "#app/interface/shadcn/hooks/use-mobile";
import {
  SidebarInset,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGlobalHeader,
} from "#app/interface/shadcn/sidebar";
import { getContentElemmentListings, type MarkdownPostListing } from "#app/utils/content/content.server";
import mdStyles from "#app/utils/content/markdown-module/styles/md.css?url";
import { cn } from "#app/utils/misc";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mdStyles },
];

// Navigation Types
export type NavCategory = {
  label: string;
  order: number;
  items: Array<{
    slug: string;
    title: string;
  }>;
};

export type DocsNavigation = Record<string, NavCategory>;

// Navigation Data
export const docsCategories: DocsNavigation = {
  "react-router": {
    label: "React Router",
    order: 1,
    items: []
  },
  "remix": {
    label: "Remix",
    order: 2,
    items: []
  },
  "server-components": {
    label: "Server Components",
    order: 3,
    items: []
  },
  "migration": {
    label: "Migration Guides",
    order: 4,
    items: []
  },
  "deployment": {
    label: "Deployment & Integration",
    order: 5,
    items: []
  }
};

// Manual mapping of posts to specific categories
const postCategoryMap: Record<string, string> = {
  // React Router related
  "react-router-v6": "react-router",
  "react-routering-remix": "react-router",
  "remixing-react-router": "react-router",
  
  // Remix related
  "remix-vite-stable": "deployment",
  "remix-i18n": "remix",
  "fog-of-war": "remix",
  "merging-remix-and-react-router": "migration",
  
  // Server Components
  "react-server-components": "server-components"
};

function organizePostsByCategory(posts: MarkdownPostListing[]) {
  const navigation = { ...docsCategories };
  
  navigation["other"] = {
    label: "Other Resources",
    order: 999,
    items: []
  };

  posts.forEach(post => {
    const categoryKey = postCategoryMap[post.slug] || "other";
    const category = navigation[categoryKey];
    
    if (category) {
      if (!category.items.some(item => item.slug === post.slug)) {
        category.items.push({
          slug: post.slug,
          title: post.title
        });
      }
    }
  });

  // Sort items within each category
  Object.values(navigation).forEach(category => {
    category.items.sort((a, b) => a.title.localeCompare(b.title));
  });

  // Remove empty categories and sort by order
  const filteredNavigation = Object.fromEntries(
    Object.entries(navigation)
      .filter(([, category]) => category.items.length > 0)
      .sort(([, a], [, b]) => a.order - b.order)
  );

  return filteredNavigation;
}

export const loader: LoaderFunction = async ({ request: _ }) => {
  const posts = await getContentElemmentListings();
  return { posts };
};

function DocsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { posts } = useLoaderData<typeof loader>();
  const navigation = organizePostsByCategory(posts);
  const isMobile = useIsMobile();
  
  return (
    <Sidebar 
      variant="sidebar" 
      side="right" 
      collapsible={isMobile ? "icon" : "none"}
      {...props}
      className={cn("z-60 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600", props.className)}
    >
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
  );
}

export default function DocsLayout() {



  return (
    <div className="mx-auto max-w-7xl px-2 relative flex flex-col">
      <SidebarProvider defaultOpen={true}>
        <SidebarGlobalHeader title="Documentation" showTrigger={useIsMobile()} />
        <div className="flex w-full relative">
          <DocsSidebar />
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
  );
}

