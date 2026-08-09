import { TermsConditions } from '@components/TermsConditions/TermsConditions'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const TermsConditionsPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<TermsConditions />
		</ScrollToTop>
	)
}
