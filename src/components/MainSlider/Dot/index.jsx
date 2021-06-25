import React from 'react'
import s from './dot.module.css'

export const Dot = ({ onClick, ...rest }) => {
	const {
		onMove,
		index,
		active,
		carouselState: { currentSlide, deviceType },
	} = rest

	return <button className={active ? `${s.active}` : `${s.inactive}`} onClick={() => onClick()}></button>
}

// TODO: change contol btn size to 14px
