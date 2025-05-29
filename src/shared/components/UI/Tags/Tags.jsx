import s from './tags.module.scss'

export const Tags = ({ discount_price, createdAt }) => {
	const isProductNew = new Date() < new Date(new Date(createdAt).setDate(new Date().getDate() + 2 * 7))

	return (
		<div className={s.tags}>
			{isProductNew && <span className={s.tag}>new</span>}
			{discount_price && <span className={s.tag}>sale</span>}
		</div>
	)
}
