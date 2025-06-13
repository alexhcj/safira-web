import { createContext, useContext, useState } from 'react'

const ProductModalContext = createContext([])
export const useProductModalContext = () => useContext(ProductModalContext)

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
