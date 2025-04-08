import { deepCount } from '@utils/index'

import { Comment } from './Comment/Comment'

import s from './comments.module.scss'

export const Comments = ({ comments, isLoading }) => {
	return (
		<>
			{!isLoading && comments && (
				<div className={s.block}>
					<h3 className={s.title}>
						<span>{deepCount(comments).length}</span> Comments
					</h3>
					<div className={s.comments}>
						{comments.map((comment, index) => (
							<Comment comment={comment} key={index} nestedLvl={index} />
						))}
					</div>
				</div>
			)}
		</>
	)
}
