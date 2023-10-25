import React from 'react'
import { ProductProvider } from '../context/ProductContext'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Shop } from '../modules/Shop/Shop'
import { Space } from '../shared/components/UI/Spacing/Space'
import { ProductQuickView } from '../components/ProductQuickView/ProductQuickView'

export const ShopPage = () => {
	return (
		<ProductProvider>
			<Breadcrumbs type='shop' />
			<Shop />
			<Space size='l' />
			<ProductQuickView />
		</ProductProvider>
	)
}
