import { EmailStepperProvider } from '@context/EmailStepperContext'

import { ChangeEmailStepper } from '@components/ChangeEmailStepper/ChangeEmailStepper'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ChangeEmailPage = () => {
	return (
		<EmailStepperProvider>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangeEmailStepper />
			</DefaultLayout>
		</EmailStepperProvider>
	)
}
