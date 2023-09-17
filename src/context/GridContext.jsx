import React, { createContext, useContext, useState } from 'react'
import GridImage1 from '../assets/images/shop/grid-3.png'
import GridImage2 from '../assets/images/shop/grid-4.png'
import GridImage3 from '../assets/images/shop/grid-list.png'

const GridContext = createContext(null)

export const useGridContext = () => useContext(GridContext)

export const GridProvider = ({ children }) => {
	const [grid, setGrid] = useState(gridTypes[0].type)

	return <GridContext.Provider value={{ grid, setGrid }}>
		{children}
	</GridContext.Provider>
}

export const gridTypes = [
	{ id: 1, type: 'grid-3', name: '3', img: GridImage1, alt: 'Products 3-column grid' },
	{ id: 2, type: 'grid-4', name: '4', img: GridImage2, alt: 'Products 4-column grid' },
	{ id: 3, type: 'grid-list', name: 'List', img: GridImage3, alt: 'Products list grid' },
]
