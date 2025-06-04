import { useState } from 'react'

import cn from 'classnames'

import { useAuthContext } from '@context/AuthContext'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Button } from '@shared/components/UI/Buttons/Button/Button'

import { capitalize, convertISODate } from '@utils/index'

import { Reply } from '../../Reply/Reply'

import s from './comment.module.scss'

// type: 'short'
export const Comment = ({
	comment: {
		createdAt,
		text,
		comments,
		user: { userId, firstName, avatarId },
	},
	type,
	nestedLvl,
}) => {
	const { user } = useAuthContext()
	const [isReplyHidden, setIsReplyHidden] = useState(true)
	const avatarUrl = `${import.meta.env.VITE_API_URL}/files/avatar/${avatarId}`

	return (
		<div className={s.wrapper} style={{ paddingLeft: 50 }}>
			<div className={cn(s.comment, type && s[`comment_${type}`])}>
				<ImageWithFallback
					onlySrc
					src={avatarUrl}
					imgSize='avatar'
					alt={avatarId ? `${firstName}'s avatar` : 'User default avatar'}
					className={s.img}
				/>
				<div className={s.box}>
					<div>
						<h5 className={s.author}>{firstName || 'User'}</h5>
						<span className={s.date}>{capitalize(convertISODate(createdAt, 'full-time').toLowerCase())}</span>
						<p className={s.text}>{capitalize(text)}</p>
					</div>
					{user && userId !== user.id && (
						<Button className={s.btn} onClick={() => setIsReplyHidden(!isReplyHidden)} disabled={!user}>
							Reply
						</Button>
					)}
				</div>
			</div>
			{!isReplyHidden && <Reply nestedLvl={nestedLvl} action='update' type='short' />}
			{comments && (
				<div className={s.replies}>
					{comments.map((comment, index) => (
						<Comment comment={comment} key={index} nestedLvl={`${nestedLvl}|${index}`} type='short' />
					))}
				</div>
			)}
		</div>
	)
}
