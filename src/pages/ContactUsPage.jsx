import { Contact } from '@components/Contact/Contact'

import { GoogleMap } from '@shared/components/GoogleMap/GoogleMap'
import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const ContactUsPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<GoogleMap />
			<Contact />
		</ScrollToTop>
	)
}
