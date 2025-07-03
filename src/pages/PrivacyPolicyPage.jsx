import { PrivacyPolicy } from '@components/PrivacyPolicy/PrivacyPolicy'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const PrivacyPolicyPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<PrivacyPolicy />
			<Space size='l' />
		</ScrollToTop>
	)
}
