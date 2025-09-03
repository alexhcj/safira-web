import { EmailStepperProvider } from '@context/EmailStepperContext'

import { ChangeEmailStepper } from '@components/ChangeEmailStepper/ChangeEmailStepper'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ChangeEmailPage = () => {
	// TODO: add redirection if email is not verified. BLOCKED: indeed user profile (email)
	// const navigate = useNavigate()
	// const { user } = useAuthContext()
	// if (!user.isEmailVerified) navigate('/verify-email', {state: {email: user.email}})

	return (
		<EmailStepperProvider>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangeEmailStepper />
			</DefaultLayout>
		</EmailStepperProvider>
	)
}
