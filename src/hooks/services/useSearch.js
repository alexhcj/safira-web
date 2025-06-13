import { useState } from 'react'

import { searchAPI } from '@api/search'

import { useErrorContext } from '@context/ErrorContext'

export const useSearch = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const findAllMatches = async (data = {}) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await searchAPI.findAllMatches(data)

			return {
				success: true,
				search: res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return { findAllMatches, isLoading }
}
