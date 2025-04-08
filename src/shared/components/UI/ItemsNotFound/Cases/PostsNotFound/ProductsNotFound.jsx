import { ReactComponent as PostsNotFoundSVG } from '@assets/svg/posts-not-found.svg'

import s from './posts-not-found.module.scss'

export const PostsNotFound = () => {
	return (
		<div className={s.box}>
			<PostsNotFoundSVG className={s.image} />
			<h3 className={s.title}>Posts not found</h3>
			<p className={s.text}>
				Your search did not match any posts.
				<br />
				Please modify it or try later.
			</p>
		</div>
	)
}
