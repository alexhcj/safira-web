import { useEffect, useRef } from 'react'

import { useSearchParams } from 'react-router-dom'

import { usePosts } from '@hooks/services/usePosts'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Space } from '@shared/components/UI/Spacing/Space'
import { SidebarLayout } from '@shared/layouts/SidebarLayout/SidebarLayout'

import { BlogSidebar } from './BlogSidebar/BlogSidebar'
import { Post } from './Post/Post'

export const Blog = () => {
	const [params, setParams] = useSearchParams()
	const { fetchPosts, posts, meta, isLoading } = usePosts()
	const infiniteTrigger = useRef(null)
	let lastScroll = 0 // throttle trigger

	useEffect(() => {
		window.onbeforeunload = () => window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		fetchPosts(params)
	}, [params])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	const handleScroll = () => {
		if (Date.now() - lastScroll < 100) {
			return
		}
		lastScroll = Date.now()
		const infiniteTriggerOffset = infiniteTrigger.current ? infiniteTrigger.current.offsetTop : ''
		const currentOffset = window.innerHeight + document.documentElement.scrollTop
		if (currentOffset > infiniteTriggerOffset && !isLoading && !meta.isLastPage) {
			const query = Object.fromEntries([...params])

			setParams({ ...query, offset: `${+query.offset + +query.limit}` })
		}
	}

	const postsList = posts.map((post) => <Post key={post.slug} {...post} />)

	return (
		<section>
			<div className='container'>
				<SidebarLayout
					main={postsList || <ItemsNotFound type='post' />}
					aside={<BlogSidebar isLoading={isLoading} />}
				/>
				<div ref={infiniteTrigger}></div>
				{/* TODO: add empty component (no posts found) => add button which resets url params */}
				{isLoading && <Preloader />}
				<Space size='l' />
			</div>
		</section>
	)
}
