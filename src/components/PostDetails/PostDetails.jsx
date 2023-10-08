import React from 'react'
// import { RelatedPosts } from './RelatedPosts/RelatedPosts'
import { usePost } from '../../hooks/services/usePost'
import { Comments } from '../Comments/Comments'
import { Reply } from '../Reply/Reply'
import { Preloader } from '../../shared/components/common/Preloader/Preloader'
import { ItemsNotFound } from '../../shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Border } from '../../shared/components/UI/Spacing/Border'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import { convertISODate } from '../../utils'
import s from './post-details.module.scss'

export const PostDetails = () => {
	const { post, isLoading } = usePost()
	const { slug, title, createdAt, comments, author, text } = post
	const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/posts/${slug}`
	const postAuthor = author && author.fullName.split(' ')[0]

	return (
		<>
			{isLoading ? (
				<Preloader />
			) : (
				<>
					<div className={s.post}>
						<div className={s.header}>
							<h3 className={s.title}>{title}</h3>
							<div className={s.meta}>
								<div className={s.author}>
									Posted by : <span>{postAuthor}</span>
								</div>
								<span>/</span>
								<span className={s.date}>
									On : <span>{convertISODate(createdAt, 'full')}</span>
								</span>
							</div>
						</div>
						<ImageWithFallback className={s.img} src={img} imgSize='blog-post' alt={title} />
						<p className={s.text}>{text}</p>
						{/* TODO: add share to socials */}
						{/* TODO: add tags */}
					</div>
					<Border />
					{/*<RelatedPosts category={category} />*/}
					{comments && <Comments comments={comments.comments} isLoading={isLoading} />}
					{!isLoading && !comments && <ItemsNotFound type='comments' />}
					<Reply action={comments && comments.length !== 0 ? 'update' : 'create'} />
				</>
			)}
		</>
	)
}
