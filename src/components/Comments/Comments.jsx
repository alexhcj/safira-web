import { CommentThreadProvider } from '@context/CommentThreadContext'

import { countCommentsDeep } from '@utils/object'

import { Comment } from './Comment/Comment'

import s from './comments.module.scss'

/**
 * Comments wrapper component that initializes the recursive comment structure
 *
 * @param {Array} comments - Array of root-level comments
 * @param {boolean} isLoading - Loading state
 */
export const Comments = ({ comments, isLoading }) => {
	return (
		<>
			{!isLoading && comments && comments.length > 0 && (
				<div className={s.block}>
					<h3 className={s.title}>
						<span>{countCommentsDeep(comments)}</span> Comments
					</h3>
					<CommentThreadProvider comments={comments}>
						<div className={s.comments}>
							{comments.map((comment, index) => (
								<Comment
									comment={comment}
									key={comment.id || index}
									currentIndex={index}
									depth={0} // root level comments start at depth 0
									type='default'
								/>
							))}
						</div>
					</CommentThreadProvider>
				</div>
			)}
		</>
	)
}
