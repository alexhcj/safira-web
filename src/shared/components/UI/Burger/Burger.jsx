import { useState } from 'react'

import cn from 'classnames'

import s from './burger.module.scss'

export const Burger = ({ onClick, className }) => {
	const [focus, setFocus] = useState(false)

	const onFocus = () => {
		setFocus(true)
	}

	const onBlur = () => {
		setFocus(false)
	}

	const handleClick = () => {
		onClick && onClick()
		setFocus(false)
	}

	const onKeyDownHandler = (e) => {
		switch (e.key) {
			case 'Enter':
				setFocus(false)
				break
			default:
				return
		}
	}

	return (
		<div
			className={cn(s.burger, focus && s.focus, className)}
			onClick={handleClick}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDownHandler}
		>
			<span></span>
			<span></span>
			<span></span>
		</div>
	)
}
