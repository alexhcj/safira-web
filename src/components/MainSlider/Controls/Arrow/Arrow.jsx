import React from 'react'
import ArrowSVG from '../../../../assets/svg/arrow.svg'
import s from './arrow.module.scss'

export const Arrow = ({ onClick, width, height}) => {
	return (
		<button className={s.arrow} onClick={() => onClick()}>
			<img src={ArrowSVG} alt=""/>
		</button>
	)
}
