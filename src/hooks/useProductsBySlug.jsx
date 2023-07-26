import React, { useEffect, useState } from 'react'
import { productsAPI } from '../api/products'
import { stringToSlug } from '../utils'

export const useProductsBySlug = (name, selected = false) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		if (selected) return

		const fetchData = async () => {
			try {
				const res = await productsAPI.getAllBySlug(stringToSlug(name)) // { products }
				setData(res.products)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [name, selected])

	return { data, loading, error }
}
