import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import { Space } from '../../UI/Spacing/Space'
import { Arrow } from '../Arrow/Arrow'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/row-slider.module.scss'

// types: 'new-products' | 'best-sellers'
export const RowSlider = ({ title, type, items, responsive, className }) => {
	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev)} />
	const nextButton = () => <Arrow className={s.arrow} />

	return (
		<div className={cn(s.slider, os.rowSliderWrapper, type && os[type], className)}>
			<h3 className={s.title}>{title}</h3>
			<Space space={23} />
			<div className={s.box}>
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
