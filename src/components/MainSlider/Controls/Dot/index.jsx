import React from 'react'
import s from './dot.module.css'
import classNames from 'classnames/bind'

let cx = classNames.bind(s)

export const Dot = ({ onClick, ...rest }) => {
	const {
		onMove,
		index,
		active,
		carouselState: { currentSlide, deviceType },
	} = rest

	let btn = cx('btn', { active: active })

	return <button className={btn} onClick={() => onClick()}></button>
}

// TODO: change contol btn size to 14px
