import { useState } from 'react'

import { productsAPI } from '@api/products'

import { useErrorContext } from '@context/ErrorContext'

export const useProductsNew = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)
	// const [params] = useSearchParams({
	// 	limit: '12',
	// 	offset: '0',
	// 	sort: 'popularity',
	// 	order: 'desc',
	// })

	const findProducts = async (params) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await productsAPI.getAll(params) // {products, meta}

			return {
				success: true,
				products: res.products,
				meta: res.meta,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return { findProducts, isLoading }
}
