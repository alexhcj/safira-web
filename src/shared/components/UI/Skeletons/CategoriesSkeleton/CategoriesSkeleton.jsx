import s from './categories-skeleton.module.scss'

export const CategoriesSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.grid}>
			{Array.from({ length: count }, (_, idx) => (
				<div key={idx} className={s.box}>
					<div className={s.meta}>
						<div className={s.img} />
						<div className={s.category} />
						<div className={s.button} />
					</div>
					<div className={s.separator} />
					<div className={s.list} />
				</div>
			))}
		</div>
	)
}
