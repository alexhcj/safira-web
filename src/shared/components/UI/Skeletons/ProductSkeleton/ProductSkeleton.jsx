import s from './product-skeleton.module.scss'

export const ProductSkeleton = () => {
	return (
		<div className={s.box}>
			<div className={s.name} />
			<div className={s.stars} />
			<div className={s.price_box}>
				<div className={s.price_current} />
				<div className={s.price_old} />
			</div>
			<div className={s.meta}>
				<div className={s.category} />
				<div className={s.quantity} />
				<div className={s.tags} />
			</div>
			<div className={s.description} />
			<div className={s.separator} />
			<div className={s.quantity_action}>
				<div className={s.current_quantity} />
				<div className={s.btn_add_to_cart} />
			</div>
			<div className={s.add_to_wishlist} />
			<div className={s.add_to_compare} />
		</div>
	)
}
