import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '../shared/layouts/DefaultLayout/DefaultLayout'
import { ChangePasswordStepper } from '../components/ChangePasswordStepper/ChangePasswordStepper'

export const ChangePasswordPage = () => {
	return (
		<>
			<Breadcrumbs />
			<DefaultLayout>
				<ChangePasswordStepper />
			</DefaultLayout>
		</>
	)
}
