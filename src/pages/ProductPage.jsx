import React from 'react'
import { ProductProvider } from '../context/ProductContext'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { ProductDetails } from '../components/ProductDetails/ProductDetails'
import { ProductQuickView } from '../components/ProductQuickView/ProductQuickView'

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
