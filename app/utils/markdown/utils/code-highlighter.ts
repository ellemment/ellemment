import { htmlEscape } from "escape-goat";
import { getHighlighter, toShikiTheme, type Lang as ShikiLang, type Highlighter, type IThemeRegistration, type Theme } from "shiki";
import themeJson from "/data/base16.json";
import { visit } from "unist-util-visit";
import { type UnistNode, type CodeBlockMeta, type ThemedTokensOptions } from "../types";
import { parseLineHighlights, convertFakeHexToCustomProp } from "./parsers";

let theme: IThemeRegistration;
let highlighter: Highlighter | null = null;
let themeName: Theme = 'nord';

export async function getHighlighterInstance(): Promise<Highlighter> {
  if (!theme) {
    theme = toShikiTheme(themeJson as any);
    themeName = (theme as any).name || themeName;
  }
  if (!highlighter) {
    highlighter = await getHighlighter({ themes: [theme] });
  }
  return highlighter;
}

export function getSupportedLanguages(): ShikiLang[] {
  return [
    "js", "json", "jsx", "ts", "tsx", "markdown", "shellscript",
    "html", "css", "diff", "mdx", "prisma", "python", "yaml", "json5", 
  ];
}

export async function processCodeBlocks(tree: UnistNode.Root): Promise<void> {
  const highlighterInstance = await getHighlighterInstance();
  const fgColor = convertFakeHexToCustomProp(
    highlighterInstance.getForegroundColor(themeName) || "",
  );
  const langs = getSupportedLanguages();
  const langSet = new Set(langs);
  const transformTasks: Array<() => Promise<void>> = [];

  visit(tree, 'code', (node: UnistNode.Code) => {
    if (!node.lang || !node.value || !langSet.has(node.lang as ShikiLang)) {
      return;
    }

    let language = node.lang === "js" ? "javascript" : node.lang === "ts" ? "typescript" : node.lang as ShikiLang;
    let code = node.value;
    let codeBlockMeta = getCodeBlockMeta(node);

    transformTasks.push(() => highlightNodes(node, language, code, codeBlockMeta, highlighterInstance, fgColor, theme));
  });

  await Promise.all(transformTasks.map(task => task()));
}

export async function highlightNodes(
  node: UnistNode.Code,
  language: ShikiLang,
  code: string,
  codeBlockMeta: CodeBlockMeta,
  highlighter: Highlighter,
  fgColor: string,
  theme: IThemeRegistration
): Promise<void> {
  let tokens = getThemedTokens({ code, language }, highlighter, theme);
  let children = tokens.map(
    (lineTokens, zeroBasedLineNumber): UnistNode.Element => {
      let children = lineTokens.map(
        (token): UnistNode.Text | UnistNode.Element => {
          let color = convertFakeHexToCustomProp(token.color || "");
          let content: UnistNode.Text = {
            type: "text",
            value: token.content,
          };

          return color && color !== fgColor
            ? {
              type: "element",
              tagName: "span",
              children: [content],
              properties: {
                style: `color: ${htmlEscape(color)}`,
              },
            } as UnistNode.Element
            : content;
        },
      );

      children.push({
        type: "text",
        value: "\n",
      });

      let {
        addedLines,
        highlightLines,
        removedLines,
        startingLineNumber,
        usesLineNumbers,
      } = codeBlockMeta;

      let isDiff = addedLines.length > 0 || removedLines.length > 0;
      let diffLineNumber = startingLineNumber - 1;
      let lineNumber = zeroBasedLineNumber + startingLineNumber;
      let highlightLine = highlightLines?.includes(lineNumber);
      let removeLine = removedLines.includes(lineNumber);
      let addLine = addedLines.includes(lineNumber);
      if (!removeLine) {
        diffLineNumber++;
      }

      return {
        type: "element",
        tagName: "span",
        properties: {
          className: "codeblock-line",
          dataHighlight: highlightLine ? "true" : undefined,
          dataLineNumber: usesLineNumbers ? lineNumber : undefined,
          dataAdd: isDiff ? addLine : undefined,
          dataRemove: isDiff ? removeLine : undefined,
          dataDiffLineNumber: isDiff ? diffLineNumber : undefined,
        },
        children,
      } as UnistNode.Element;
    },
  );

  let nodeValue: UnistNode.Element = {
    type: "element",
    tagName: "pre",
    properties: {
      ...codeBlockMeta.nodeProperties,
      dataLineNumbers: codeBlockMeta.usesLineNumbers ? "true" : "false",
      dataLang: language,
      style: fgColor ? `color: ${htmlEscape(fgColor)};` : '',
    },
    children: [
      {
        type: "element",
        tagName: "code",
        children,
      } as UnistNode.Element,
    ],
  };

  let data = node.data ?? {};
  Object.assign(node, {
    type: "element" as const,
    tagName: "div",
    data: {
      ...data,
      hProperties: {
        ...(typeof data.hProperties === "object" ? data.hProperties : {}),
        dataCodeBlock: "",
        ...codeBlockMeta.nodeProperties,
        dataLineNumbers: codeBlockMeta.usesLineNumbers ? "true" : "false",
        dataLang: htmlEscape(language),
      },
      hChildren: [nodeValue],
    },
  } as Partial<UnistNode.Element>);
}

function getThemedTokens(
  { code, language }: ThemedTokensOptions,
  highlighter: Highlighter,
  theme: IThemeRegistration
) {
  return highlighter.codeToThemedTokens(code, language, theme as any, {
    includeExplanation: false,
  });
}

export function getCodeBlockMeta(node: UnistNode.Code): CodeBlockMeta {
  let meta = Array.isArray(node.meta) ? node.meta[0] : node.meta;

  let metaParams = new URLSearchParams();
  if (meta) {
    let linesHighlightsMetaShorthand = meta.match(/^\[(.+)\]$/);
    if (linesHighlightsMetaShorthand) {
      metaParams.set("lines", linesHighlightsMetaShorthand[0]);
    } else {
      metaParams = new URLSearchParams(meta.split(/\s+/).join("&"));
    }
  }

  let addedLines = parseLineHighlights(metaParams.get("add"));
  let removedLines = parseLineHighlights(metaParams.get("remove"));
  let highlightLines = parseLineHighlights(metaParams.get("lines"));
  let startValNum = metaParams.has("start")
    ? Number(metaParams.get("start"))
    : 1;
  let startingLineNumber = Number.isFinite(startValNum)
    ? startValNum
    : 1;
  let usesLineNumbers = !metaParams.has("nonumber");

  let nodeProperties: { [key: string]: string } = {};
  metaParams.forEach((val, key) => {
    if (key === "lines") return;
    nodeProperties[`data-${key}`] = val;
  });

  return {
    addedLines,
    highlightLines,
    nodeProperties,
    removedLines,
    startingLineNumber,
    usesLineNumbers,
  };
}