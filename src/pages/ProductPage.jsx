import { ProductProvider } from '@context/ProductContext'

import { ProductDetails } from '@components/ProductDetails/ProductDetails'
import { ProductQuickView } from '@components/ProductQuickView/ProductQuickView'

import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const ProductPage = () => {
	return (
		<ProductProvider>
			<div>
				<Breadcrumbs />
				<ProductDetails />
				<ProductQuickView />
			</div>
		</ProductProvider>
	)
}
