import s from './deal-of-week-skeleton.module.scss'

export const DealOfWeekSkeleton = () => {
	return (
		<div className={s.box}>
			<div className={s.img} />
			<div className={s.name} />
			<div className={s.category} />
			<div className={s.price} />
			<div className={s.timer}>
				<div className={s.timer_item} />
				<div className={s.timer_item} />
				<div className={s.timer_item} />
				<div className={s.timer_item} />
			</div>
			<div className={s.button} />
		</div>
	)
}
