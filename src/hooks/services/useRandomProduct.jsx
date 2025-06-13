import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

export const useRandomProduct = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [product, setProduct] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const product = await productsAPI.findRandom() // { ...product }

				setProduct(product[0])
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	return { product, loading, error }
}
