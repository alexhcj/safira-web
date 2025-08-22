import { useState } from 'react'

import cn from 'classnames'

import s from './tooltip.module.scss'

export const Tooltip = ({
	children,
	type = 'default',
	position = 'top',
	trigger = 'hover',
	text,
	delay = 0,
	disabled = false,
	className,
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const [timeoutId, setTimeoutId] = useState(null)

	const showTooltip = () => {
		if (disabled) return

		if (timeoutId) clearTimeout(timeoutId)

		const id = setTimeout(() => {
			setIsVisible(true)
		}, delay)
		setTimeoutId(id)
	}

	const hideTooltip = () => {
		if (timeoutId) clearTimeout(timeoutId)
		setIsVisible(false)
	}

	const handleMouseEnter = trigger === 'hover' ? showTooltip : undefined
	const handleMouseLeave = trigger === 'hover' ? hideTooltip : undefined
	const handleClick = trigger === 'click' ? () => setIsVisible(!isVisible) : undefined

	if (!text || disabled) {
		return children
	}

	return (
		<div
			className={cn(s.wrapper, className)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
		>
			{children}
			<div className={cn(s.tooltip, s[`tooltip_${type}`], s[`tooltip_${position}`], { [s.visible]: isVisible })}>
				{text}
			</div>
		</div>
	)
}
