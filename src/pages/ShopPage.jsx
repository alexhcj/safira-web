import { ProductProvider } from '@context/ProductContext'

import { Shop } from '@modules/Shop/Shop'

import { ProductQuickView } from '@components/ProductQuickView/ProductQuickView'

import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'

export const ShopPage = () => {
	return (
		<ProductProvider>
			<ScrollToTop>
				<Breadcrumbs type='shop' />
				<Shop />
				<ProductQuickView />
			</ScrollToTop>
		</ProductProvider>
	)
}
