import React from 'react'
import { Breadcrumbs } from '../shared/components/UI/Breadcrumbs/Breadcrumbs'
import { Wishlist } from '../modules/Wishlist/Wishlist'

export const WishlistPage = () => {
	return (
		<div>
			<Breadcrumbs />
			<Wishlist />
		</div>
	)
}
