import { Contact } from '@components/Contact/Contact'

import { GoogleMap } from '@shared/components/GoogleMap/GoogleMap'
import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const ContactUsPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<GoogleMap />
			<Space space={67} />
			<Contact />
			<Space size='l' />
		</ScrollToTop>
	)
}
