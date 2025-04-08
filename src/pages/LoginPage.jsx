import { AuthForm } from '@shared/components/Form/AuthForm/AuthForm'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Border } from '@shared/components/UI/Spacing/Border'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const LoginPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<AuthForm type='login' />
				<Border />
			</DefaultLayout>
		</>
	)
}
