// #app/routes/users+/$username+/_content+/content.new.tsx
import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import { ContentEditor } from './__content-editor'

export { action } from './__content-editor.server'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  
  // Check if the logged-in user is the owner of this route
  const owner = await prisma.user.findFirst({
    select: { id: true },
    where: { username: params.username },
  })

  if (!owner || owner.id !== userId) {
    return redirect(`/users/${params.username}/content`)
  } 

  return json({})
}

export default function NewContent() {
  return (
    <div className="space-y-8">
      <ContentEditor />
    </div>
  )
}