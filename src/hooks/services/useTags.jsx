import { useState } from 'react'

import { tagsAPI } from '@api/tags'

import { useErrorContext } from '@context/ErrorContext'

export const useTags = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const findUniqueDietaryTags = async () => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await tagsAPI.findUniqueDietaryTags()

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

	return { findUniqueDietaryTags, isLoading }
}
