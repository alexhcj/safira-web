import s from './tags-filter-skeleton.module.scss'

export const TagsFilterSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.box}>
			{Array.from({ length: count }, (_, idx) => (
				<div className={s.tag} key={idx} />
			))}
		</div>
	)
}
