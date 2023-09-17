import { NavLink, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { convertISODate } from '../../utils'
import { ButtonMore } from '../../shared/components/UI/Buttons/ButtonMore/ButtonMore'
import { ImageWithFallback } from '../../utils/ImageWithFallback'
import s from './post-card.module.scss'

export const PostCard = ({ post: { title, slug, createdAt, category }, imgSize, className }) => {
	const navigate = useNavigate()

	const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/posts/${slug}`
	const url = {
		pathname: `/posts/${slug}`,
		state: {
			slug,
		},
	}

	const onClickHandler = () => {
		navigate(url)
	}

	return (
		<div className={cn(s.post, className)}>
			<NavLink className={s.img_link} to={url}>
				<ImageWithFallback className={s.img} src={img} alt={title} imgSize={imgSize} />
			</NavLink>
			<div className={s.info}>
				<div className={s.meta}>
					<span>{convertISODate(createdAt)}</span> |{' '}
					<NavLink className={s.category} to='/shop'>
						{category}
					</NavLink>
				</div>
				<h3 className={s.title}>
					<NavLink to={url}>{title}</NavLink>
				</h3>
				<ButtonMore onClick={onClickHandler} />
			</div>
		</div>
	)
}
