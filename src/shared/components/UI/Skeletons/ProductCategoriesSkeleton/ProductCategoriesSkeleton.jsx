import s from './product-categories-skeleton.module.scss'

export const ProductCategoriesSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.list}>
			{Array.from({ length: count }, (_, idx) => (
				<div key={idx} className={s.link} />
			))}
		</div>
	)
}
