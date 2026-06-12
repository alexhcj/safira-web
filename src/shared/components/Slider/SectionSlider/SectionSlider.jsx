import { useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import { SectionHeader } from '../../UI/Section/SectionHeader/SectionHeader'
import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/section-slider.module.scss'

export const SectionSlider = ({ title, subtitle, type, items, responsive, className }) => {
	const isLaptopM = useIsBelow(BREAKPOINTS.laptopM)
	const [isArrowsShown, setIsArrowsShown] = useState(false)

	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev, isArrowsShown && s.active)} />
	const nextButton = () => <Arrow className={cn(s.arrow, isArrowsShown && s.active)} />

	return (
		<div
			className={cn(s.slider, os.sectionSliderWrapper, type && os[type], className)}
			onMouseEnter={() => setIsArrowsShown(true)}
			onMouseLeave={() => setIsArrowsShown(false)}
			onPointerDown={() => setIsArrowsShown(true)}
		>
			<SectionHeader title={title} subtitle={subtitle} />
			<div className={s.box}>
				<AliceCarousel
					responsive={responsive}
					items={items}
					infinite={true}
					disableDotsControls={true}
					animationDuration={250}
					renderPrevButton={prevButton}
					renderNextButton={nextButton}
					disableButtonsControls={isLaptopM}
				/>
			</div>
		</div>
	)
}
