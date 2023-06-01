import React from 'react'
import cn from 'classnames'
import { ReactComponent as ArrowSVG } from '../../../../../assets/svg/arrow.svg'
import s from './arrow.module.scss'

export const Arrow = ({ className }) => {
	return (
		<button className={cn(s.arrow, className)}>
			<ArrowSVG />
		</button>
	)
}
