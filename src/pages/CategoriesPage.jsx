import { Categories } from '@modules/Categories/Categories'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const CategoriesPage = () => {
	return (
		<ScrollToTop>
			<Breadcrumbs />
			<Categories />
		</ScrollToTop>
	)
}
