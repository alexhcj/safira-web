import { useState } from 'react'

import { categoriesAPI } from '@api/categories'

import { useErrorContext } from '@context/ErrorContext'

export const useCategories = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const findTree = async () => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await categoriesAPI.findTree()

			return { success: true, tree: res }
		} catch (err) {
			return { success: false, err }
		} finally {
			setIsLoading(false)
		}
	}

	const findAll = async (params) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await categoriesAPI.findAll(params)

			return { success: true, categories: res.categories, meta: res.meta }
		} catch (err) {
			return { success: false, err }
		} finally {
			setIsLoading(false)
		}
	}

	return {
		findTree,
		findAll,
		isLoading,
	}
}
