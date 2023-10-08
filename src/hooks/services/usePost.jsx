import { useEffect, useState } from 'react'
import { postsAPI } from '../../api/posts'
import { useParams } from 'react-router-dom'

export const usePost = () => {
	const { slug } = useParams()
	const [post, setPost] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)

				const post = await postsAPI.findBySlug(slug) // { post }
				setPost(post)
			} catch (err) {
				setIsError(err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [slug])

	return { post, isLoading, isError }
}
