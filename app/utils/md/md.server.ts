/*!
 * Forked from https://github.com/ryanflorence/md/blob/master/index.ts
 *
 * Adapted from
 * - ggoodman/nostalgie
 *   - MIT https://github.com/ggoodman/nostalgie/blob/45f3f6356684287a214dab667064ec9776def933/LICENSE
 *   - https://github.com/ggoodman/nostalgie/blob/45f3f6356684287a214dab667064ec9776def933/src/worker/mdxCompiler.ts
 */

// #app/utils/markdown/md.server.ts
import parseFrontMatter from "front-matter";
import { loadPlugins } from "./plugins";
import { type ProcessorOptions } from "./types";


let processor: Awaited<ReturnType<typeof getProcessor>>;
export async function processMarkdown(
  content: string,
  options?: ProcessorOptions,
) {
  processor = processor || (await getProcessor(options));
  let { attributes, body: raw } = parseFrontMatter(content);
  let vfile = await processor.process(raw);
  let html = vfile.value.toString();
  return { attributes, raw, html };
}

export async function getProcessor(options?: ProcessorOptions) {
  let [
    { unified },
    { default: remarkGfm },
    { default: remarkParse },
    { default: remarkRehype },
    { default: rehypeSlug },
    { default: rehypeStringify },
    { default: rehypeAutolinkHeadings },
    plugins,
  ] = await Promise.all([
    import("unified"),
    import("remark-gfm"),
    import("remark-parse"),
    import("remark-rehype"),
    import("rehype-slug"),
    import("rehype-stringify"),
    import("rehype-autolink-headings"),
    loadPlugins(),
  ]);

  return unified()
    .use(remarkParse)
    .use(plugins.stripLinkExtPlugin, options)
    .use(plugins.remarkCodeBlocksShiki, options)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings);
}