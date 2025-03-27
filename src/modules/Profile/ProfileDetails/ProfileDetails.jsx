import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext'
import { useProfile } from '../../../hooks/services/useProfile'
import { ProfileForm } from '../../../shared/components/Form/ProfileForm/ProfileForm'
import { Preloader } from '../../../shared/components/common/Preloader/Preloader'
import { UserActions } from '../../../shared/components/UserActions/UserActions'
import { ReactComponent as EmailSVG } from '../../../assets/svg/email.svg'
import s from './profile-details.module.scss'

export const ProfileDetails = () => {
	const navigate = useNavigate()
	const { user } = useAuthContext()
	const { profile, loading } = useProfile()

	const handleVerifyEmail = () => {
		navigate('/verify-email', {
			state: { email: profile.email, isEmailVerified: profile.isEmailVerified },
		})
	}

	return (
		<div className={s.profile}>
			{!user.isEmailVerified && (
				<UserActions
					message='Verify email address to get full access of store features.'
					actionMessage='Click here to verify email'
					icon={<EmailSVG className={s.svg} />}
					className={s.verify_email}
					onClick={handleVerifyEmail}
				/>
			)}
			{loading && <Preloader />}
			{!loading && typeof profile !== 'undefined' && Object.keys(profile).length !== 0 && (
				<ProfileForm user={user} profile={profile} loading={loading} />
			)}
		</div>
	)
}
