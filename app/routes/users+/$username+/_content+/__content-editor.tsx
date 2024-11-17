// #app/routes/users+/$username+/_content+/__content-editor.tsx

import { type Content, type ContentImage } from '@prisma/client'
import { type SerializeFrom } from '@remix-run/node'
import { ContentEditor as ContentEditorComponent } from '#app/interface/composite/content/editor-module/content-edit'

interface ContentEditorProps {
  content?: SerializeFrom<
    Pick<Content, 'id' | 'title' | 'content'> & {
      images: Array<Pick<ContentImage, 'id' | 'altText'>>
    }
  >
}

export function ContentEditor({ content }: ContentEditorProps) {
  return <ContentEditorComponent content={content} />
}