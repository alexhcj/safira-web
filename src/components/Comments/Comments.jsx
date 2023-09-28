import React from 'react'
import { Comment } from './Comment/Comment'
import s from './comments.module.scss'

export const Comments = ({ comments }) => {
	return (
		<div className={s.block}>
			<h3 className={s.title}>
				<span>{comments.length}</span> Comments
			</h3>
			<div className={s.comments}>
				{comments.map((comment) => (
					<Comment comment={comment} key={comment.id} />
				))}
			</div>
		</div>
	)
}
