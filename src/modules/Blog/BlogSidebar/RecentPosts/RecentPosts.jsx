import { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { postsAPI } from '@api/posts'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { FilterTitle } from '@shared/components/UI/Sidebar/FilterTitle/FilterTitle'
import { RecentPostsSkeleton } from '@shared/components/UI/Skeletons/RecentPostsSkeleton/RecentPostsSkeleton'

import { convertISODate } from '@utils/date'

import s from './recent-posts.module.scss'

export const RecentPosts = () => {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const params = {
			sort: 'createdAt',
			offset: '0',
			limit: '3',
		}

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const { posts } = await postsAPI.getAll(params)
				setPosts(posts)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	return (
		<div>
			<FilterTitle text='Recent Posts' />
			{!isLoading && posts.length === 0 && <div className={s.no_posts}>No recent posts found</div>}
			<ul className={s.posts}>
				{isLoading ? (
					<RecentPostsSkeleton quantity={3} />
				) : (
					posts.map(({ title, slug, createdAt }) => {
						const url = `/blog/${slug}`
						const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/posts/${slug}`

						const cropTitle = title.length > 28 ? title.slice(0, 25) + '...' : title

						return (
							<div className={s.post} key={`${slug}-recent`}>
								<NavLink className={s.img} to={url}>
									<ImageWithFallback src={img} alt={title} imgSize='xxs' />
								</NavLink>
								<div className={s.info}>
									<NavLink to={url}>
										<h4 className={s.title}>{cropTitle}</h4>
									</NavLink>
									<span className={s.date}>{convertISODate(createdAt, 'full')}</span>
								</div>
							</div>
						)
					})
				)}
			</ul>
		</div>
	)
}
