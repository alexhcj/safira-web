import { ProductProvider } from '@context/ProductContext'

import { ProductDetails } from '@components/ProductDetails/ProductDetails'
import { ProductQuickView } from '@components/ProductQuickView/ProductQuickView'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const ProductPage = () => {
	return (
		<ProductProvider>
			<ScrollToTop>
				<Breadcrumbs />
				<ProductDetails />
				<ProductQuickView />
			</ScrollToTop>
		</ProductProvider>
	)
}
