import { useEffect } from 'react'
import { toast as showToast } from 'sonner'
import { type Toast } from '#app/utils/toast.server.js'

export function useToast(toast?: Toast | null) {
	useEffect(() => {
		if (toast) {
			setTimeout(() => {
				showToast[toast.type](toast.title, {
					id: toast.id,
					description: toast.description,
				})
			}, 0)
		}
	}, [toast])
}
