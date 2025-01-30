import React from 'react'
import { ScrollToTop } from '../shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { DefaultLayout } from '../shared/layouts/DefaultLayout/DefaultLayout'
import { VerifyEmail } from '../components/VerifyEmail/VerifyEmail'

export const VerifyEmailPage = () => {
	return (
		<>
			<ScrollToTop>
				<Breadcrumbs />
				<DefaultLayout>
					<VerifyEmail />
				</DefaultLayout>
			</ScrollToTop>
		</>
	)
}
