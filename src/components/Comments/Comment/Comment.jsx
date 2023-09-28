import React from 'react'
import { ImageWithFallback } from '../../../utils/ImageWithFallback'
import { Button } from '../../../shared/components/UI/Buttons/Button/Button'
import { capitalizeFirstLetter, convertISODate } from '../../../utils'
import s from './comment.module.scss'

export const Comment = ({ comment: { createdAt, text, user: { fullName }, avatar } = {} }) => {
	const author = fullName.split(' ')[0]

	return (
		<div className={s.comment}>
			<ImageWithFallback
				src='img'
				imgSize='xxxs'
				alt={avatar ? `${author}'s avatar` : 'User devault avatar'}
				className={s.img}
			/>
			<div className={s.box}>
				<div className={s.message}>
					<h5 className={s.author}>{author}</h5>
					<span className={s.date}>{capitalizeFirstLetter(convertISODate(createdAt, 'full-time').toLowerCase())}</span>
					<p className={s.text}>{capitalizeFirstLetter(text)}</p>
				</div>
				<Button className={s.btn}>Reply</Button>
			</div>
		</div>
	)
}
