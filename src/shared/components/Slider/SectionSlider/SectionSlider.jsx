import { useRef, useState } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import { SectionHeader } from '../../UI/Section/SectionHeader/SectionHeader'
import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/section-slider.module.scss'

export const SectionSlider = ({ title, subtitle, type, items, responsive, className }) => {
	const isDragging = useRef(false)
	const isLaptopM = useIsBelow(BREAKPOINTS.laptopM)
	const [isArrowsShown, setIsArrowsShown] = useState(false)

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

	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev, isArrowsShown && s.active)} />
	const nextButton = () => <Arrow className={cn(s.arrow, isArrowsShown && s.active)} />

	return (
		<div
			className={cn(s.slider, os.sectionSliderWrapper, type && os[type], className)}
			onMouseEnter={() => setIsArrowsShown(true)}
			onMouseLeave={() => setIsArrowsShown(false)}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onClickCapture={handleClickCapture}
		>
			<SectionHeader title={title} subtitle={subtitle} />
			<div className={s.box} onClickCapture={handleClickCapture}>
				<AliceCarousel
					responsive={responsive}
					items={items}
					infinite={true}
					disableDotsControls={true}
					animationDuration={250}
					renderPrevButton={prevButton}
					renderNextButton={nextButton}
					disableButtonsControls={isLaptopM}
					mouseTracking
				/>
			</div>
		</div>
	)
}
