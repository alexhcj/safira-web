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
			limit: '3',
		}

		const fetchData = async () => {
			try {
				const data = await commentsAPI.findRecentComments(params)
				setComments(data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [])

	return (
		<div>
			<FilterTitle text='Recent Comments' />
			<ul className={s.comments}>
				{comments.map(({ text, user, postSlug }, index) => {
					const author = user && user.fullName.split(' ')[0]
					// TODO: add links to posts comments with autoscroll after navigate
					// const postUrl = `/blog/${postSlug}`

					const cropText = text && text.length > 28 ? text.slice(0, 25) + '...' : text

					return (
						<div className={s.comment} key={index}>
							{/* TODO: add user link to img & name */}
							<NavLink className={s.img_link} to='/user/profile/id'>
								{/* TODO: add user img */}
								<ImageWithFallback src='img' imgSize='avatar' alt='User avatar' className={s.img} />
							</NavLink>
							<div className={s.message}>
								<span className={s.says}>
									<NavLink className={s.name} to='/user/profile/id'>
										{author}
									</NavLink>
									&#160;says:&#160;
								</span>
								{/* TODO: add scroll to comment location when click and redirect */}
								<NavLink className={s.text} to='/'>
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
