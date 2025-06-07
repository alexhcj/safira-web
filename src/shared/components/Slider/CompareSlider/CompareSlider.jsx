import { useCallback, useEffect, useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { AddCompareItem } from '@modules/Compare/AddCompareItem/AddCompareItem'
import { CompareItem } from '@modules/Compare/CompareItem/CompareItem'

import { Arrow } from '../Arrow/Arrow'

import s from './compare-slider.module.scss'

const createItems = (type, getActiveCompares, activeCategory, handleClick, removeSlide) => {
	return [
		...getActiveCompares(activeCategory).map((product, index) => (
			<CompareItem
				type={type}
				key={product.slug}
				product={product}
				removeSlide={removeSlide}
				category={activeCategory}
				dataValue={index + 1}
			/>
		)),
		<AddCompareItem key='add-compare-item' category={activeCategory} />,
	]
}

const responsive = {
	0: {
		items: 4,
		itemsFit: 'contain',
	},
}

// types: 'small' | 'default'
export const CompareSlider = ({
	className,
	type,
	getActiveCompares,
	activeCategory,
	activeIndex,
	setActiveIndex,
	removeItemFromCompare,
	setRange,
}) => {
	const [isArrowsShown, setIsArrowsShown] = useState(false)
	const [items, setItems] = useState([])
	const [isNextDisabled, setIsNextDisabled] = useState(false)
	const [isPrevDisabled, setIsPrevDisabled] = useState(true)

	const removeSlide = useCallback(
		(slug, category) => {
			removeItemFromCompare(slug, category)
			setActiveIndex((prev) => prev - 1)
		},
		[removeItemFromCompare, setActiveIndex],
	)

	useEffect(() => {
		setItems(createItems(type, getActiveCompares, activeCategory, setActiveIndex, removeSlide))
	}, [activeCategory, getActiveCompares, removeSlide, setActiveIndex])

	useEffect(() => {
		items.length > 4 ? setIsArrowsShown(true) : setIsArrowsShown(false)
	}, [items.length])

	const slidePrev = (isDisabled) => {
		if (isDisabled) {
			setActiveIndex(items.length - 4)
			setRange({ first: items.length - 4, last: items.length - 1 })
			return
		}

		setActiveIndex((prev) => prev - 1)
		setRange((prev) => ({ first: prev.first - 1, last: prev.last - 1 }))
	}

	const slideNext = (isDisabled) => {
		if (isDisabled) {
			setActiveIndex(0)
			setRange({ first: 0, last: 3 })
			return
		}

		setActiveIndex((prev) => prev + 1)
		setRange((prev) => ({ first: prev.first + 1, last: prev.last + 1 }))
	}

	const onSlideChanged = (e) => {
		e.isNextSlideDisabled ? setIsNextDisabled(e.isNextSlideDisabled) : setIsNextDisabled(false)
		e.isPrevSlideDisabled ? setIsPrevDisabled(e.isPrevSlideDisabled) : setIsPrevDisabled(false)
	}

	return (
		<div className={cn(s.compare_carousel, className)}>
			<AliceCarousel
				responsive={responsive}
				paddingLeft={type !== 'small' && 10}
				paddingRight={type !== 'small' && 10}
				items={items}
				activeIndex={activeIndex}
				animationDuration={250}
				disableDotsControls
				disableButtonsControls
				onSlideChanged={onSlideChanged}
			/>
			<Arrow
				className={cn(s.arrow, s.arrow_prev, isArrowsShown && s.active)}
				onClick={() => slidePrev(isPrevDisabled)}
				ariaLabel='prev'
			/>
			<Arrow
				className={cn(s.arrow, s.arrow_next, isArrowsShown && s.active)}
				onClick={() => slideNext(isNextDisabled)}
				ariaLabel='next'
			/>
		</div>
	)
}
