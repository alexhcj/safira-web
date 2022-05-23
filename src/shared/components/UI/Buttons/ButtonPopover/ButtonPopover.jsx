import React from 'react'
import cn from 'classnames'
import { Text } from '../../Text/Text'
import s from './button-popover.module.scss'

export const ButtonPopover = ({ isHovered, text, className, onClick, onMouseEnter, onMouseLeave, children }) => {
	return (
		<button
			className={cn(s.btn, isHovered && s.active, className)}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
			<Text span className={s.text}>{text}</Text>
		</button>
	)
}
