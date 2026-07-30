import s from './specifications-skeleton.module.scss'

export const SpecificationsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.box}>
			{Array.from({ length: count }, (_, idx) => (
				<div className={s.row} key={idx}>
					<div className={s.attr} />
					<div className={s.separator} />
					<div className={s.value} />
				</div>
			))}
		</div>
	)
}
