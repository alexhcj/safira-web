import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { Space } from '../../UI/Spacing/Space'
import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/row-slider.module.scss'

export const RowSlider = ({ title, items, responsive, className }) => {
	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev)} />
	const nextButton = () => <Arrow className={s.arrow} />

	return (
		<div className={cn(s.slider, os.rowSliderWrapper, className)}>
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
				paddingLeft={10}
				paddingRight={10}
				mouseTracking={true}
			/>
		</div>
	)
}
