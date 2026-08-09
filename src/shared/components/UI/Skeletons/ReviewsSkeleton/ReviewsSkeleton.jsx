import s from './reviews-skeleton.module.scss'

export const ReviewsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.grid}>
			{Array.from({ length: count }, (_, idx) => (
				<div className={s.box} key={idx}>
					<div className={s.img} />
					<div className={s.review} />
				</div>
			))}
		</div>
	)
}
