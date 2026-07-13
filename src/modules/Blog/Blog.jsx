import { useCallback, useEffect, useRef } from 'react'

import { useSearchParams } from 'react-router-dom'

import { usePosts } from '@hooks/services/usePosts'
import { useIsBelow } from '@hooks/useIsBelow'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Text } from '@shared/components/UI/Text/Text'
import { BREAKPOINTS } from '@shared/data/breakpoints'
import { SidebarLayout } from '@shared/layouts/SidebarLayout/SidebarLayout'

import { BlogSidebar } from './BlogSidebar/BlogSidebar'
import { Post } from './Post/Post'

import s from './blog.module.scss'

export const Blog = () => {
	const isTabletL = useIsBelow(BREAKPOINTS.tabletL)
	const [params, setParams] = useSearchParams()
	const { fetchPosts, posts, meta, isLoading, hasFetchedOnce } = usePosts()

	const infiniteTrigger = useRef(null)
	const lastScroll = useRef(0) // was a plain `let` — reset every render, throttle never worked

	useEffect(() => {
		const currentParams = Object.fromEntries([...params])

		if (params.size === 0) {
			setParams(import.meta.env.VITE_BLOG_DEFAULT_QUERY)
		} else if (currentParams.offset && currentParams.offset !== '0') {
			setParams({ ...currentParams, offset: '0' })
		}
	}, [])

	useEffect(() => {
		fetchPosts(params)
	}, [params])

	const offset = params.get('offset') ?? '0'
	const isInitialLoading = isLoading && offset === '0'
	const isLoadingMore = isLoading && offset !== '0'
	const notFound = hasFetchedOnce && !isLoading && posts.length === 0

	const handleScroll = useCallback(() => {
		if (Date.now() - lastScroll.current < 100) return
		lastScroll.current = Date.now()

		const infiniteTriggerOffset = infiniteTrigger.current?.offsetTop ?? 0
		const currentOffset = window.innerHeight + document.documentElement.scrollTop

		if (currentOffset > infiniteTriggerOffset && !isLoading && !meta.isLastPage && posts.length !== 0) {
			const query = Object.fromEntries([...params])
			setParams({ ...query, offset: `${+query.offset + +query.limit}` })
		}
	}, [params, isLoading, meta.isLastPage, setParams])

	useEffect(() => {
		!isTabletL && window.addEventListener('scroll', handleScroll)
		return () => !isTabletL && window.removeEventListener('scroll', handleScroll)
	}, [handleScroll, isTabletL])

	const handleShowMore = () => {
		const query = Object.fromEntries([...params])
		setParams({ ...query, offset: `${+query.offset + +query.limit}` })
	}

	const mainContent = notFound ? <ItemsNotFound type='post' /> : posts.map((post) => <Post key={post.slug} {...post} />)

	return (
		<section>
			<div className='container'>
				<SidebarLayout
					main={mainContent}
					isInitialLoading={isInitialLoading}
					isLoadingMore={isLoadingMore}
					showDesktopTrailingPreloader={!isTabletL}
					loadButton={
						!meta.isLastPage && isTabletL ? (
							<Button className={s.btn_more} type='secondary' onClick={handleShowMore} disabled={isLoadingMore}>
								{isLoadingMore ? <Preloader width={20} height={20} /> : <Text>Show more</Text>}
							</Button>
						) : null
					}
					aside={<BlogSidebar isLoading={isInitialLoading} />}
				/>
				{!isTabletL && <div ref={infiniteTrigger}></div>}
			</div>
		</section>
	)
}
