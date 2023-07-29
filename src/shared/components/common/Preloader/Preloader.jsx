import React from 'react'
import PreloaderSVG  from '../../../../assets/svg/preloader.svg'
import s from './preloader.module.scss'

export const Preloader = ({ width = 30, height = 30 }) => {
	return (
		<div className={s.preloader}>
			<img src={PreloaderSVG} width={width} height={height} alt="Preloader svg round" />
		</div>
	)
}
