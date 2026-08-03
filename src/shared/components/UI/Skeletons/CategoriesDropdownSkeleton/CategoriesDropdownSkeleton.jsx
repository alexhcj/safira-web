import s from './categories-dropdown-skeleton.module.scss'

export const CategoriesDropdownSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return Array.from({ length: count }, (_, idx) => <div className={s.category} key={idx} />)
}
