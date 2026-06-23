import { useCallback, useEffect, useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { useIsBelow } from '@hooks/useIsBelow'
import { useViewport } from '@hooks/useViewport.hook'

import { AddCompareItem } from '@modules/Compare/AddCompareItem/AddCompareItem'
import { CompareItem } from '@modules/Compare/CompareItem/CompareItem'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/compare-slider.module.scss'

const createItems = (type, products, activeCategory, removeSlide) => {
	const items = [
		...products.map((product, index) => (
			<CompareItem
				type={type}
				key={`${product.slug}-${index}`}
				product={product}
				removeSlide={removeSlide}
				category={activeCategory}
				dataValue={index + 1}
			/>
		)),
	]

	// Always add the AddCompareItem at the end
	if (products.length > 0) {
		items.push(<AddCompareItem key='add-compare-item' category={activeCategory} />)
	}

	return items
}

const responsive = {
	0: {
		items: 1,
		itemsFit: 'contain',
	},
	576: {
		items: 2,
		itemsFit: 'contain',
	},
	768: {
		items: 3,
		itemsFit: 'contain',
	},
	991: {
		items: 4,
		itemsFit: 'contain',
	},
}

export const CompareSlider = ({
	getActiveCompares,
	removeItemFromCompare,
	activeCategory,
	activeIndex,
	setActiveIndex,
	className,
	type,
}) => {
	const isTabletS = useIsBelow(BREAKPOINTS.tabletS)
	const [carouselRef, setCarouselRef] = useState(null)
	const [items, setItems] = useState([])

	// Reactive count of visible slide items for the current viewport
	const visibleItems = useViewport()

	const activeProducts = getActiveCompares(activeCategory)

	const removeSlide = useCallback(
		(slug, category) => {
			removeItemFromCompare(slug, category)
		},
		[removeItemFromCompare],
	)

	// Update items when dependencies change
	useEffect(() => {
		const newItems = createItems(type, activeProducts, activeCategory, removeSlide)
		setItems(newItems)
	}, [activeCategory, activeProducts, removeSlide, type])

	// Reset activeIndex when category changes or when items are removed
	useEffect(() => {
		setActiveIndex(0)
	}, [activeCategory, setActiveIndex])

	// Calculate navigation states
	const totalItems = items.length
	const maxIndex = Math.max(0, totalItems - visibleItems)
	const isArrowsShown = totalItems > visibleItems

	const handlePrevClick = () => {
		if (carouselRef) {
			const newIndex = activeIndex > 0 ? activeIndex - 1 : maxIndex
			carouselRef.slideTo(newIndex)
		}
	}

	const handleNextClick = () => {
		if (carouselRef) {
			const newIndex = activeIndex < maxIndex ? activeIndex + 1 : 0
			carouselRef.slideTo(newIndex)
		}
	}

	const handleSlideChanged = (e) => {
		setActiveIndex(e.item)
	}

	return (
		<div className={cn(s.compare_carousel, os.compareSliderWrapper, className)}>
			<AliceCarousel
				ref={setCarouselRef}
				responsive={responsive}
				items={items}
				activeIndex={activeIndex}
				animationDuration={250}
				disableDotsControls
				disableButtonsControls
				mouseTracking={true}
				touchTracking={true}
				onSlideChanged={handleSlideChanged}
				key={activeCategory}
			/>
			<Arrow
				className={cn(s.arrow, s.arrow_prev, {
					[s.active]: isArrowsShown || isTabletS,
				})}
				onClick={handlePrevClick}
				ariaLabel='prev'
			/>
			<Arrow
				className={cn(s.arrow, s.arrow_next, {
					[s.active]: isArrowsShown || isTabletS,
				})}
				onClick={handleNextClick}
				ariaLabel='next'
			/>
		</div>
	)
}
