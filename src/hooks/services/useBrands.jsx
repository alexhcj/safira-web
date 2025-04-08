import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

export const useBrands = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [brands, setBrands] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getAllBrands()
				setBrands(data)
				setLoading(false)
			} catch (err) {
				setError(err)
				setLoading(false)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	return { brands, loading, error }
}
