import { useState } from 'react'

import cn from 'classnames'

import { useAuthContext } from '@context/AuthContext'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { ImageWithFallback } from '@utils/ImageWithFallback'
import { capitalizeFirstLetter, convertISODate } from '@utils/index'

import { Reply } from '../../Reply/Reply'

import s from './comment.module.scss'

// type: 'short'
export const Comment = ({
	comment: {
		createdAt,
		text,
		comments,
		user: { firstName, avatarId },
	},
	type,
	nestedLvl,
}) => {
	const { user } = useAuthContext()
	const [isReplyHidden, setIsReplyHidden] = useState(true)
	const avatarUrl = `${process.env.REACT_APP_API_URL}/files/avatar/${avatarId}`

	return (
		<div className={s.wrapper} style={{ paddingLeft: 50 }}>
			<div className={cn(s.comment, type && s[`comment_${type}`])}>
				<ImageWithFallback
					onlySrc
					src={avatarUrl}
					imgSize='avatar'
					alt={avatarId ? `${firstName}'s avatar` : 'User devault avatar'}
					className={s.img}
				/>
				<div className={s.box}>
					<div>
						<h5 className={s.author}>{firstName}</h5>
						<span className={s.date}>
							{capitalizeFirstLetter(convertISODate(createdAt, 'full-time').toLowerCase())}
						</span>
						<p className={s.text}>{capitalizeFirstLetter(text)}</p>
					</div>
					{/* TODO: add scroll on click to login/register user actions if !user */}
					<Button className={s.btn} onClick={() => setIsReplyHidden(!isReplyHidden)} disabled={!user}>
						Reply
					</Button>
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
