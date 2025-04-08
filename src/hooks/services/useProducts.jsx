import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { productsAPI } from '@api/products'

export const useProducts = () => {
	const [params] = useSearchParams({
		limit: '12',
		offset: '0',
		sort: 'popularity',
		order: 'desc',
	})

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [products, setProducts] = useState([])
	const [meta, setMeta] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = Object.fromEntries([...params])

				const res = await productsAPI.getAll(query) // {products, meta}

				setProducts(res.products)
				setMeta(res.meta)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [params])

	return { products, meta, loading, error }
}
