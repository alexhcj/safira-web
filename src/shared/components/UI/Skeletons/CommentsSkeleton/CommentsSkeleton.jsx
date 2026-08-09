import s from './comments-skeleton.module.scss'

export const CommentsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<div className={s.grid}>
			{Array.from({ length: count }, (_, idx) => (
				<div key={idx} className={s.box}>
					<div className={s.author} />
					<div className={s.content} />
				</div>
			))}
		</div>
	)
}
