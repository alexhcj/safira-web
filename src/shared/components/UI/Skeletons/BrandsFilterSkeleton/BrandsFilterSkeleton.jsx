import s from './brands-filter-skeleton.module.scss'

export const BrandsFilterSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.box}>
			{Array.from({ length: count }, (_, idx) => (
				<div className={s.item} key={idx}>
					<div className={s.checkbox} />
					<div className={s.brand} />
					<div className={s.quantity} />
				</div>
			))}
		</div>
	)
}
