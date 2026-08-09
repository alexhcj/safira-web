import { useRef } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { VerifyEmail } from '@components/VerifyEmail/VerifyEmail'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const VerifyEmailPage = () => {
	const { user } = useAuthContext()

	const wasAlreadyVerifiedRef = useRef(user.isEmailVerified)

	if (wasAlreadyVerifiedRef.current) return <Navigate to='/' replace />

	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<VerifyEmail />
			</DefaultLayout>
		</>
	)
}
