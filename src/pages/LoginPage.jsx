import { DefaultLayout } from '../shared/layout/DefaultLayout/DefaultLayout'
import { AuthForm } from '../shared/components/Form/AuthForm/AuthForm'
import { Border } from '../shared/components/UI/Spacing/Border'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'

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
