// #app/utils/use-root-data.ts
import { type SerializeFrom } from '@remix-run/server-runtime'
import { useMatchLoaderData } from '#app/utils/providers/provider'
import { handle, type RootLoaderType } from '../root.tsx'

export const useRootData = () =>
	useMatchLoaderData<SerializeFrom<RootLoaderType>>(handle.id)
export function useUser() {
	const { user } = useRootData()
	if (!user) throw new Error('User is required when using useUser')
	return user
}

export function useOptionalUser() {
	const { user } = useRootData()
	return user
}
