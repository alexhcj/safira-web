import { createContext, useContext, useState } from 'react'

const CartPopupContext = createContext([])

// Vite HMR - use function declaration instead of arrow function
export function useCartPopupContext() {
	const context = useContext(CartPopupContext)

	if (context === undefined) {
		throw new Error('useCartPopupContext must be used within an CartPopupProvider')
	}

	return context
}

export const CartPopupProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return <CartPopupContext.Provider value={{ isOpen, setIsOpen }}>{children}</CartPopupContext.Provider>
}
