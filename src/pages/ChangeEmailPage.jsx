import { useNavigate } from 'react-router-dom'

import { EmailStepperProvider } from '@context/EmailStepperContext'
import { useUserProfileContext } from '@context/UserProfileContext'

import { ChangeEmailStepper } from '@components/ChangeEmailStepper/ChangeEmailStepper'

import { FullscreenPreloader } from '@shared/components/common/Preloader/Preloader'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ChangeEmailPage = () => {
	const navigate = useNavigate()
	const { profile, isLoading } = useUserProfileContext()

	if (isLoading || profile === null) return <FullscreenPreloader />

	if (!profile.isEmailVerified) navigate('/verify-email')

	return (
		<EmailStepperProvider>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangeEmailStepper />
			</DefaultLayout>
		</EmailStepperProvider>
	)
}
