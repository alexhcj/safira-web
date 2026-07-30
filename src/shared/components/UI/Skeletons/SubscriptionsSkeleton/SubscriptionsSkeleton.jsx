import s from './subscriptions-skeleton.module.scss'

export const SubscriptionsSkeleton = ({ quantity = 1 }) => {
	const count = Math.max(0, Number(quantity) || 0)

	return (
		<>
			<div className={s.header} />
			{Array.from({ length: count }).map((_, idx) => (
				<div className={s.row} key={idx} />
			))}
		</>
	)
}
