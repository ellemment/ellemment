// #app/interface/composite/docs/docs-nav.ts

import { type MarkdownPostListing } from "#app/utils/content/content.server";

export type NavCategory = {
  label: string;
  order: number;
  items: Array<{
    slug: string;
    title: string;
  }>;
};

export type DocsNavigation = Record<string, NavCategory>;

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

// Manual mapping of posts to specific categories based on content
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

export function organizePostsByCategory(posts: MarkdownPostListing[]) {
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

