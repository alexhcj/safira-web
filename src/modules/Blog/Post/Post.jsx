import { Link } from 'react-router-dom'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Space } from '@shared/components/UI/Spacing/Space'
import { Text } from '@shared/components/UI/Text/Text'

import { convertISODate } from '@utils/date'

import s from './post.module.scss'

export const Post = ({ slug, id, title, createdAt, category, text }) => {
	const url = `/blog/${slug}`
	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/posts/${slug}`

	return (
		<>
			<div key={id}>
				{img ? (
					<Link className={s.link} to={url}>
						<ImageWithFallback src={img} imgSize='blog-post' alt={name} />
					</Link>
				) : (
					<Preloader />
				)}
				<Space space={24} />
				<Link className={s.link} to={url}>
					<h2 className={s.title}>{title}</h2>
				</Link>
				<Space space={4} />
				<span className={s.meta}>
					{convertISODate(createdAt)}
					<span className={s.divider}>|</span>
					<Link className={s.category} to='/'>
						{category}
					</Link>
				</span>
				<Space space={16} />
				<p className={s.text}>{text}</p>
				<Space space={20} />
				<Link to={url}>
					<Button className={s.post_button} type='post'>
						<Text className={s.post_button_text} color='white'>
							Read more
						</Text>
					</Button>
				</Link>
			</div>
			<Space space={32} />
		</>
	)
}
