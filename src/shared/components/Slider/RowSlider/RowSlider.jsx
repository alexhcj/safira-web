import { useRef } from 'react'

import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { Space } from '../../UI/Spacing/Space'
import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/row-slider.module.scss'

// types: 'new-products' | 'best-sellers'
export const RowSlider = ({ title, type, items, responsive, className }) => {
	const isDragging = useRef(false)
	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev)} />
	const nextButton = () => <Arrow className={s.arrow} />

	const start = useRef({ x: 0, y: 0 })

	const handlePointerDown = (e) => {
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
		<div className={cn(s.slider, os.rowSliderWrapper, type && os[type], className)}>
			<h3 className={s.title}>{title}</h3>
			<Space space={23} />
			<div
				className={s.box}
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
					renderPrevButton={prevButton}
					renderNextButton={nextButton}
					mouseTracking={true}
				/>
			</div>
		</div>
	)
}
