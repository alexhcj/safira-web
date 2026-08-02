import s from './profile-skeleton.module.scss'

export const ProfileSkeleton = () => {
	return (
		<div className={s.grid}>
			<div className={s.content}>
				<div className={s.fieldset}>
					<div className={s.title} />
					<div className={s.credentials_field}>
						<div>
							<div className={s.label} />
							<div className={s.credentials_input} />
						</div>
						<div className={s.button} />
					</div>
					<div className={s.credentials_field}>
						<div>
							<div className={s.label} />
							<div className={s.credentials_input} />
						</div>
						<div className={s.button} />
					</div>
				</div>
				<div className={s.fieldset}>
					<div className={s.title} />
					<div>
						<div className={s.label} />
						<div className={s.profile_input} />
					</div>
					<div>
						<div className={s.label} />
						<div className={s.profile_input} />
					</div>
					<div>
						<div className={s.label} />
						<div className={s.profile_input} />
					</div>
					<div>
						<div className={s.label} />
						<div className={s.profile_input} />
					</div>
					<div className={s.profile_button} />
				</div>
			</div>
			<div className={s.avatar}>
				<div className={s.avatar_title} />
				<div className={s.avatar_img} />
			</div>
		</div>
	)
}
