import { useEffect, useState } from 'react'

import { offersAPI } from '@api/offers'

export const useOfferLinks = (type) => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [links, setLinks] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await offersAPI.getAll({ type })
				setLinks(res)
			} catch (err) {
				setError(err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [type])

	return { links, isLoading, error }
}
