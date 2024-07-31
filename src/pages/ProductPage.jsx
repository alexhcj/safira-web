import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { ProductDetails } from '../components/ProductDetails/ProductDetails'

export const ProductPage = () => {
	return (
		<div>
			<Breadcrumbs />
			<ProductDetails />
		</div>
	)
}
