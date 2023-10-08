import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { commentsAPI } from '../../api/comments'

export const useComments = () => {
	const { slug } = useParams()
	const [status, setStatus] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const create = useCallback(async (text) => {
		return await commentsAPI.create(slug, text)
	}, [])

	const update = useCallback(async (slug, data, params) => {
		return await commentsAPI.update(slug, data, params)
	}, [])

	return { create, update, status, isLoading, isError }
}
