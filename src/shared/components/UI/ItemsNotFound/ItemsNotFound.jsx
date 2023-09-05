import React from 'react'
import { ProductsNotFound } from './Cases/ProductsNotFound/ProductsNotFound'
import { PostsNotFound } from './Cases/PostsNotFound/ProductsNotFound'
import { EmptyWishlist } from './Cases/EmptyWishlist/EmptyWishlist'
import { EmptyCart } from './Cases/EmptyCart/EmptyCart'

// 'product' | 'post' | 'cart' | 'wishlist'
export const ItemsNotFound = ({ type }) => {
	const notFoundCase = (type) => {
		switch (type) {
			case 'product':
				return <ProductsNotFound />
			case 'post':
				return <PostsNotFound />
			case 'wishlist':
				return <EmptyWishlist />
			case 'cart':
				return <EmptyCart />
		}
	}

	return notFoundCase(type)
}
