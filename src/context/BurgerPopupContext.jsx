import { createContext, useContext, useState } from 'react'

const BurgerPopupContext = createContext([])

// Vite HMR - use function declaration instead of arrow function
export function useBurgerPopupContext() {
	const context = useContext(BurgerPopupContext)

	if (context === undefined) {
		throw new Error('useBurgerPopupContext must be used within an BurgerPopupProvider')
	}

	return context
}

export const BurgerPopupProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return <BurgerPopupContext.Provider value={{ isOpen, setIsOpen }}>{children}</BurgerPopupContext.Provider>
}
