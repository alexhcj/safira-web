import cn from 'classnames'

import PreloaderSVG from '@assets/svg/preloader.svg?react'

import s from './preloader.module.scss'

export const Preloader = ({ width = 30, height = 30, className }) => {
	return (
		<div className={cn(s.preloader, className)}>
			<PreloaderSVG width={width} height={height} />
		</div>
	)
}
