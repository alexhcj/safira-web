import s from './post-skeleton.module.scss'

export const PostSkeleton = () => {
	return (
		<div className={s.box}>
			<div className={s.title} />
			<div className={s.meta} />
			<div className={s.img} />
			<div className={s.description} />
			<div className={s.separator} />
		</div>
	)
}
