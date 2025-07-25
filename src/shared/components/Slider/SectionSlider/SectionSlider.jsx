import { useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { SectionHeader } from '../../UI/Section/SectionHeader/SectionHeader'
import { Space } from '../../UI/Spacing/Space'
import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/section-slider.module.scss'

export const SectionSlider = ({ title, subtitle, items, responsive, className }) => {
	const [isArrowsShown, setIsArrowsShown] = useState(false)

	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev, isArrowsShown && s.active)} />
	const nextButton = () => <Arrow className={cn(s.arrow, isArrowsShown && s.active)} />

	const handleArrowsShow = () => {
		setIsArrowsShown(!isArrowsShown)
	}

	return (
		<div
			className={cn(s.slider, os.sectionSliderWrapper, className)}
			onMouseEnter={handleArrowsShow}
			onMouseLeave={handleArrowsShow}
		>
			<SectionHeader title={title} subtitle={subtitle} />
			<Space space={30} />
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
