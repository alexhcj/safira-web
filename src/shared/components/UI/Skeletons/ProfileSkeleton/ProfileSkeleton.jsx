import s from './profile-skeleton.module.scss'

export const ProfileSkeleton = () => {
	return (
		<div className={s.grid}>
			<div className={s.content}>
				<div className={s.fieldset}>
					<div className={s.title} />
					<div className={s.field} />
					<div className={s.field} />
				</div>
				<div className={s.fieldset}>
					<div className={s.title} />
					<div className={s.field} />
					<div className={s.field} />
					<div className={s.field} />
					<div className={s.field} />
				</div>
				<div className={s.button} />
			</div>
			<div className={s.avatar} />
		</div>
	)
}
