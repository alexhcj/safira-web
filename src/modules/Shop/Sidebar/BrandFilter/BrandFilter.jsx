import { useEffect, useState } from 'react'

import cn from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { useProductsNew } from '@hooks/services/useProductsNew'

import { CheckboxFilter } from '@shared/components/UI/Checkbox/CheckboxFilter'

import s from './brand-filter.module.scss'

export const BrandFilter = () => {
	const [params, setParams] = useSearchParams()
	const { findQueryBrands } = useProductsNew()
	const [availableBrands, setAvailableBrands] = useState([])
	const [showMore, setShowMore] = useState(false)

	const { primeCategory, subCategory, basicCategory, minPrice, maxPrice, slug, brand, dietary } = Object.fromEntries([
		...params,
	])

	const selectedBrands = brand ? brand.split('+') : []

	useEffect(() => {
		const fetchData = async () => {
			const queryWithoutBrand = { ...Object.fromEntries([...params]) }

			if (queryWithoutBrand.brand) {
				delete queryWithoutBrand.brand
			}

			const res = await findQueryBrands(queryWithoutBrand)

			if (res && res.success) {
				setAvailableBrands(res.brands || [])
			}
		}

		fetchData()
	}, [primeCategory, subCategory, basicCategory, minPrice, maxPrice, slug, dietary])

	const toggleBrandSelection = (brandSlug) => {
		const query = Object.fromEntries([...params])

		const isSelected = selectedBrands.includes(brandSlug)

		let newBrandParam

		if (isSelected) {
			newBrandParam = selectedBrands.filter((b) => b !== brandSlug).join('+')
		} else {
			newBrandParam = selectedBrands.length > 0 ? `${brand}+${brandSlug}` : brandSlug
		}

		if (newBrandParam) {
			setParams({ ...query, offset: '0', brand: newBrandParam })
		} else {
			params.delete('brand')
			setParams({ ...Object.fromEntries([...params]), offset: '0' })
		}
	}

	const sortBrandsWithSelectedOnTop = (brands, selectedSlugs, sortType = 'a-z') => {
		if (!brands || brands.length === 0) return []

		const sortedBrands = [...brands]

		// First sort by selection status
		sortedBrands.sort((a, b) => {
			const aIsSelected = selectedSlugs.includes(a.brand.slug)
			const bIsSelected = selectedSlugs.includes(b.brand.slug)

			// If both have the same selection status, sort by the specified sort type
			if (aIsSelected === bIsSelected) {
				if (sortType === 'a-z') {
					return a.brand.displayName.localeCompare(b.brand.displayName)
				} else if (sortType === 'popularity') {
					// For equal popularity, sort alphabetically as a tie-breaker
					const popularityDiff = b.popularity - a.popularity
					return popularityDiff === 0 ? a.brand.displayName.localeCompare(b.brand.displayName) : popularityDiff
				}
				return 0
			}

			// Selected brands come first
			return aIsSelected ? -1 : 1
		})

		return sortedBrands
	}

	const toggleShowMore = () => {
		setShowMore(!showMore)
	}

	if (availableBrands.length === 0) {
		return <div className={s.no_brands}>No brands found for the current selection</div>
	}

	// Sort brands with selected ones on top, then apply the secondary sort
	const sortedBrands = sortBrandsWithSelectedOnTop(availableBrands, selectedBrands, showMore ? 'a-z' : 'popularity')

	return (
		<>
			<div className={cn(s.brands, { [s.active]: showMore && availableBrands.length > 5 })}>
				{sortedBrands.map(({ brand: { slug, displayName }, quantity }, index) => {
					// Only show first 5 brands if not expanded (excluding selected ones which are always shown)
					const isSelected = selectedBrands.includes(slug)

					if (!showMore && index > 4 && !isSelected) return null

					return (
						<CheckboxFilter
							className={s.brand_item}
							isChecked={isSelected}
							key={slug}
							onClick={() => toggleBrandSelection(slug)}
						>
							<span className={s.brand}>{displayName}</span>
							<span className={cn(s.quantity, { [s.active]: isSelected })}>({quantity})</span>
						</CheckboxFilter>
					)
				})}
			</div>
			{sortedBrands.length > 5 && (
				<button className={cn(s.btn_show_more, { [s.active]: showMore })} onClick={() => toggleShowMore(showMore)}>
					{showMore ? 'Show less' : 'Show more'}
				</button>
			)}
		</>
	)
}
