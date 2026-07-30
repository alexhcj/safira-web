import s from './product-card-skeleton.module.scss'

export const ProductCardSkeleton = () => {
	return (
		<div className={s.box}>
			<div className={s.img} />
			<div className={s.name} />
			<div className={s.category} />
			<div className={s.price} />
		</div>
	)
}
