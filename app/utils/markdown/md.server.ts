// #app/utils/markdown/md.server.ts
import parseFrontMatter from "front-matter";
import { type ProcessorOptions, type UnistNode } from "./types";
import { processCodeBlocks } from "./utils/code-highlighter";
import { createLinkProcessor } from "./utils/link-processor";

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
    .use(plugins.linkProcessor, options)
    .use(plugins.remarkCodeBlocksShiki)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings);
}

export async function loadPlugins() {
  const linkProcessor = createLinkProcessor();
  
  const remarkCodeBlocksShiki = () => {
    return async function transformer(tree: UnistNode.Root) {
      await processCodeBlocks(tree);
    };
  };

  return {
    linkProcessor,
    remarkCodeBlocksShiki,
  };
}


