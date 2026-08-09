import s from './recent-comments-skeleton.module.scss'

export const RecentCommentsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return Array.from({ length: count }, (_, idx) => (
		<div className={s.box} key={idx}>
			<div className={s.item}>
				<div className={s.img} />
				<div className={s.author} />
				<div className={s.text} />
			</div>
		</div>
	))
}
