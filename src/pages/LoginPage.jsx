import { LoginForm } from '@shared/components/Form/AuthForms/LoginForm'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Border } from '@shared/components/UI/Spacing/Border'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const LoginPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<LoginForm />
				<Border />
			</DefaultLayout>
		</>
	)
}
