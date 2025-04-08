import { createContext, useContext, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const CompareContext = createContext([])

export const useCompareContext = () => useContext(CompareContext)

export const CompareProvider = ({ children }) => {
	const location = useLocation()
	const [compares, setCompares] = useLocalStorage('compare', {})
	const [activeCategory, setActiveCategory] = useState(Object.keys(compares)[0])
	const [activeIndex, setActiveIndex] = useState(0)
	const [range, setRange] = useState({ first: activeIndex, last: activeIndex + 3 })

	useEffect(() => {
		return () => setRange({ first: 0, last: 3 })
	}, [location])

	const addToCompare = ({ slug, price, specifications, name, tags, basicCategory, subCategory }) => {
		const itemInCompare = compares[basicCategory] && compares[basicCategory].find((it) => it.slug === slug)
		if (itemInCompare) return

		const img = `${process.env.REACT_APP_API_PUBLIC_URL}/images/products/${slug}`

		const item = {
			slug,
			name,
			img,
			tags,
			subCategory,
			price: price.price,
			discount_price: price.discount_price,
			specifications,
		}
		if (compares.length === 0) setCompares({ [basicCategory]: [item] })
		if (!compares[basicCategory]) setCompares({ ...compares, [basicCategory]: [item] })
		if (compares[basicCategory]) setCompares({ ...compares, [basicCategory]: [...compares[basicCategory], item] })
	}

	const comparesCategories = () => {
		return Object.keys(compares)
	}

	const calcTotalCompareItems = () => {
		return Object.entries(compares)
			.map((item) => item[1].reduce((acc) => acc + 1, 0))
			.reduce((acc, cur) => (acc += cur), 0)
	}

	const calcCategoryItems = (category) => {
		return Object.entries(compares[category])
			.map((item) => item[1])
			.reduce((acc) => acc + 1, 0)
	}

	const getActiveCompares = (activeCategory) => {
		return compares[activeCategory]
	}

	const removeItemFromCompare = (slug, category) => {
		if (range.last === compares[category].length) {
			setRange((prev) => ({
				first: prev.first - 1,
				last: prev.last - 1,
			}))
		}

		const filteredComparedCategory = compares[category].filter((item) => item.slug !== slug)
		setCompares({ [category]: filteredComparedCategory })

		// TODO: optimize. check before filter 58
		if (filteredComparedCategory.length === 0) removeListFromCompare(category)
	}

	const makeFirstCompareItemActive = (compares) => {
		setActiveCategory(compares[0])
	}

	const removeListFromCompare = (category) => {
		const filteredCompares = Object.entries(compares).filter((item) => item[0] !== category)
		const convertedToObject = Object.fromEntries(filteredCompares)
		setCompares(convertedToObject)

		if (category === activeCategory) makeFirstCompareItemActive(Object.keys(convertedToObject))
	}

	const removeAllCompares = () => {
		setCompares({})
	}

	const isProductInCompare = (slug, category) => {
		return (compares[category] && compares[category].find((product) => product.slug === slug)) || false
	}

	return (
		<CompareContext.Provider
			value={{
				activeCategory,
				setActiveCategory,
				activeIndex,
				setActiveIndex,
				range,
				setRange,
				addToCompare,
				comparesCategories,
				calcTotalCompareItems,
				calcCategoryItems,
				getActiveCompares,
				removeItemFromCompare,
				removeListFromCompare,
				removeAllCompares,
				isProductInCompare,
			}}
		>
			{children}
		</CompareContext.Provider>
	)
}
