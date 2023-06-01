import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { ProductDetails } from '../components/ProductDetails/ProductDetails'

export const Product = () => {

	return (
		<div>
			<Breadcrumbs />
			<ProductDetails />
		</div>
	)
}
