import s from './products-by-category-skeleton.module.scss'

export const ProductsByCategorySkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.grid}>
			{Array.from({ length: count }, (_, idx) => (
				<div key={idx} className={s.box}>
					<div className={s.category} />
					<div className={s.list}>
						{Array.from({ length: 6 }, (_, index) => (
							<div className={s.link} key={index} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
