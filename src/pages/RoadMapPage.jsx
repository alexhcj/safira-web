import { RoadMap } from '@components/RoadMap/RoadMap'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const RoadMapPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<RoadMap />
			<Space size='l' />
		</ScrollToTop>
	)
}
