import { createContext, useContext, useState } from 'react'

import GridOneIMG from '@assets/images/shop/grid-1.png'
import GridTwoIMG from '@assets/images/shop/grid-2.png'
import GridThreeIMG from '@assets/images/shop/grid-3.png'
import GridFourIMG from '@assets/images/shop/grid-4.png'
import GridListIMG from '@assets/images/shop/grid-list.png'

export const gridTypes = [
	{ id: 1, type: 'grid-1', name: '1', img: GridOneIMG, alt: 'Products 1-column grid' },
	{ id: 2, type: 'grid-2', name: '2', img: GridTwoIMG, alt: 'Products 2-column grid' },
	{ id: 3, type: 'grid-3', name: '3', img: GridThreeIMG, alt: 'Products 3-column grid' },
	{ id: 4, type: 'grid-4', name: '4', img: GridFourIMG, alt: 'Products 4-column grid' },
	{ id: 5, type: 'grid-list', name: 'List', img: GridListIMG, alt: 'Products list grid' },
]

const VIEWPORT_CONFIG = [
	{ maxWidth: 576, available: ['grid-1', 'grid-2', 'grid-list'], default: 'grid-2' },
	{ maxWidth: 768, available: ['grid-2', 'grid-list'], default: 'grid-2' },
	{ maxWidth: 991, available: ['grid-3', 'grid-list'], default: 'grid-3' },
	{ maxWidth: 1200, available: ['grid-3', 'grid-4', 'grid-list'], default: 'grid-3' },
	{ maxWidth: Infinity, available: ['grid-3', 'grid-4', 'grid-list'], default: 'grid-3' },
]

function getViewportConfig(width) {
	return VIEWPORT_CONFIG.find(({ maxWidth }) => width < maxWidth)
}

function getAvailableGrids(width) {
	const { available } = getViewportConfig(width)
	return gridTypes.filter(({ type }) => available.includes(type))
}

const GridContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useGridContext() {
	const context = useContext(GridContext)

	if (context === undefined) {
		throw new Error('useGridContext must be used within an GridProvider')
	}

	return context
}

export const GridProvider = ({ children }) => {
	const initialConfig = getViewportConfig(window.innerWidth)

	const [grid, setGrid] = useState(initialConfig.default)
	const [availableGrids] = useState(() => getAvailableGrids(window.innerWidth))

	const handleSetGrid = (type) => setGrid(type)

	return <GridContext.Provider value={{ grid, handleSetGrid, availableGrids }}>{children}</GridContext.Provider>
}
