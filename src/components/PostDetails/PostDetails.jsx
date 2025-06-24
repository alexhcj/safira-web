import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { usePosts } from '@hooks/services/usePosts'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
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

	return (
		<>
			{isLoading && <Preloader />}
			{!isLoading && Object.keys(post).length !== 0 && (
				<>
					<div className={s.post}>
						<div className={s.header}>
							<h3 className={s.title}>{post.title}</h3>
							<div className={s.meta}>
								{post.user ? (
									<div className={s.author}>
										Posted by : <span>{`${post.user.firstName} ${post.user.lastName}`}</span>
									</div>
								) : (
									<div className={s.author}>Admin</div>
								)}
								<span>/</span>
								<span className={s.date}>
									On : <span>{convertISODate(post.createdAt, 'full')}</span>
								</span>
							</div>
						</div>
						<ImageWithFallback className={s.img} src={img} imgSize='blog-post' alt={post.title} />
						<p className={s.text}>{post.text}</p>
					</div>
					<Border />
					{/*<RelatedPosts category={category} />*/}
					{post.comments && <Comments comments={post.comments.comments} isLoading={isLoading} />}
					{!isLoading && !post.comments && <ItemsNotFound type='comments' />}
					<Reply action={post.comments && post.comments.length !== 0 ? 'update' : 'create'} />
				</>
			)}
		</>
	)
}
