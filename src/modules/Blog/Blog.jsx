import { useCallback, useEffect, useRef } from 'react'

import { useSearchParams } from 'react-router-dom'

import { usePosts } from '@hooks/services/usePosts'
import { useIsBelow } from '@hooks/useIsBelow'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Text } from '@shared/components/UI/Text/Text'
import { BREAKPOINTS } from '@shared/data/breakpoints'
import { SidebarLayout } from '@shared/layouts/SidebarLayout/SidebarLayout'

import { BlogSidebar } from './BlogSidebar/BlogSidebar'
import { Post } from './Post/Post'

import s from './blog.module.scss'

export const Blog = () => {
	const tabletL = useIsBelow(BREAKPOINTS.tabletL)
	const [params, setParams] = useSearchParams()
	const { fetchPosts, posts, meta, isLoading } = usePosts()

	const infiniteTrigger = useRef(null)
	let lastScroll = 0

	useEffect(() => {
		const currentParams = Object.fromEntries([...params])

		if (params.size === 0) {
			setParams(import.meta.env.VITE_BLOG_DEFAULT_QUERY)
		} else if (currentParams.offset && currentParams.offset !== '0') {
			setParams({ ...currentParams, offset: '0' })
		}
	}, []) // Only run on mount

	useEffect(() => {
		fetchPosts(params)
	}, [params])

	const handleScroll = useCallback(() => {
		if (Date.now() - lastScroll < 100) {
			return
		}
		lastScroll = Date.now()

		const infiniteTriggerOffset = infiniteTrigger.current?.offsetTop ?? 0
		const currentOffset = window.innerHeight + document.documentElement.scrollTop

		if (currentOffset > infiniteTriggerOffset && !isLoading && !meta.isLastPage && posts.length !== 0) {
			const query = Object.fromEntries([...params])
			setParams({ ...query, offset: `${+query.offset + +query.limit}` })
		}
	}, [params, isLoading, meta.isLoading, setParams])

	useEffect(() => {
		!tabletL && window.addEventListener('scroll', handleScroll)
		return () => !tabletL && window.removeEventListener('scroll', handleScroll)
	}, [handleScroll, tabletL])

	const handleShowMore = () => {
		const query = Object.fromEntries([...params])
		setParams({ ...query, offset: `${+query.offset + +query.limit}` })
	}

	const postsList = posts.map((post) => <Post key={post.slug} {...post} />)
	const mainContent = posts.length > 0 ? postsList : <ItemsNotFound type='post' />
	const loadButton = (
		<Button className={s.btn_more} type='secondary' onClick={handleShowMore}>
			<Text>Show more</Text>
		</Button>
	)

	return (
		<section>
			<div className='container'>
				<SidebarLayout
					main={mainContent}
					loadButton={!meta.isLastPage && tabletL && loadButton}
					isLoading={isLoading}
					aside={<BlogSidebar isLoading={isLoading} />}
				/>
				{!tabletL && <div ref={infiniteTrigger}></div>}
			</div>
		</section>
	)
}
