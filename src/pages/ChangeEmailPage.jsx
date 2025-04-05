import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '../shared/layouts/DefaultLayout/DefaultLayout'
import { ChangeEmailStepper } from '../components/ChangeEmailStepper/ChangeEmailStepper'

export const ChangeEmailPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangeEmailStepper />
			</DefaultLayout>
		</>
	)
}
