

import { Link } from '@remix-run/react'
import { DeleteContent } from '#app/ellemment-ui/composite/content/editor-module/content-edit'
import { Icon } from '#app/ellemment-ui/foundations/icons/icon'
import { Button } from "#app/ellemment-ui/shadcn/button"
import { getContentImgSrc } from '#app/utils/content/image-module'
import { 
  type ContentViewProps, 
  type ContentBodyProps, 
  type ContentTitleProps, 
  type ContentToolbarProps,
  type ImageGalleryProps 
} from '#app/utils/content/types-module/types'
import { floatingToolbarClassName } from '../utils/floating-toolbar'

function ImageGallery({ images }: ImageGalleryProps) {
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


function ContentBody({ content, images, displayBar }: ContentBodyProps) {
  return (
    <div className={`${displayBar ? 'pb-24' : 'pb-12'} overflow-y-auto`}>
      <ImageGallery images={images} />
      <div 
        className="whitespace-break-spaces text-sm md:text-lg prose prose-stone"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

function ContentTitle({ title }: ContentTitleProps) {
  return (
    <div
      className="mb-2 pt-12 text-h2 lg:mb-6 md-prose"
      dangerouslySetInnerHTML={{
        __html: `<h1>${title}</h1>`
      }}
    />
  )
}

function ContentToolbar({ timeAgo, contentId, canDelete, displayBar }: ContentToolbarProps) {
  if (!displayBar) return null
  return (
    <div className={floatingToolbarClassName}>
      <span className="text-sm text-foreground/90 max-[524px]:hidden">
        <Icon name="clock" className="scale-125">
          {timeAgo} ago
        </Icon>
      </span>
      <div className="grid flex-1 grid-cols-2 justify-end gap-2 min-[525px]:flex md:gap-4">
        {canDelete ? <DeleteContent id={contentId} /> : null}
        <Button
          asChild
          className="min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0"
        >
          <Link to="edit">
            <Icon name="pencil-1" className="scale-125 max-md:scale-150">
              <span className="max-md:hidden">Edit</span>
            </Icon>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export function ContentView({ content, timeAgo, canDelete, isOwner }: ContentViewProps) {
  const displayBar = canDelete || isOwner
  return (
    <div className="absolute inset-0 flex flex-col px-5">
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