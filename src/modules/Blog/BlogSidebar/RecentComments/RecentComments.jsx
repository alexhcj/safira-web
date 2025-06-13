import { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { commentsAPI } from '@api/comments'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { FilterTitle } from '@shared/components/UI/Sidebar/FilterTitle/FilterTitle'

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

	if (!comments) {
		return null
	}

	return (
		<div>
			<FilterTitle text='Recent Comments' />
			<ul className={s.comments}>
				{comments.map(({ text, user, postSlug }, index) => {
					const author = user && user.firstName
					const avatarUrl = `${import.meta.env.VITE_API_URL}/files/avatar/${user.avatarId}`
					// const postUrl = `/blog/${postSlug}`

					const cropText = text && text.length > 28 ? text.slice(0, 25) + '...' : text

					return (
						<div className={s.comment} key={index}>
							<NavLink className={s.img_link} to='/user/profile/id'>
								<ImageWithFallback onlySrc src={avatarUrl} imgSize='avatar' alt='User avatar' className={s.img} />
							</NavLink>
							<div className={s.message}>
								<span className={s.says}>
									<NavLink className={s.name} to='/user/profile/id'>
										{author}
									</NavLink>
									&#160;says:&#160;
								</span>
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
