import s from './pagination-skeleton.module.scss'

export const PaginationSkeleton = () => {
	return (
		<div className={s.box}>
			<div className={s.button} />
			<div className={s.button} />
			<div className={s.button} />
			<div className={s.button} />
			<div className={s.button} />
			<div className={s.button} />
			<div className={s.button} />
		</div>
	)
}
