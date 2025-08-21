import { ChangePasswordStepper } from '@components/ChangePasswordStepper/ChangePasswordStepper'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '@shared/layouts/DefaultLayout/DefaultLayout'

export const ChangePasswordPage = () => {
	// TODO: add redirection if email is not verified. BLOCKED: indeed user profile (email)
	// const navigate = useNavigate()
	// const { user } = useAuthContext()
	// if (!user.isEmailVerified) navigate('/verify-email', {state: {email: user.email}})

	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangePasswordStepper />
			</DefaultLayout>
		</>
	)
}
