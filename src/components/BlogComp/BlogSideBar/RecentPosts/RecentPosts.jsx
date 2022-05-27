import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FullsizeDivider } from '../../../UI'
import { postsAPI } from '../../../../api/posts'
import s from './recent-posts.module.scss'

export const RecentPosts = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const params = {
			limit: 3
		}
		const fetchData = async () => {
			try {
				const data = await postsAPI.getAll(params)
				setPosts(data.data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	},[])

	return (
		<div className={s.section}>
			<p className={s.heading}>Recent Posts</p>
			<FullsizeDivider marginTop={10} />
			<ul className={s.posts}>
				{posts.map((post) => {
					let { id, title, date, img, text } = post
					text = text.slice(0, 80) + '...'
					const url = {
						pathname: `/blog/${id}`,
					}
					return (
						<NavLink className={s.wrapper} key={id} to={url}>
							<div className={s.hover_container}>
								<img className={s.img_hidden} src={img} alt={title} />
								<p className={s.title_hidden}>{title}</p>
								<p className={s.text_hidden}>{text}</p>
							</div>
							<img className={s.img} src={img} alt={title} />
							<div className={s.block}>
								<p className={s.title}>{title}</p>
								<p className={s.date}>{date}</p>
							</div>
						</NavLink>
					)
				})}
			</ul>
		</div>
	)
}
