import { useEffect, useState } from 'react';
import { postsAPI } from '../../../api/posts'
import { PostCard } from '../../PostCard/PostCard'
import { SectionSlider } from '../../../shared/components/Slider/SectionSlider/SectionSlider'
import { Space } from '../../../shared/components/UI/Spacing/Space'
import s from './our-blog-posts.module.scss'

export const OurBlogPosts = () => {
	const [ourPosts, setOurPosts] = useState([])

	useEffect(() => {
		const fetchData = async () => {
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
			}
		}

		fetchData()
	}, [])

	const responsive = {
		0: {
			items: 3,
		},
	}

	const items = ourPosts.map((post) => {
		return <PostCard key={post.slug} post={post} imgSize='md-lg' className={s.post} />
	})

	return (
		<section className={s.section}>
			<Space space={63} />
			<div className='container'>
				<SectionSlider
					title='Our Blog Posts'
					subtitle='Our recent articles abour Organic'
					items={items}
					responsive={responsive}
					className={s.slider_bg}
				/>
			</div>
			<Space size='l' />
		</section>
	)
}
