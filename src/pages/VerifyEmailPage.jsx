import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { ScrollToTop } from '../shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '../shared/layouts/DefaultLayout/DefaultLayout'
import { VerifyEmail } from '../components/VerifyEmail/VerifyEmail'

export const VerifyEmailPage = () => {
	const { user } = useAuthContext()

	if (user.isEmailVerified) return <Navigate to='/profile' replace />

	return (
		<>
			{!user.isEmailVerified && (
				<ScrollToTop>
					<Breadcrumbs />
					<DefaultLayout>
						<VerifyEmail />
					</DefaultLayout>
				</ScrollToTop>
			)}
		</>
	)
}
