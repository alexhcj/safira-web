import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { postsAPI } from '../../../../api/posts'
import s from './recent-posts.module.scss'
import { FilterTitle } from '../../../../shared/components/UI/Sidebar/FilterTitle/FilterTitle'
import { ImageWithFallback } from '../../../../utils/ImageWithFallback'
import { convertISODate } from '../../../../utils'

export const RecentPosts = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const params = {
			sort: 'createdAt',
			offset: '0',
			limit: '3',
		}

		const fetchData = async () => {
			try {
				const { posts } = await postsAPI.getAll(params)
				setPosts(posts)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [])

	return (
		<div>
			<FilterTitle text='Recent Posts' />
			<ul className={s.posts}>
				{posts.map(({ title, slug, createdAt }) => {
					const url = `/blog/${slug}`
					const img = `${process.env.REACT_APP_PUBLIC_URL}/images/posts/${slug}`

					const cropTitle = title.length > 28 ? title.slice(0, 25) + '...' : title

					return (
						<div className={s.post} key={slug}>
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
				})}
			</ul>
		</div>
	)
}
