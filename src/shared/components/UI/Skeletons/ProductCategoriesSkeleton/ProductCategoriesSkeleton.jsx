import cn from 'classnames'

import s from './product-categories-skeleton.module.scss'

export const ProductCategoriesSkeleton = ({ quantity = 1, type }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={cn(s.list, type === 'top-20' && s.top_20)}>
			{Array.from({ length: count }, (_, idx) => (
				<div key={idx} className={s.link} />
			))}
		</div>
	)
}
