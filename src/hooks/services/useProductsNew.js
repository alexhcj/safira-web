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

	const findQueryBrands = async (params) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await productsAPI.findQueryBrands(params)

			return {
				success: true,
				...res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const findQueryTags = async (params) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await productsAPI.findQueryTags(params)

			return {
				success: true,
				tags: res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const findAllBrands = async () => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await productsAPI.findAllBrands()

			return {
				success: true,
				brands: res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const findAllBasicCategories = async () => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await productsAPI.findAllBasicCategories()

			return {
				success: true,
				categories: res.categories,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const findTopPopular = async ({ limit }) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await productsAPI.findTopPopular({ limit })

			const products = res.map(({ name, slug }) => ({ name, slug }))

			return {
				success: true,
				products,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const findTopByPrimeCategories = async () => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await productsAPI.findTopByPrimeCategories()

			return {
				success: true,
				categories: res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return {
		findProducts,
		findQueryBrands,
		findQueryTags,
		findAllBrands,
		findAllBasicCategories,
		findTopPopular,
		findTopByPrimeCategories,
		isLoading,
	}
}
