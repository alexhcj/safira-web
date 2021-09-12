import React from 'react'
import { PreloaderSVG } from '../../svg'
import s from './preloader.module.css'

export const Preloader = ({ width, height, fill }) => {
	return (
		<div className={s.preloader}>
			<PreloaderSVG alt='Loading...' width={width} height={height} fill={fill} />
		</div>
	)
}
