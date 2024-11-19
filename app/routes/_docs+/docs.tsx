// #app/routes/_docs+/docs.index.tsx

import  { type LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation, redirect } from "@remix-run/react";
import { DocsSidebar } from "#app/interface/composite/docs/docs-dashboard";
import { organizePostsByCategory } from "#app/interface/composite/docs/docs-nav";
import { Separator } from "#app/interface/shadcn/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "#app/interface/shadcn/sidebar";
import { getContentElemmentListings } from "#app/utils/content/content.server";

export const loader: LoaderFunction = async ({ request }) => {
  const posts = await getContentElemmentListings();
  const url = new URL(request.url);
  
  // If we're at /docs with no slug, redirect to the first post
  if (url.pathname === '/docs') {
    const navigation = organizePostsByCategory(posts);
    const firstCategory = Object.values(navigation)[0];
    const firstPost = firstCategory?.items[0];
    
    if (firstPost) {
      return redirect(`/docs/${firstPost.slug}`);
    }
  }
  
  return { posts };
};

export default function DocsLayout() {
  const { posts } = useLoaderData<typeof loader>()
  const navigation = organizePostsByCategory(posts)
  const location = useLocation()

  const currentSlug = location.pathname.split('/docs/')[1]
  const currentCategory = Object.entries(navigation).find(([_, category]) =>
    category.items.some(item => item.slug === currentSlug)
  )?.[1]?.label || "Documentation"


  return (
    <div className="mx-auto max-w-7xl relative flex">
      <SidebarProvider defaultOpen={true} className="rounded-xl">
        <div className="flex w-full relative">
          <DocsSidebar />
          <SidebarInset className="bg-gray-300 dark:bg-secondary min-w-0 flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 h-4 bg-gray-700 dark:bg-gray-300"
                  decorative
                />
                <span className="text-lg font-semibold">
                  {currentCategory}
                </span>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 min-w-0">
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

