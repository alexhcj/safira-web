import s from './post-card-skeleton.module.scss'

export const PostCardSkeleton = () => {
	return (
		<div className={s.box}>
			<div className={s.img} />
			<div className={s.content}>
				<div className={s.date} />
				<div className={s.title} />
				<div className={s.button} />
			</div>
		</div>
	)
}
