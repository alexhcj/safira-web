import { useCallback, useEffect, useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { AddCompareItem } from '@modules/Compare/AddCompareItem/AddCompareItem'
import { CompareItem } from '@modules/Compare/CompareItem/CompareItem'

import { Arrow } from '../Arrow/Arrow'

import s from './compare-slider.module.scss'

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
	const [carouselRef, setCarouselRef] = useState(null)
	const [items, setItems] = useState([])

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

	// Calculate navigation states for infinite sliding
	const totalItems = items.length
	const visibleItems = 4
	const maxIndex = Math.max(0, totalItems - visibleItems)
	const isArrowsShown = totalItems > visibleItems

	const handlePrevClick = () => {
		if (carouselRef) {
			let newIndex
			if (activeIndex > 0) {
				newIndex = activeIndex - 1
			} else {
				// Wrap to end
				newIndex = maxIndex
			}
			carouselRef.slideTo(newIndex)
		}
	}

	const handleNextClick = () => {
		if (carouselRef) {
			let newIndex
			if (activeIndex < maxIndex) {
				newIndex = activeIndex + 1
			} else {
				// Wrap to beginning
				newIndex = 0
			}
			carouselRef.slideTo(newIndex)
		}
	}

	const handleSlideChanged = (e) => {
		// Update activeIndex when AliceCarousel slides
		setActiveIndex(e.item)
	}

	return (
		<div className={cn(s.compare_carousel, className)}>
			<AliceCarousel
				ref={setCarouselRef}
				responsive={responsive}
				paddingLeft={type !== 'small' && 10}
				paddingRight={type !== 'small' && 10}
				items={items}
				activeIndex={activeIndex}
				animationDuration={250}
				disableDotsControls
				disableButtonsControls
				mouseTracking={false}
				touchTracking={false}
				onSlideChanged={handleSlideChanged}
				key={activeCategory}
			/>
			<Arrow
				className={cn(s.arrow, s.arrow_prev, {
					[s.active]: isArrowsShown,
				})}
				onClick={handlePrevClick}
				ariaLabel='prev'
			/>
			<Arrow
				className={cn(s.arrow, s.arrow_next, {
					[s.active]: isArrowsShown,
				})}
				onClick={handleNextClick}
				ariaLabel='next'
			/>
		</div>
	)
}
