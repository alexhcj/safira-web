import { useEffect, useState } from 'react'

import { postsAPI } from '@api/posts'

import { SectionSlider } from '@shared/components/Slider/SectionSlider/SectionSlider'
import { PostCardSkeleton } from '@shared/components/UI/Skeletons/PostCardSkeleton/PostCardSkeleton'

import { PostCard } from '../../PostCard/PostCard'

import s from './our-blog-posts.module.scss'

export const OurBlogPosts = () => {
	const [ourPosts, setOurPosts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			const params = {
				sort: 'createdAt',
				limit: '6',
				offset: '0',
			}

			try {
				const { posts } = await postsAPI.getAll(params)
				setOurPosts(posts)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const skeletonMock = Array.from({ length: 3 }).map((_, idx) => (
		<div className={s.box} key={idx}>
			<PostCardSkeleton />
		</div>
	))

	const items = isLoading
		? skeletonMock
		: ourPosts.map((post, idx) => {
			return (
				<div className={s.box} key={idx}>
					<PostCard post={post} imgSize='md-lg' />
				</div>
			)
		})

	const responsive = {
		0: {
			items: 1,
		},
		768: {
			items: 2,
		},
		991: {
			items: 3,
		},
	}

	return (
		<section className={s.section}>
			<div className='container'>
				<SectionSlider
					title='Our Blog Posts'
					subtitle='Our recent articles abour Organic'
					type='our-blog-posts'
					items={items}
					responsive={responsive}
				/>
			</div>
		</section>
	)
}
