import React, { useEffect, useRef, useState } from 'react'
import { postsAPI } from '../../api/posts'
import { BlogSidebar } from './BlogSidebar/BlogSidebar'
import { SidebarLayout } from '../../shared/layout/SidebarLayout/SidebarLayout'
import { Post } from './Post/Post'
import { Border } from '../../shared/components/UI/Spacing/Border'
import { Space } from '../../shared/components/UI/Spacing/Space'
import { Preloader } from '../../shared/components/common/Preloader/Preloader'

export const Blog = () => {
	const [posts, setPosts] = useState([])
	const [offset, setOffset] = useState(0)
	const limit = 2
	const [isLoading, setIsLoading] = useState(false)
	const infiniteTrigger = useRef(null)
	let lastScroll = 0
	// TODO: add total|recieve last posts pack => check condition
	// add check if posts less then or take 'last' from back "page" stop render loader|try to fetch

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const data = await postsAPI.getAll({ limit, offset })
				setPosts(prevState => [...new Set([...prevState, ...data.posts])])
				setIsLoading(false)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [limit, offset])

	useEffect(() => {
		window.onbeforeunload = () => {
			window.scrollTo(0, 0)
		}
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const handleScroll = () => {
		if (Date.now() - lastScroll < 100) {
			return
		}
		lastScroll = Date.now()
		const infiniteTriggerOffset = infiniteTrigger.current ? infiniteTrigger.current.offsetTop : ''
		const currentOffset = window.innerHeight + document.documentElement.scrollTop
		if (currentOffset > infiniteTriggerOffset) {
			setOffset((prev) => prev + limit)
		}
	}

	const postsList = posts && posts.map(post => <Post key={post.slug} {...post} />)

	return (
		<section>
			<div className="container">
				<SidebarLayout main={postsList} aside={<BlogSidebar />} />
				<div ref={infiniteTrigger}>1</div>
				{isLoading && <Preloader />}
				<Space size="l" />
				<Border />
			</div>
		</section>
	)
}
