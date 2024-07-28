import React from 'react'
import cn from 'classnames'
import s from './styles/space.module.scss'

// sizes: 'x' | 'xs' | 'xss' | 's' | 'ss' | 'm' | 'mm' | 'l'
export const Space = ({ size, space, className }) => (
	<div className={cn(size && s[size], className)} style={{ height: `${space}px` }} />
)
