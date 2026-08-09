import s from './brands-skeleton.module.scss'

export const BrandsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return Array.from({ length: count }, (_, idx) => <div key={idx} className={s.box} />)
}
