import { useEffect, useState } from 'react'
import { postsAPI } from '../../api/posts'
import { useNavigate, useParams } from 'react-router-dom'

export const usePost = () => {
	const navigate = useNavigate()
	const { slug } = useParams()
	const [post, setPost] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)

				const post = await postsAPI.findBySlug(slug) // { post }

				if (post.statusCode === 404) navigate('/not-found')

				setPost(post)
			} catch (err) {
				setIsError(err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [navigate, slug])

	return { post, isLoading, isError }
}
