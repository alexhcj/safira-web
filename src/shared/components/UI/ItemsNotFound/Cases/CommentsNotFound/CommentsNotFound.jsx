import React from 'react'
import { ReactComponent as CommentsNotFoundSVG } from '../../../../../../assets/svg/comments-not-found.svg'
import s from './comments-not-found.module.scss'

export const CommentsNotFound = () => {
	return (
		<div className={s.box}>
			<CommentsNotFoundSVG className={s.image} />
			<h3 className={s.title}>Comments not found</h3>
			<p className={s.text}>
				There are no comments yet.
				<br />
				Be the first who left it and receive the bonus gift!
			</p>
		</div>
	)
}
