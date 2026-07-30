import s from './shop-grid-skeleton.module.scss'

export const ShopGridSkeleton = ({ quantity }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.grid}>
			{Array.from({ length: count }).map((_, idx) => (
				<div className={s.box} key={idx}>
					<div className={s.img} />
					<div className={s.name} />
					<div className={s.category} />
					<div className={s.price} />
				</div>
			))}
		</div>
	)
}
