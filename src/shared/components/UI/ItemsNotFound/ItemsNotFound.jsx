import { ProductsNotFound } from './Cases/ProductsNotFound/ProductsNotFound'
import { PostsNotFound } from './Cases/PostsNotFound/ProductsNotFound'
import { EmptyWishlist } from './Cases/EmptyWishlist/EmptyWishlist'
import { EmptyCart } from './Cases/EmptyCart/EmptyCart'
import { CommentsNotFound } from './Cases/CommentsNotFound/CommentsNotFound'
import { EmptyCompares } from './Cases/EmptyCompares/EmptyCompares'

// 'product' | 'post' | 'cart' | 'wishlist' | 'compare'
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
			case 'comments':
				return <CommentsNotFound />
			case 'compare':
				return <EmptyCompares />
		}
	}

	return notFoundCase(type)
}
