import cn from 'classnames'

import ArrowSVG from '@assets/svg/arrow.svg?react'

import s from './arrow.module.scss'

export const Arrow = ({ className, onClick, ariaLabel }) => {
	return (
		<button className={cn(s.arrow, className)} onClick={onClick} aria-label={ariaLabel}>
			<ArrowSVG />
		</button>
	)
}
