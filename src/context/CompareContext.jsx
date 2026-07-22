import { createContext, useContext, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const CompareContext = createContext([])

// Vite HMR - use function declaration instead of arrow function
export function useCompareContext() {
	const context = useContext(CompareContext)

	if (context === undefined) {
		throw new Error('useCompareContext must be used within an CompareProvider')
	}

	return context
}

export const CompareProvider = ({ children }) => {
	const location = useLocation()
	const [compares, setCompares] = useLocalStorage('compare', {})
	const [activeCategory, setActiveCategory] = useState(Object.keys(compares)[0])
	const [activeIndex, setActiveIndex] = useState(0)

	// reset slider position when location changes
	useEffect(() => {
		setActiveIndex(0)
	}, [location])

	/**
	 * Always resets the slider to position 0 when switching categories.
	 * Use this everywhere instead of calling setActiveCategory directly —
	 * that prevents stale index from a previous category bleeding into the new one.
	 */
	const switchActiveCategory = (category) => {
		setActiveCategory(category)
		setActiveIndex(0)
	}

	const addToCompare = ({ slug, price, specifications, name, tags, primeCategory, basicCategory, subCategory }) => {
		const itemInCompare = compares[basicCategory] && compares[basicCategory].find((it) => it.slug === slug)
		if (itemInCompare) return

		const img = `${import.meta.env.VITE_API_PUBLIC_URL}/images/products/${slug}`

		const item = {
			slug,
			name,
			img,
			tags,
			primeCategory,
			subCategory,
			basicCategory,
			price: price.price,
			discountPrice: price.discountPrice,
			specifications,
		}

		if (Object.keys(compares).length === 0) {
			setCompares({ [basicCategory.slug]: [item] })
			switchActiveCategory(basicCategory.slug)
		} else if (!compares[basicCategory.slug]) {
			setCompares({ ...compares, [basicCategory.slug]: [item] })
		} else {
			setCompares({ ...compares, [basicCategory.slug]: [...compares[basicCategory.slug], item] })
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
			switchActiveCategory(compareKeys[0])
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
				switchActiveCategory(null)
			}
		}
	}

	const removeAllCompares = () => {
		setCompares({})
		switchActiveCategory(null)
	}

	const isProductInCompare = (slug, category) => {
		return (compares[category] && compares[category].find((product) => product.slug === slug)) || false
	}

	return (
		<CompareContext.Provider
			value={{
				activeCategory,
				setActiveCategory: switchActiveCategory,
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
