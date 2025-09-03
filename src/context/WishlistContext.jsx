import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const WishlistContext = createContext([])

// Vite HMR - use function declaration instead of arrow function
export function useWishlistContext() {
	const context = useContext(WishlistContext)

	if (context === undefined) {
		throw new Error('useWishlistContext must be used within an WishlistProvider')
	}

	return context
}

export const WishlistProvider = ({ children }) => {
	const [wishlist, setWishlist] = useLocalStorage('wishlist', [])

	const addToWishlist = ({ slug, name, price, specifications }) => {
		if (wishlist.find((product) => product.slug === slug)) return

		const product = { slug, name, price: price.price, maxQuantity: specifications.quantity }
		setWishlist([...wishlist, product])
	}

	const isProductInWishlist = (slug) => {
		return wishlist.find((product) => product.slug === slug)
	}

	const removeFromWishlist = (slug) => {
		const filteredWishlist = wishlist.filter((product) => product.slug !== slug)
		setWishlist([...filteredWishlist])
	}

	return (
		<WishlistContext.Provider value={{ wishlist, addToWishlist, isProductInWishlist, removeFromWishlist }}>
			{children}
		</WishlistContext.Provider>
	)
}
