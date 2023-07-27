import React from 'react'
import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'
import { Arrow } from '../Controls/Arrow/Arrow'
import { Space } from '../../UI/Spacing/Space'
import 'react-alice-carousel/lib/scss/alice-carousel.scss'
import s from './row-slider.module.scss'

// TODO: fix padding|margin 10px offset of item(slide). вылезает за границы. or change slider
// slider container has no strict boundaries. when slide => 10px of padding seen
export const RowSlider = ({ title, items, responsive }) => {
	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev)} />
	const nextButton = () => <Arrow className={s.arrow} />

	return (
		<div className={s.slider}>
			<h3 className={s.title}>{title}</h3>
			<Space space={23} />
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
