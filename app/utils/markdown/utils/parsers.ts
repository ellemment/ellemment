// #app/utils/markdown/utils/parsers.ts

import rangeParser from "parse-numeric-range";

/**
 * Parses a string representation of line numbers into an array of numbers.
 * @param param - A string containing line numbers, e.g., "[1-3,5,7-9]"
 * @returns An array of line numbers
 */
export function parseLineHighlights(param: string | null): number[] {
  if (!param) return [];
  let range = param.match(/^\[(.+)\]$/);
  if (!range || !range[1]) return [];
  return rangeParser(range[1]);
}

/**
 * Converts a fake hex color (used for vscode-textmate compatibility) to a CSS custom property.
 * @param color - A color string in the format "#FFFF${base-16-color-id}"
 * @returns A CSS custom property string
 */
export function convertFakeHexToCustomProp(color: string): string {
  return color.replace(/^#FFFF(.+)/, "var(--base$1)");
}

/**
 * Checks if a given URL is relative.
 * @param test - The URL to test
 * @returns True if the URL is relative, false otherwise
 */
export function isRelativeUrl(test: string): boolean {
  // Probably fragile but should work well enough.
  // It would be nice if the consumer could provide a baseURI we could do
  // something like:
  // new URL(baseURI).origin === new URL(test, baseURI).origin
  let regexp = new RegExp("^(?:[a-z]+:)?//", "i");
  return !regexp.test(test);
}

/**
 * Parses the metadata string of a code block.
 * @param meta - The metadata string from a code block
 * @returns An object containing parsed metadata parameters
 */
export function parseCodeBlockMeta(meta: string | string[] | undefined): URLSearchParams {
  let metaString = Array.isArray(meta) ? meta[0] : meta;
  let metaParams = new URLSearchParams();

  if (metaString) {
    let linesHighlightsMetaShorthand = metaString.match(/^\[(.+)\]$/);
    if (linesHighlightsMetaShorthand) {
      metaParams.set("lines", linesHighlightsMetaShorthand[0]);
    } else {
      metaParams = new URLSearchParams(metaString.split(/\s+/).join("&"));
    }
  }

  return metaParams;
}

/**
 * Escapes special characters in a string for use in HTML.
 * @param str - The string to escape
 * @returns The escaped string
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Normalizes a language identifier.
 * @param lang - The language identifier to normalize
 * @returns The normalized language identifier
 */
export function normalizeLanguage(lang: string): string {
  if (lang === "js") return "javascript";
  if (lang === "ts") return "typescript";
  return lang;
}