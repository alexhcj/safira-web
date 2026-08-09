import cn from 'classnames'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import s from './category-card-min.module.scss'

export const CategoryCardMini = ({ category, isActive, order, onClick }) => {
	const { name, primeCategory } = category
	const img = `${import.meta.env.VITE_WEB_PUBLIC_URL}/assets/images/categories/${primeCategory}/92x92.jpg`

	return (
		<div
			className={cn(s.card_mini, isActive && s.active)}
			style={{ order }}
			onClick={onClick}
			role='button'
			tabIndex={0}
			onKeyDown={(e) => e.key === 'Enter' && onClick()}
		>
			<ImageWithFallback className={s.img_mini} onlySrc src={img} alt={`${name} category`} />
			<h3 className={s.category_mini}>{name}</h3>
		</div>
	)
}
