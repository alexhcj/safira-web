import cn from 'classnames'

import { ReactComponent as PreloaderSVG } from '@assets/svg/preloader.svg'

import s from './preloader.module.scss'

export const Preloader = ({ width = 30, height = 30, className }) => {
	return (
		<div className={cn(s.preloader, className)}>
			<PreloaderSVG width={width} height={height} />
		</div>
	)
}
