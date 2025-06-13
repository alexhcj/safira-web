import { createContext, useContext, useState } from 'react'

const CartPopupContext = createContext([])
export const useCartPopupContext = () => useContext(CartPopupContext)

export const CartPopupProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return <CartPopupContext.Provider value={{ isOpen, setIsOpen }}>{children}</CartPopupContext.Provider>
}
