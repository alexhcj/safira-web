import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { useProfile } from '../../../hooks/services/useProfile'
import { ProfileForm } from '../../../shared/components/Form/ProfileForm/ProfileForm'
import { Preloader } from '../../../shared/components/common/Preloader/Preloader'
import s from './profile-details.module.scss'

export const ProfileDetails = () => {
	const { user } = useAuthContext()
	const { profile, loading } = useProfile()

	return (
		<div className={s.profile}>
			{loading && <Preloader />}
			{!loading && typeof profile !== 'undefined' && Object.keys(profile).length !== 0 && (
				<ProfileForm user={user} profile={profile} loading={loading} />
			)}
		</div>
	)
}
