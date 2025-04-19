import cn from 'classnames'
import { NavLink, useNavigate } from 'react-router-dom'

import { ButtonMore } from '@shared/components/UI/Buttons/ButtonMore/ButtonMore'

import { ImageWithFallback } from '@utils/ImageWithFallback'
import { convertISODate } from '@utils/index'

import s from './post-card.module.scss'

// sizes: 'row-xs'
export const PostCard = ({ post: { title, slug, createdAt, category }, size, imgSize, className }) => {
	const navigate = useNavigate()

	const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/posts/${slug}`
	const url = `/blog/${slug}`

	const handleClick = () => {
		navigate(url)
	}

	return (
		<div className={cn(s.post, size && s[`post_${size}`], className)}>
			<NavLink className={s.img_link} to={url}>
				<ImageWithFallback className={s.img} src={img} alt={title} imgSize={imgSize} />
			</NavLink>
			<div className={s.info}>
				{size !== 'row-xs' && (
					<div className={s.meta}>
						<span>{convertISODate(createdAt)}</span> |{' '}
						<NavLink className={s.category} to='/shop'>
							{category}
						</NavLink>
					</div>
				)}
				<h3 className={s.title}>
					<NavLink to={url}>{title}</NavLink>
				</h3>
				{size !== 'row-xs' && <ButtonMore onClick={handleClick} />}
			</div>
		</div>
	)
}
