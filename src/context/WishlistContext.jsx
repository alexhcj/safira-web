import { createContext, useContext, useState } from 'react'

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
	const [isLoading, setIsLoading] = useState(false)

	const addToWishlist = ({ slug, name, price, specifications }) => {
		setIsLoading(true)
		if (wishlist.find((product) => product.slug === slug)) return

		const product = {
			slug,
			name,
			price,
			maxQuantity: specifications.quantity,
		}
		setWishlist([...wishlist, product])
		setIsLoading(false)
	}


	const isProductInWishlist = (slug) => {
		return wishlist.find((product) => product.slug === slug)
	}

	const removeFromWishlist = (slug) => {
		setIsLoading(true)
		const filteredWishlist = wishlist.filter((product) => product.slug !== slug)
		setWishlist([...filteredWishlist])
		setIsLoading(false)
	}

	return (
		<WishlistContext.Provider value={{ wishlist, addToWishlist, isProductInWishlist, removeFromWishlist, isLoading }}>
			{children}
		</WishlistContext.Provider>
	)
}
