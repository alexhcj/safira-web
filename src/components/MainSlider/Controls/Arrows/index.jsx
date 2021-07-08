import React from 'react'
import { ArrowSVG } from '../../../svg'
import s from './arrow.module.css'

export const Arrow = ({ onClick, width, height, ...rest }) => {
	const {
		onMove,
		carouselState: { currentSlide, deviceType },
	} = rest
	// onMove means if dragging or swiping in progress.
    
	return (
		<button className={s.arrow} onClick={() => onClick()}>
			<ArrowSVG width={width} height={height} />
		</button>
	)
}