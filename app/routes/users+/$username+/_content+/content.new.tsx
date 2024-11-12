// #app/routes/users+/$username+/_content+/content.new.tsx
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId } from '#app/utils/auth.server'
import { ContentEditor } from './__content-editor'

export { action } from './__content-editor.server'

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request)
  return json({})
}

export default function NewContent() {
  return <ContentEditor />
}