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

	// reset range when location changes
	useEffect(() => {
		setActiveIndex(0)
	}, [location])

	const addToCompare = ({ slug, price, specifications, name, tags, basicCategory, subCategory }) => {
		const itemInCompare = compares[basicCategory] && compares[basicCategory].find((it) => it.slug === slug)
		if (itemInCompare) return

		const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

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

		if (Object.keys(compares).length === 0) {
			setCompares({ [basicCategory]: [item] })
			setActiveCategory(basicCategory)
		} else if (!compares[basicCategory]) {
			setCompares({ ...compares, [basicCategory]: [item] })
		} else {
			setCompares({ ...compares, [basicCategory]: [...compares[basicCategory], item] })
		}
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
		return compares[category] ? compares[category].length : 0
	}

	const getActiveCompares = (activeCategory) => {
		return compares[activeCategory] || []
	}

	const removeItemFromCompare = (slug, category) => {
		const currentItems = compares[category] || []
		const filteredComparedCategory = currentItems.filter((item) => item.slug !== slug)

		if (filteredComparedCategory.length > 0) {
			setCompares({ ...compares, [category]: filteredComparedCategory })
			// Reset to first item if current index is out of bounds
			if (activeIndex >= filteredComparedCategory.length) {
				setActiveIndex(0)
			}
		} else {
			removeListFromCompare(category)
		}
	}

	const makeFirstCompareListActive = (compareKeys) => {
		if (compareKeys.length > 0) {
			setActiveCategory(compareKeys[0])
		}
	}

	const removeListFromCompare = (category) => {
		const filteredCompares = Object.entries(compares).filter((item) => item[0] !== category)
		const convertedToObject = Object.fromEntries(filteredCompares)
		setCompares(convertedToObject)

		if (category === activeCategory) {
			const remainingCategories = Object.keys(convertedToObject)
			if (remainingCategories.length > 0) {
				makeFirstCompareListActive(remainingCategories)
			} else {
				setActiveCategory(null)
				setActiveIndex(0)
			}
		}
	}

	const removeAllCompares = () => {
		setCompares({})
		setActiveCategory(null)
		setActiveIndex(0)
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
