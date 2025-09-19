import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { RegisterForm } from '@shared/components/Form/AuthForms/RegisterForm'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const RegisterPage = () => {
	const { user } = useAuthContext()

	if (user) return <Navigate to='/' replace />

	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<RegisterForm />
			</DefaultLayout>
		</>
	)
}
