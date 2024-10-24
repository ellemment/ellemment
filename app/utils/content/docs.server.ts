// #app/utils/content/docs.server.ts
import { LRUCache } from "lru-cache";
import { DateTime } from "luxon";
import invariant from "tiny-invariant";
import { processMarkdown } from "#app/utils/markdown/md.server.js";

// Get all markdown files from nested folders
const docsContentsByPath = Object.fromEntries(
  Object.entries(
    import.meta.glob("/data/docs/**/*.md", {
      query: "?raw",
      import: "default",
      eager: true,
    }),
  ).map(([filePath, contents]) => {
    invariant(
      typeof contents === "string",
      `Expected ${filePath} to be a string, but got ${typeof contents}`,
    );

    // Remove /data/docs/ prefix and .md extension
    const path = filePath.slice("/data/docs/".length);
    const routePath = path.replace(/\.md$/, "");

    invariant(
      routePath && routePath.length > 0,
      `Invalid route path generated from ${filePath}`
    );

    return [routePath, contents];
  }),
);

const docsCache = new LRUCache<string, DocsPost>({
  maxSize: 1024 * 1024 * 12,
  sizeCalculation(value, key) {
    return JSON.stringify(value).length + (key ? key.length : 0);
  },
});

function getSectionFromPath(path: string): string {
  const parts = path.split("/");
  invariant(parts.length >= 1 && parts[0], `Invalid path structure: ${path}`);
  return parts[0];
}

export async function getDocsElement(path: string): Promise<DocsPost> {
  let cached = docsCache.get(path);
  if (cached) return cached;

  let contents = docsContentsByPath[path];
  if (!contents) {
    throw new Response("Not Found", { status: 404, statusText: "Not Found" });
  }

  let result = await processMarkdown(contents);
  let { attributes, html } = result;

  invariant(
    isMarkdownDocsFrontmatter(attributes),
    `Invalid docs frontmatter in ${path}`,
  );

  const section = getSectionFromPath(path);

  let post: DocsPost = {
    ...attributes,
    path,
    section,
    dateDisplay: formatDate(attributes.date),
    html,
  };

  docsCache.set(path, post);
  return post;
}

export async function getDocsElementListings(): Promise<DocsSectionMap> {
  const sections = new Map<string, MarkdownDocsListing[]>();

  for (const path of Object.keys(docsContentsByPath)) {
    const { html, ...listing } = await getDocsElement(path);
    if (!listing.draft) {
      const section = getSectionFromPath(path);
      
      if (!sections.has(section)) {
        sections.set(section, []);
      }

      const sectionDocs = sections.get(section);
      invariant(sectionDocs, `Section ${section} should exist`);
      
      sectionDocs.push(listing);
    }
  }

  // Sort docs within each section by date
  for (const [section, docs] of sections) {
    sections.set(
      section,
      docs.sort((a, b) => b.date.getTime() - a.date.getTime())
    );
  }

  return sections;
}

function formatDate(date: Date) {
  let offset = new Date().getTimezoneOffset();
  return DateTime.fromJSDate(date)
    .plus({ minutes: offset })
    .toLocaleString(DateTime.DATE_FULL, { locale: "en-US" });
}

function isMarkdownDocsFrontmatter(obj: any): obj is MarkdownDocs {
  return (
    typeof obj === "object" &&
    obj.title &&
    obj.summary &&
    obj.date instanceof Date &&
    (typeof obj.draft === "boolean" || typeof obj.draft === "undefined") &&
    (typeof obj.featured === "boolean" || typeof obj.featured === "undefined")
  );
}

export type DocsSectionMap = Map<string, MarkdownDocsListing[]>;

interface MarkdownDocsBase {
  title: string;
  summary: string;
  date: Date;
  dateDisplay: string;
  draft?: boolean;
  featured?: boolean;
}

export interface MarkdownDocsListing extends MarkdownDocsBase {
  path: string;
  section: string;
}

interface MarkdownDocs extends MarkdownDocsBase {
  html: string;
}

export interface DocsPost extends MarkdownDocs {
  path: string;
  section: string;
}