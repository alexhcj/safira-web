import { useState } from 'react'

import { brandsAPI } from '@api/brands'

import { useErrorContext } from '@context/ErrorContext'

export const useBrands = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const findGroupedBrands = async () => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await brandsAPI.findGroupedBrands()

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

	return {
		findGroupedBrands,
		isLoading,
	}
}
