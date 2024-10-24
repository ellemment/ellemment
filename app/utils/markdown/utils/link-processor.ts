// #app/utils/markdown/utils/strip-link.ts

// #app/utils/markdown/utils/strip-link.ts

import { visit, SKIP } from "unist-util-visit";
import { type UnistNode, type InternalPlugin } from "../types";
import { isRelativeUrl } from "./parsers";

export function createLinkProcessor(): InternalPlugin<UnistNode.Root, UnistNode.Root> {
  return (options = {}) => {
    return function transformer(tree: UnistNode.Root) {
      visit(tree, "link", (node, index, parent) => {
        if (
          options.resolveHref &&
          typeof node.url === "string" &&
          isRelativeUrl(node.url)
        ) {
          if (parent && index != null) {
            parent.children[index] = {
              ...node,
              url: options.resolveHref(node.url),
            };
            return SKIP;
          }
        }
      });
    };
  };
}