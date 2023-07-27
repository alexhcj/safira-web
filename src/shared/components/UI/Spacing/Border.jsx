import React from 'react'
import cn from 'classnames'
import s from './styles/border.module.sass'

export const Border = ({
	className,
}) => (
	<div className={cn(s.border, className,)} />
)
