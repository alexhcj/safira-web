import { useState } from 'react'

import { commentsAPI } from '@api/comments'

import { useErrorContext } from '@context/ErrorContext'

export const useComments = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const createComment = async (slug, data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await commentsAPI.create(slug, data)
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

	const updateComment = async (slug, data = {}, query = {}) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await commentsAPI.update(slug, data, query) // data: {text}, query: {nestedLvl}, res: ?
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

	return { createComment, updateComment, isLoading }
}
