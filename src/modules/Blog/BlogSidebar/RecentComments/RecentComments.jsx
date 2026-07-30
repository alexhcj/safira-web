import { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { commentsAPI } from '@api/comments'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { FilterTitle } from '@shared/components/UI/Sidebar/FilterTitle/FilterTitle'
import { RecentCommentsSkeleton } from '@shared/components/UI/Skeletons/RecentCommentsSkeleton/RecentCommentsSkeleton'

import s from './recent-comments.module.scss'

export const RecentComments = () => {
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const params = {
			limit: '3',
		}

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const data = await commentsAPI.findRecentComments(params)
				setComments(data)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	if (comments.length === 0) {
		return null
	}

	return (
		<div>
			<FilterTitle text='Recent Comments' />
			<ul className={s.comments}>
				{isLoading ? (
					<RecentCommentsSkeleton quantity={3} />
				) : (
					comments.map(({ text, user, postSlug }, index) => {
						const author = user && user.fullName
						const authorName = author.split(' ')[0]
						const avatarUrl = `${import.meta.env.VITE_API_URL}/files/avatar/${user.avatarId}`
						// const postUrl = `/blog/${postSlug}`

						return (
							<div className={s.comment} key={index}>
								<NavLink to='/user/profile/id'>
									<ImageWithFallback onlySrc src={avatarUrl} imgSize='avatar' alt='User avatar' className={s.img} />
								</NavLink>
								<div className={s.message}>
									<span className={s.says}>
										{/* to='/user/profile/id' */}
										<NavLink className={s.name} to='/'>
											{authorName ?? 'User'}
										</NavLink>
										&#160;says:&#160;
									</span>
									<NavLink className={s.text} to='/'>
										{text}
									</NavLink>
								</div>
							</div>
						)
					})
				)}
			</ul>
		</div>
	)
}
