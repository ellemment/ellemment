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
    const json = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent
    return generateHTML(json as JSONContent, extensions)
  } catch (e) {
    console.error('Error converting JSON to HTML:', e)
    return jsonContent
  }
}

export function stringToEditorContent(content: string): JSONContent {
  try {
    // If it's already a JSON string, parse and return it
    if (content.startsWith('{') && content.includes('"type":"doc"')) {
      const parsedContent = JSON.parse(content) as JSONContent
      if (!parsedContent.type) {
        throw new Error('Invalid editor content structure')
      }
      return parsedContent
    }
    
    // If it's plain text/markdown, convert it to editor format
    return generateJSON(content, extensions)
  } catch (e) {
    console.error('Error converting string to editor content:', e)
    // Fallback to creating a basic document structure
    return {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: content }]
        }
      ]
    }
  }
}

// If you need to export types for use elsewhere
export type { JSONContent }