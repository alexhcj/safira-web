import { useEffect, useState } from 'react'

import { offersAPI } from '@api/offers'

export const useBannerOffer = (type) => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [offer, setOffer] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await offersAPI.getOfferByType(type)
				setOffer(res)
			} catch (err) {
				setError(err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [type])

	return { offer, isLoading, error }
}
