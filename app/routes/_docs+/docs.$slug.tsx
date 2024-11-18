// #app/routes/_docs+/docs.$slug.tsx  

import  { type LoaderFunctionArgs, type LinksFunction } from "@remix-run/node";
import { useLoaderData ,type  MetaFunction } from "@remix-run/react";
import { useRef } from "react";
import invariant from "tiny-invariant";

import { getContentElemment } from "#app/utils/content/content.server";
import mdStyles from "#app/utils/content/markdown-module/styles/md.css?url";
import { useDelegatedReactRouterLinks } from "#app/utils/docs/delegate-links";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  let { slug } = params;
  invariant(!!slug, "Expected slug param");
  let requestUrl = new URL(request.url);
  let siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  let post = await getContentElemment(slug);

  return { siteUrl, post };
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mdStyles },
];


export const meta: MetaFunction<typeof loader> = (args) => {
  let { data, params } = args;
  let { slug } = params;
  invariant(!!slug, "Expected slug param");

  let { siteUrl, post } = data || {};
  if (!post) {
    return [{ title: "404 Not Found | Documentation" }];
  }

  let ogImageUrl = siteUrl ? new URL(`${siteUrl}/img/${slug}`) : null;
  if (ogImageUrl) {
    ogImageUrl.searchParams.set("title", post.title);
    if (post.ogImage) {
      ogImageUrl.searchParams.set("ogImage", post.ogImage);
    }
  }

  let socialImageUrl = ogImageUrl?.toString();
  let url = siteUrl ? `${siteUrl}/docs/${slug}` : null;

  return [
    { title: `${post.title} | Documentation` },
    { name: "description", content: post.summary },
    { property: "og:url", content: url },
    { property: "og:title", content: post.title },
    { property: "og:image", content: socialImageUrl },
    { property: "og:description", content: post.summary },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.summary },
    { name: "twitter:image", content: socialImageUrl },
    {
      name: "twitter:image:alt",
      content: socialImageUrl ? post.imageAlt : undefined,
    },
  ];
};

export default function DocsPost() {
  let { post } = useLoaderData<typeof loader>()
  let mdRef = useRef<HTMLDivElement>(null)
  useDelegatedReactRouterLinks(mdRef)

  return (
    <div className="prose dark:prose-invert max-w-none">
      {post.draft && (
        <div className="not-prose mb-8 rounded-sm bg-red-700 px-5 py-3 text-center text-gray-100 dark:bg-red-400 dark:text-gray-700">
          🚨 This is a draft, please do not share this page until it's
          officially published 🚨
        </div>
      )}
      <h1>{post.title}</h1>
      <div
        ref={mdRef}
        className="md-prose"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  )
}
