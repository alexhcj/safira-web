import { useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/deals-of-week-slider.module.scss'

export const DealsOfWeekSlider = ({ items, responsive, className }) => {
	const isTablet = useIsBelow(BREAKPOINTS.tabletL)
	const [isArrowsShown, setIsArrowsShown] = useState(false)

	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev, isArrowsShown && s.active)} />
	const nextButton = () => <Arrow className={cn(s.arrow, s.arrow_next, isArrowsShown && s.active)} />

	const handleArrowsShow = () => {
		setIsArrowsShown(!isArrowsShown)
	}

	return (
		<div
			className={cn(s.slider, os.dealsOfWeekWrapper, className)}
			onMouseEnter={handleArrowsShow}
			onMouseLeave={handleArrowsShow}
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
			/>
		</div>
	)
}
