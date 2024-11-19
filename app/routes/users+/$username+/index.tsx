// #app/routes/account+/$username+/index.tsx

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs) {
	return redirect(`/users/${params.username}/content`)
}
