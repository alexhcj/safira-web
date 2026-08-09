import { useRef, useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/deals-of-week-slider.module.scss'

export const DealsOfWeekSlider = ({ items, responsive, className }) => {
	const isDragging = useRef(false)
	const isTablet = useIsBelow(BREAKPOINTS.tabletL)
	const [isArrowsShown, setIsArrowsShown] = useState(false)

	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev, isArrowsShown && s.active)} />
	const nextButton = () => <Arrow className={cn(s.arrow, s.arrow_next, isArrowsShown && s.active)} />

	const handleArrowsShow = () => {
		setIsArrowsShown(!isArrowsShown)
	}

	const start = useRef({ x: 0, y: 0 })

	const handlePointerDown = (e) => {
		setIsArrowsShown(true)
		isDragging.current = false

		start.current = {
			x: e.clientX,
			y: e.clientY,
		}
	}

	const handlePointerMove = (e) => {
		const dx = Math.abs(e.clientX - start.current.x)
		const dy = Math.abs(e.clientY - start.current.y)

		if (dx > 6 || dy > 6) {
			isDragging.current = true
		}
	}

	const handlePointerUp = () => {
		requestAnimationFrame(() => {
			isDragging.current = false
		})
	}

	const handleClickCapture = (e) => {
		if (!isDragging.current) return

		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<div
			className={cn(s.slider, os.dealsOfWeekWrapper, className)}
			onMouseEnter={handleArrowsShow}
			onMouseLeave={handleArrowsShow}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onClickCapture={handleClickCapture}
		>
			<AliceCarousel
				responsive={responsive}
				items={items}
				infinite={true}
				disableDotsControls={true}
				animationDuration={250}
				disableButtonsControls={isTablet}
				renderPrevButton={prevButton}
				renderNextButton={nextButton}
				mouseTracking
			/>
		</div>
	)
}
