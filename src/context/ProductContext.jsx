import { createContext, useContext, useState } from 'react'

const ProductModalContext = createContext([])

// Vite HMR - use function declaration instead of arrow function
export function useProductModalContext() {
	const context = useContext(ProductModalContext)

	if (context === undefined) {
		throw new Error('useProductModalContext must be used within an ProductProvider')
	}

	return context
}

export const ProductProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [product, setProduct] = useState({})

	const previewProduct = (product) => {
		setIsOpen(true)
		setProduct(product)
	}

	return (
		<ProductModalContext.Provider value={{ isOpen, setIsOpen, product, previewProduct }}>
			{children}
		</ProductModalContext.Provider>
	)
}
