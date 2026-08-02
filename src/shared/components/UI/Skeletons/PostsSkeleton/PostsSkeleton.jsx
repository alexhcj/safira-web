import s from './posts-skeleton.module.scss'

export const PostsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.box}>
			{Array.from({ length: count }, (_, idx) => (
				<div key={idx}>
					<div className={s.img} />
					<div className={s.title} />
					<div className={s.meta} />
					<div className={s.excerpt} />
					<div className={s.button} />
				</div>
			))}
		</div>
	)
}
