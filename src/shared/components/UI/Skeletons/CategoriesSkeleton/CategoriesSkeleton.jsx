import { CATEGORIES_NAV_ITEMS } from '@shared/data/skeletons'

import s from './categories-skeleton.module.scss'

export const CategoriesSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.grid}>
			{Array.from({ length: count }, (_, idx) => (
				<div key={idx} className={s.box}>
					<div className={s.meta}>
						<div className={s.img} />
						<div className={s.category} />
						<div className={s.button} />
					</div>
					<div className={s.separator} />
					<div className={s.list}>
						{Array.from({ length: CATEGORIES_NAV_ITEMS[idx + 1] }).map((_, index) => (
							<div key={index} className={s.link} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
