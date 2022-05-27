import React from 'react'
import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { Arrow } from '../Controls/Arrow/Arrow'
import { Space } from '../../UI/Spacing/Space'
import { convertArray } from '../../../../utils'
import 'react-alice-carousel/lib/scss/alice-carousel.scss'
import s from './row-slider.module.scss'

// TODO: fix padding|margin 10px offset of item(slide). вылезает за границы. or change slider
// slider container has no strict boundaries. when slide => 10px of padding seen
export const RowSlider = ({ title, array, level, productSize, productImgSize, responsive }) => {
	const slides = convertArray(array, level).map((col, index) => {
		return (
			<div key={index} style={{ padding: '0 10px' }}>
				{col.map((product) => {
					return (
						<ProductCard
							size={productSize}
							imgSize={productImgSize}
							key={product.slug}
							product={product}
						/>
					)
				})}
			</div>
		)
	})

	const prevButton = () => <Arrow className={cn(s.arrow, s.arrow_prev)} />
	const nextButton = () => <Arrow className={s.arrow} />

	return (
		<div className={s.slider}>
			<h3 className={s.title}>{title}</h3>
			<Space space={23} />
			<AliceCarousel
				responsive={responsive}
				items={slides}
				infinite={true}
				disableDotsControls={true}
				animationDuration={250}
				renderPrevButton={prevButton}
				renderNextButton={nextButton}
			/>
		</div>
	)
}
