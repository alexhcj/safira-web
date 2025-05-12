import { useState } from 'react'

import { reviewsAPI } from '@api/reviews'

import { useErrorContext } from '@context/ErrorContext'

export const useReviews = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const createReview = async (data = {}) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await reviewsAPI.create(data) // data: {rating, review, reviewProductSlug}, res: ?
			return {
				success: true,
				review: res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const updateReview = async (slug, data = {}, query = {}) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await reviewsAPI.update(slug, data, query) // data: {text}, query: {nestedLvl}, res: ?
			return {
				success: true,
				comment: res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return { createReview, updateReview, isLoading }
}
