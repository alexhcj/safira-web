import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { postsAPI } from '@api/posts'

export const usePosts = () => {
	const navigate = useNavigate()
	const [posts, setPosts] = useState([])
	const [meta, setMeta] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const fetchPosts = async (params = {}) => {
		setIsLoading(true)
		try {
			const { posts, meta } = await postsAPI.getAll(params) // { posts, meta }
			params.get('offset') === '0' ? setPosts(posts) : setPosts((prev) => [...prev, ...posts])
			setMeta(meta)
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const getPostBySlug = async (slug) => {
		setIsLoading(true)
		try {
			const res = await postsAPI.findBySlug(slug)

			return {
				success: true,
				post: res,
			}
		} catch (error) {
			if (error.status === 404) navigate('/not-found')
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return { posts, meta, isLoading, fetchPosts, getPostBySlug }
}
