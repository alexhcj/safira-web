import { useEffect, useState } from 'react'
import { offersAPI } from '../../api/offers'

export const useOfferLinks = (type) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [links, setLinks] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await offersAPI.getAll({ type })
				setLinks(res)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	return { links, loading, error }
}
