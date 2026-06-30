import { RoadMap } from '@components/RoadMap/RoadMap'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const RoadMapPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<RoadMap />
		</ScrollToTop>
	)
}
