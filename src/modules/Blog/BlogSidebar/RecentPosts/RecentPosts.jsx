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
					return (
						<div className={s.post} key={slug}>
							<NavLink className={s.img}>
								<ImageWithFallback src={slug} alt={title} imgSize='xxs' />
							</NavLink>
							<div className={s.info}>
								<p className={s.title}>{title}</p>
								<p className={s.date}>{convertISODate(createdAt)}</p>
							</div>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
