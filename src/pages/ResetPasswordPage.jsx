import { ResetPasswordStepperProvider } from '@context/ResetPasswordStepperContext'

import { ResetPasswordStepper } from '@components/ResetPasswordStepper/ResetPasswordStepper'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ResetPasswordPage = () => {
	return (
		<ResetPasswordStepperProvider>
			<Breadcrumbs />
			<DefaultLayout>
				<ResetPasswordStepper />
			</DefaultLayout>
		</ResetPasswordStepperProvider>
	)
}
