import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { commentsAPI } from '../../../../api/comments'
import { ImageWithFallback } from '../../../../utils/ImageWithFallback'
import { FilterTitle } from '../../../../shared/components/UI/Sidebar/FilterTitle/FilterTitle'
import s from './recent-comments.module.scss'

export const RecentComments = () => {
	const [comments, setComments] = useState([])

	useEffect(() => {
		const params = {
			sort: 'createdAt',
			order: '1',
			offset: '0',
			limit: '3',
		}
		const fetchData = async () => {
			try {
				const data = await commentsAPI.getAll(params)
				setComments(data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [])

	return (
		<div>
			<FilterTitle title='Recent Comments' />
			<ul className={s.comments}>
				{comments.map(({ text, name, postSlug }) => {
					const postUrl = `/blog/${postSlug}`

					const cropText = text.length > 28 ? text.slice(0, 25) + '...' : text

					return (
						<div className={s.comment} key={name}>
							{/* TODO: add user link to img & name */}
							<NavLink className={s.img_link} to='/user/profile/id'>
								{/* TODO: add user img */}
								<ImageWithFallback src='img' imgSize='xxxs' alt='User avatar' className={s.img} />
							</NavLink>
							<div className={s.message}>
								<NavLink className={s.name} to='/user/profile/id'>
									{name}
								</NavLink>
								<span className={s.says}>&#160;says:&#160;</span>
								{/* TODO: add scroll to comment location when click and redirect */}
								<NavLink className={s.text} to={postUrl}>
									{cropText}
								</NavLink>
							</div>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
