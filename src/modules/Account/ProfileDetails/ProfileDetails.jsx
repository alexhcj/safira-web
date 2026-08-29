import { useNavigate } from 'react-router-dom'

import { useAuthStateContext } from '@context/AuthContext'
import { useUserProfileContext } from '@context/UserProfileContext'

import { ProfileForm } from '@shared/components/Form/ProfileForm/ProfileForm'
import { ProfileSkeleton } from '@shared/components/UI/Skeletons/ProfileSkeleton/ProfileSkeleton'
import { UserActions } from '@shared/components/UserActions/UserActions'

import EmailSVG from '@assets/svg/email.svg?react'

import s from './profile-details.module.scss'

export const ProfileDetails = () => {
	const navigate = useNavigate()
	const { user, isAuthenticated } = useAuthStateContext()
	const { profile, isLoading } = useUserProfileContext()

	const handleVerifyEmail = () => {
		navigate('/verify-email')
	}

	return (
		<div className={s.profile}>
			{!profile.isEmailVerified && (
				<UserActions
					message='Verify email address to get full access of store features.'
					actionMessage='Click here to verify email'
					icon={<EmailSVG className={s.svg} />}
					className={s.verify_email}
					onClick={handleVerifyEmail}
				/>
			)}
			{isLoading ? (
				<ProfileSkeleton />
			) : (
				<ProfileForm user={user} isAuthenticated={isAuthenticated} profile={profile} loading={isLoading} />
			)}
		</div>
	)
}
