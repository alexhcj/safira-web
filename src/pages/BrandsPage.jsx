import { Brands } from '@modules/Brands/Brands'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const BrandsPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<Brands />
		</ScrollToTop>
	)
}
