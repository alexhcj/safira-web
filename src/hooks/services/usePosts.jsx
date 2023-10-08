import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { postsAPI } from '../../api/posts'

export const usePosts = () => {
	const [params, setParams] = useSearchParams()
	const [posts, setPosts] = useState([])
	const [meta, setMeta] = useState({})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		const defaultParams = {
			offset: '0',
			order: 'asc',
			sort: 'createdAt',
			limit: '2',
		}
		setParams(defaultParams)
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const query = Object.fromEntries([...params])

				const { posts, meta } = await postsAPI.getAll(query) // { posts, meta }

				query.offset === '0' ? setPosts(posts) : setPosts((prev) => [...prev, ...posts])
				setMeta(meta)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [params])

	return { posts, meta, loading, error }
}
