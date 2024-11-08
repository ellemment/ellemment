// #app/utils/content/content-markdown/tiptap.server.ts

import  { type JSONContent } from '@tiptap/core'
import Link from '@tiptap/extension-link'
import { generateJSON, generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'

const extensions = [
  StarterKit,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer',
    },
  }),
]

export function jsonToHtml(jsonContent: string) {
  try {
    const json = JSON.parse(jsonContent) as JSONContent
    return generateHTML(json, extensions)
  } catch (e) {
    console.error('Error converting JSON to HTML:', e)
    return jsonContent // Fallback to raw content if parsing fails
  }
}

export function htmlToJson(html: string) {
  try {
    return JSON.stringify(generateJSON(html, extensions))
  } catch (e) {
    console.error('Error converting HTML to JSON:', e)
    return html // Fallback to raw content if conversion fails
  }
}