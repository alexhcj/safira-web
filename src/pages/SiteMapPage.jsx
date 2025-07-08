import { SiteMap } from '@components/SiteMap/SiteMap'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const SiteMapPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<SiteMap />
			<Space size='l' />
		</ScrollToTop>
	)
}
