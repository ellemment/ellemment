// #app/components/content/content-view-module/content-view-toolbar.tsx

import { Link } from '@remix-run/react'
import { floatingToolbarClassName } from '#app/components/core/floating-toolbar'
import { Button } from '#app/components/ui/button'
import { Icon } from '#app/components/ui/icon'
import { type ContentToolbarProps } from '#app/utils/content-types/types'
import { DeleteContent } from '../content-editor-module/content-edit-delete'

export function ContentToolbar({ timeAgo, contentId, canDelete, displayBar }: ContentToolbarProps) {
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