import s from './recent-posts-skeleton.module.scss'

export const RecentPostsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return Array.from({ length: count }, (_, idx) => (
		<div key={idx} className={s.box}>
			<div className={s.item}>
				<div className={s.img} />
				<div className={s.author} />
				<div className={s.text} />
			</div>
		</div>
	))
}
