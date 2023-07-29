import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BlogSidebar } from './BlogSidebar/BlogSidebar'
import { SidebarLayout } from '../../shared/layout/SidebarLayout/SidebarLayout'
import { Post } from './Post/Post'
import { Border } from '../../shared/components/UI/Spacing/Border'
import { Space } from '../../shared/components/UI/Spacing/Space'
import { Preloader } from '../../shared/components/common/Preloader/Preloader'
import { usePosts } from '../../hooks/services/usePosts'

export const Blog = () => {
	const [params, setParams] = useSearchParams()
	const { posts, meta, loading } = usePosts()
	const offsetGap = 2
	const infiniteTrigger = useRef(null)
	let lastScroll = 0 // throttle trigger

	// moves screen to page top after refresh
	useEffect(() => {
		window.onbeforeunload = () => window.scrollTo(0, 0)
	}, [])

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
		if (currentOffset > infiniteTriggerOffset && !loading && !meta.isLastPage) {
			const query = Object.fromEntries([...params])

			setParams({ ...query, offset: `${+query.offset + offsetGap}` })
		}
	}

	const postsList = posts.map(post => <Post key={post.slug} {...post} />)

	return (
		<section>
			<div className="container">
				<SidebarLayout main={postsList} aside={<BlogSidebar isLoading={loading} />} />
				<div ref={infiniteTrigger}></div>
				{loading && <Preloader />}
				<Space size="l" />
				<Border />
			</div>
		</section>
	)
}
