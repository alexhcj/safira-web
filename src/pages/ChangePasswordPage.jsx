import { ChangePasswordStepper } from '@components/ChangePasswordStepper/ChangePasswordStepper'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ChangePasswordPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangePasswordStepper />
			</DefaultLayout>
		</>
	)
}
