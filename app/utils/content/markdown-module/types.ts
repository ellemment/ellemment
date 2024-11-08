// #app/utils/markdown/types.ts

import type * as Shiki from "shiki";
import type * as Unified from "unified";
import type * as Unist from "unist";

export interface ProcessorOptions {
  resolveHref?(href: string): string;
}

export namespace UnistNode {
  export type Content = Flow | Phrasing | Html;
  
  export interface Root extends Unist.Parent {
    type: "root";
    children: Flow[];
  }

  export type Flow =
    | Blockquote
    | Heading
    | ParagraphNode
    | Link
    | Pre
    | Code
    | Image
    | Element
    | Html;

  export interface Html extends Unist.Node {
    type: "html";
    value: string;
  }

  export interface Element extends Unist.Parent {
    type: "element";
    tagName?: string;
    properties?: { [key: string]: unknown }; 
  }

  export interface CodeElement extends Element {
    tagName: "code";
    data?: {
      meta?: string;
    };
    properties?: {
      className?: string[];
    };
  }

  export interface PreElement extends Element {
    tagName: "pre";
  }

  export interface Image extends Unist.Node {
    type: "image";
    title: null;
    url: string;
    alt?: string;
  }

  export interface Blockquote extends Unist.Parent {
    type: "blockquote";
    children: Flow[];
  }

  export interface Heading extends Unist.Parent {
    type: "heading";
    depth: number;
    children: UnistNode.Phrasing[];
  }

  export interface ParagraphNode extends Unist.Parent {
    type: "paragraph";
    children: Phrasing[];
  }

  export interface Pre extends Unist.Parent {
    type: "pre";
    children: Phrasing[];
  }

  export interface Code extends Unist.Parent {
    type: "code";
    value?: string;
    lang?: Shiki.Lang;
    meta?: string | string[];
  }

  export type Phrasing = Text | Emphasis;

  export interface Emphasis extends Unist.Parent {
    type: "emphasis";
    children: Phrasing[];
  }

  export interface Link extends Unist.Parent {
    type: "link";
    children: Flow[];
    url?: string;
  }

  export interface Text extends Unist.Literal {
    type: "text";
    value: string;
  }
}

export interface CodeBlockMeta {
  addedLines: number[];
  highlightLines: number[];
  nodeProperties: { [key: string]: string };
  removedLines: number[];
  startingLineNumber: number;
  usesLineNumbers: boolean;
}

export type InternalPlugin<
  Input extends string | Unist.Node | undefined,
  Output,
> = Unified.Plugin<[ProcessorOptions?], Input, Output>;

export interface ThemedTokensOptions {
  code: string;
  language: Shiki.Lang;
}