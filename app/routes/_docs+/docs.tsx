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
    order: number;
  }>;
};

export type DocsNavigation = Record<string, NavCategory>;

// Navigation Data
export const docsCategories: DocsNavigation = {
  "getting-started": {
    label: "Getting Started",
    order: 1,
    items: []
  },
  "core-architecture": {
    label: "Core Architecture",
    order: 2,
    items: []
  },
  "performance-security": {
    label: "Performance & Security",
    order: 3,
    items: []
  },
  "frontend-resources": {
    label: "Frontend Resources",
    order: 4,
    items: []
  },
  "operations": {
    label: "Operations",
    order: 5,
    items: []
  }
};

// Manual mapping of posts to specific categories
const postCategoryMap: Record<string, { category: string; order: number }> = {
  // Getting Started
  "getting-started": { category: "getting-started", order: 1 },
  "guiding-principles": { category: "getting-started", order: 2 },
  "examples": { category: "getting-started", order: 3 },
  "features": { category: "getting-started", order: 4 },
  
  // Core Architecture
  "routing": { category: "core-architecture", order: 1 },
  "authentication": { category: "core-architecture", order: 2 },
  "database": { category: "core-architecture", order: 3 },
  "caching": { category: "core-architecture", order: 4 },
  "memory": { category: "core-architecture", order: 5 },
  "apis": { category: "core-architecture", order: 6 },
  
  // Performance & Security
  "security": { category: "performance-security", order: 1 },
  "monitoring": { category: "performance-security", order: 2 },
  "server-timing": { category: "performance-security", order: 3 },
  "secrets": { category: "performance-security", order: 4 },
  "permissions": { category: "performance-security", order: 5 },
  "testing": { category: "performance-security", order: 6 },
  
  // Frontend Resources
  "fonts": { category: "frontend-resources", order: 1 },
  "icons": { category: "frontend-resources", order: 2 },
  "client-hints": { category: "frontend-resources", order: 3 },
  "seo": { category: "frontend-resources", order: 4 },
  "redirects": { category: "frontend-resources", order: 5 },
  
  // Operations
  "deployment": { category: "operations", order: 1 },
  "managing-updates": { category: "operations", order: 2 },
  "email": { category: "operations", order: 3 },
  "community": { category: "operations", order: 4 }
};

// Update the organizePostsByCategory function
function organizePostsByCategory(posts: MarkdownPostListing[]) {
  const navigation = { ...docsCategories };
  
  navigation["other"] = {
    label: "Other Resources",
    order: 999,
    items: []
  };

  // First, group posts by category with their order
  const categorizedPosts = posts.map(post => {
    const mapping = postCategoryMap[post.slug] || { category: "other", order: 999 };
    return {
      ...post,
      categoryKey: mapping.category,
      order: mapping.order
    };
  });

  // Group posts by category
  for (const post of categorizedPosts) {
    const category = navigation[post.categoryKey];
    if (category) {
      if (!category.items.some(item => item.slug === post.slug)) {
        category.items.push({
          slug: post.slug,
          title: post.title,
          order: post.order // Store the order
        });
      }
    }
  }

  // Sort items within each category by their order
  Object.values(navigation).forEach(category => {
    category.items.sort((a, b) => {
      const aOrder = (a as any).order || 999;
      const bOrder = (b as any).order || 999;
      return aOrder - bOrder;
    });
  });

  // Remove empty categories and sort by category order
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

