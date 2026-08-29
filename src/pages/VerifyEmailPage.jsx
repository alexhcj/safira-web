import { Navigate } from 'react-router-dom'

import { useUserProfileContext } from '@context/UserProfileContext'

import { VerifyEmail } from '@components/VerifyEmail/VerifyEmail'

import { FullscreenPreloader } from '@shared/components/common/Preloader/Preloader'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const VerifyEmailPage = () => {
	const { profile, isLoading } = useUserProfileContext()

	if (isLoading || profile === null) return <FullscreenPreloader />

	if (profile.isEmailVerified) return <Navigate to='/' replace />

	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<VerifyEmail />
			</DefaultLayout>
		</>
	)
}
