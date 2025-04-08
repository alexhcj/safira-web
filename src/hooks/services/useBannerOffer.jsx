import { useEffect, useState } from 'react'

import { offersAPI } from '@api/offers'

export const useBannerOffer = (type) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [offer, setOffer] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await offersAPI.getOfferByType(type)
				setOffer(res)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	return { offer, loading, error }
}
