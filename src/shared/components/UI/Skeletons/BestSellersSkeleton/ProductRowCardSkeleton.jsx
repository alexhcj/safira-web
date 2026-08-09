import s from './product-row-card-skeleton.module.scss'

export const ProductRowCardSkeleton = () => {
	return (
		<div className={s.box}>
			<div className={s.img} />
			<div className={s.name} />
			<div className={s.category} />
			<div className={s.price} />
		</div>
	)
}
