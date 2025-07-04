import { TermsConditions } from '@components/TermsConditions/TermsConditions'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const TermsConditionsPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<TermsConditions />
			<Space size='l' />
		</ScrollToTop>
	)
}
