import cn from 'classnames'

import s from './shop-grid-skeleton.module.scss'

export const ShopGridSkeleton = ({ quantity, grid }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={cn(s.grid, s[`${grid}`])}>
			{Array.from({ length: count }).map((_, idx) => (
				<div className={cn(s.box, s[`${grid}`])} key={idx}>
					<div className={s.img} />
					<div className={s.content}>
						<div className={s.name} />
						<div className={s.category} />
						<div className={s.price} />
						{grid === 'grid-list' && <div className={s.description} />}
					</div>
				</div>
			))}
		</div>
	)
}
