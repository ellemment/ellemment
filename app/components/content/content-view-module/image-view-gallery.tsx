// #app/components/content/content-view-module/image-view-gallery.tsx

import { type ImageGalleryProps } from '#app/utils/content-types/types'
import { getContentImgSrc } from '#app/utils/misc'

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <ul className="flex flex-wrap gap-5 py-5">
      {images.map((image) => (
        <li key={image.id}>
          <a href={getContentImgSrc(image.id)}>
            <img
              src={getContentImgSrc(image.id)}
              alt={image.altText ?? ''}
              className="h-32 w-32 rounded-lg object-cover"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}