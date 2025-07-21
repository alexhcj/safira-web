import { RegisterForm } from '@shared/components/Form/AuthForms/RegisterForm'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const RegisterPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<RegisterForm />
			</DefaultLayout>
		</>
	)
}
