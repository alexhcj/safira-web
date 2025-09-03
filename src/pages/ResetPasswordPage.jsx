import { ResetPasswordStepper } from '@components/ResetPasswordStepper/ResetPasswordStepper'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ResetPasswordPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<ResetPasswordStepper />
			</DefaultLayout>
		</>
	)
}
