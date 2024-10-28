// #app/components/content/content-view-module/content-view-title.tsx

import { type ContentTitleProps } from '#app/utils/content-types/types'

export function ContentTitle({ title }: ContentTitleProps) {
  return (
    <h2 className="mb-2 pt-12 text-h2 lg:mb-6">
      {title}
    </h2>
  )
}

