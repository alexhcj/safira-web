import { SiteMap } from '@components/SiteMap/SiteMap'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const SiteMapPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<SiteMap />
		</ScrollToTop>
	)
}
