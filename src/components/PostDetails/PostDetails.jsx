import React from 'react'
// import { RelatedPosts } from './RelatedPosts/RelatedPosts'
import style from './post-details.module.scss'
import s from '../../modules/Blog/Post/post.module.scss'

export const PostDetails = ({ id, title, img, date, text, category }) => {
	window.scrollTo({ top:0 })

	return (
		<div className={s.post}>
			<div className={s.wrapper} key={id}>
				<p className={style.title}>{title}</p>
				<p className={s.date}>Date: <span>{date}</span> / Category: <span>{category}</span></p>
				<img className={s.img}
					style={{ marginTop: 28 }}
					src={img}
					alt={title}
				/>
				<p className={s.text}>{text}</p>
				{/*<RelatedPosts category={category} />*/}
			</div>
		</div>
	)
}
