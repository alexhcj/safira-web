import { createContext, useContext } from 'react'

import { calculateTotalPrice } from '@/utils'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const CartContext = createContext([])

// Vite HMR - use function declaration instead of arrow function
export function useCartContext() {
	const context = useContext(CartContext)

	if (context === undefined) {
		throw new Error('useCartContext must be used within an CartProvider')
	}

	return context
}

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useLocalStorage('cart', [])

	const addToCart = ({ name, slug, price, discountPrice, specifications }, quantity) => {
		const productInCart = cart.find((product) => product.slug === slug)

		const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`
		const product = {
			slug,
			name,
			img,
			price: price.price,
			discountPrice: price.discountPrice,
			maxQuantity: specifications.quantity,
		}

		if (productInCart) {
			quantity ? (productInCart.quantity += +quantity) : productInCart.quantity++
			setCart([...cart])
		} else {
			quantity ? (product.quantity = +quantity) : (product.quantity = 1)
			setCart([...cart, product])
		}
	}

	const productQuantityInCart = (slug) => cart.find((product) => product.slug === slug)?.quantity ?? 0

	const handleQuantity = (value, slug) => {
		const product = cart.find((product) => product.slug === slug)
		product.quantity = value
		setCart([...cart])
	}

	const cartTotalPrice = () => {
		const items = cart.map((product) => ({
			quantity: product.quantity,
			price: product.discountPrice ? product.discountPrice : product.price,
		}))

		return calculateTotalPrice(items)
	}

	const isProductInCart = (slug) => {
		return cart.find((product) => product.slug === slug)
	}

	const removeFromCart = (slug) => {
		const filteredCart = cart.filter((product) => product.slug !== slug)
		setCart([...filteredCart])
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				productQuantityInCart,
				handleQuantity,
				cartTotalPrice,
				isProductInCart,
				removeFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
