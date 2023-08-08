import React, { useState } from 'react'
import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'
import { Arrow } from '../Arrow/Arrow'
import 'react-alice-carousel/lib/scss/alice-carousel.scss'
import s from './deals-of-week-slider.module.scss'

export const DealsOfWeekSlider = ({ items, responsive, className }) => {
	const [isArrowsShown, setIsArrowsShown] = useState(false)

	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev, isArrowsShown && s.active)} />
	const nextButton = () => <Arrow className={cn(s.arrow, isArrowsShown && s.active)} />

	const handleArrowsShow = () => {
		setIsArrowsShown(!isArrowsShown)
	}

	return (
		<div className={cn(s.slider, className)} onMouseEnter={handleArrowsShow} onMouseLeave={handleArrowsShow}>
			<AliceCarousel
				responsive={responsive}
				items={items}
				infinite={true}
				disableDotsControls={true}
				animationDuration={250}
				renderPrevButton={prevButton}
				renderNextButton={nextButton}
			/>
		</div>
	)
}
