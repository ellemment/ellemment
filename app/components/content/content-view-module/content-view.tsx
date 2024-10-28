// #app/components/content/content-view-module/content-view.tsx

import { type ContentViewProps } from '#app/utils/content-types/types'
import { ContentBody } from './content-view-body'
import { ContentTitle } from './content-view-title'
import { ContentToolbar } from './content-view-toolbar'

export function ContentView({ content, timeAgo, canDelete, isOwner }: ContentViewProps) {
  const displayBar = canDelete || isOwner

  return (
    <div className="absolute inset-0 flex flex-col px-10">
      <ContentTitle title={content.title} />
      <ContentBody 
        content={content.content}
        images={content.images}
        displayBar={displayBar}
      />
      <ContentToolbar 
        timeAgo={timeAgo}
        contentId={content.id}
        canDelete={canDelete}
        displayBar={displayBar}
      />
    </div>
  )
}