// #app/components/content/content-view-module/content-view-body.tsx

import { type ContentBodyProps } from '#app/utils/content-types/types'
import { ImageGallery } from './image-view-gallery'

export function ContentBody({ content, images, displayBar }: ContentBodyProps) {
  return (
    <div className={`${displayBar ? 'pb-24' : 'pb-12'} overflow-y-auto`}>
      <ImageGallery images={images} />
      <p className="whitespace-break-spaces text-sm md:text-lg">
        {content}
      </p>
    </div>
  )
}