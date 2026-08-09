import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { usePosts } from '@hooks/services/usePosts'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { CommentsSkeleton } from '@shared/components/UI/Skeletons/CommentsSkeleton/CommentsSkeleton'
import { PostSkeleton } from '@shared/components/UI/Skeletons/PostSkeleton/PostSkeleton'
import { Border } from '@shared/components/UI/Spacing/Border'

import { convertISODate } from '@utils/date'

import { Comments } from '../Comments/Comments'
import { Reply } from '../Reply/Reply'

import s from './post-details.module.scss'

export const PostDetails = () => {
	const location = useLocation()
	const { getPostBySlug, isLoading } = usePosts()
	const [post, setPost] = useState({})
	const slug = location.pathname.replace('/blog/', '')
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/posts/${slug}`

	useEffect(() => {
		async function fetchData() {
			const res = await getPostBySlug(slug)

			if (res && res.success) setPost(res.post)
		}

		fetchData()
	}, [slug])

	const isReady = !isLoading && Boolean(post)

	const { title, user, createdAt, text, comments } = post ?? {}

	return (
		<>
			{!isReady ? (
				<PostSkeleton />
			) : (
				<div>
					<div className={s.header}>
						<h3 className={s.title}>{title}</h3>
						<div className={s.meta}>
							{user ? (
								<div className={s.author}>
									Posted by : <span>{`${user.firstName} ${user.lastName}`}</span>
								</div>
							) : (
								<div className={s.author}>Admin</div>
							)}
							<span>/</span>
							<span className={s.date}>
								On : <span>{convertISODate(createdAt, 'full')}</span>
							</span>
						</div>
					</div>
					<ImageWithFallback className={s.img} src={img} imgSize='blog-post' alt={title} />
					<p className={s.text}>{text}</p>
					<Border />
				</div>
			)}
			{/*<RelatedPosts category={category} />*/}
			{!isReady ? (
				<CommentsSkeleton quantity={3} />
			) : (
				comments && <Comments comments={comments.comments} isLoading={isLoading} />
			)}
			{isReady && !comments && <ItemsNotFound type='comments' />}
			<Reply action='create' />
		</>
	)
}
