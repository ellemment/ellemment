// #app/routes/account+/$username+/_content+/content.index.tsx

import { type MetaFunction } from '@remix-run/react'
import { type loader as contentLoader } from './content'

export default function ContentIndexRoute() {
  return (
    <div className="container pt-12">
      <p className="text-body-md">Select an element</p>
    </div>
  )
}

export const meta: MetaFunction<
  null,
  { 'routes/users+/$username_+/content': typeof contentLoader }
> = ({ params, matches }) => {
  const contentMatch = matches.find(
    (m) => m.id === 'routes/users+/$username_+/content',
  )
  const displayName = contentMatch?.data?.owner.name ?? params.username
  const noteCount = contentMatch?.data?.owner.content.length ?? 0
  const contentText = noteCount === 1 ? 'content' : 'contents'
  return [
    { title: `${displayName}'s content | Epic Content` },
    {
      name: 'description',
      content: `Checkout ${displayName}'s ${noteCount} ${contentText} on Epic content`,
    },
  ]
}