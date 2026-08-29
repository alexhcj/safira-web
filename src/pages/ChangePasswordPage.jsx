import { useNavigate } from 'react-router-dom'

import { useUserProfileContext } from '@context/UserProfileContext'

import { ChangePasswordStepper } from '@components/ChangePasswordStepper/ChangePasswordStepper'

import { FullscreenPreloader } from '@shared/components/common/Preloader/Preloader'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ChangePasswordPage = () => {
	const navigate = useNavigate()
	const { profile, isLoading } = useUserProfileContext()

	if (isLoading || profile === null) return <FullscreenPreloader />

	if (!profile.isEmailVerified) navigate('/verify-email')

	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangePasswordStepper />
			</DefaultLayout>
		</>
	)
}
