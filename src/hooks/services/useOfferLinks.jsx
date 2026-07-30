import { useEffect, useState } from 'react'

import { offersAPI } from '@api/offers'

export const useOfferLinks = (type) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
	const [links, setLinks] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

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
	}, [])

	return { links, isLoading, error }
}
