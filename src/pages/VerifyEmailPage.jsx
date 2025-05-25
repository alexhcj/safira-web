import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { VerifyEmail } from '@components/VerifyEmail/VerifyEmail'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const VerifyEmailPage = () => {
	const { user } = useAuthContext()

	if (user.isEmailVerified) return <Navigate to='/profile' replace />

	return (
		<>
			{!user.isEmailVerified && (
				<>
					<Breadcrumbs />
					<DefaultLayout>
						<VerifyEmail />
					</DefaultLayout>
				</>
			)}
		</>
	)
}
