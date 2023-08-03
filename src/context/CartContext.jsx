import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.hook'

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useLocalStorage('cart', [])

	const addToCart = ({ name, slug, price, specifications }, quantity) => {
		const productInCart = cart.find((product) => product.slug === slug)

		const img = `${process.env.REACT_APP_PUBLIC_URL}/images/products/${slug}`
		const product = { slug, name, img, price: price.price, maxQuantity: specifications.quantity }

		if (productInCart) {
			quantity ? (product.quantity += +quantity) : product.quantity++
			setCart([...cart, product])
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

	const removeFromCart = (slug) => {
		const filteredCart = cart.filter((product) => product.slug !== slug)
		setCart([...filteredCart])
	}

	return (
		<CartContext.Provider value={{ cart, addToCart, productQuantityInCart, handleQuantity, removeFromCart }}>
			{children}
		</CartContext.Provider>
	)
}
