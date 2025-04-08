import { ProductQuickView } from '@components/ProductQuickView/ProductQuickView'
import { ProductProvider } from '@context/ProductContext'
import { Shop } from '@modules/Shop/Shop'
import { ScrollToTop } from '@shared/components/ScrollToTop/ScrollToTop'
import { Breadcrumbs } from '@shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Space } from '@shared/components/UI/Spacing/Space'

export const ShopPage = () => {
	return (
		<ProductProvider>
			<ScrollToTop>
				<Breadcrumbs type='shop' />
				<Shop />
				<Space size='l' />
				<ProductQuickView />
			</ScrollToTop>
		</ProductProvider>
	)
}
