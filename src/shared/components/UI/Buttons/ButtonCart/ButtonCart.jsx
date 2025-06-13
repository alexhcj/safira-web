import { useState } from 'react'

import cn from 'classnames'

import s from './button-cart.module.scss'

export const ButtonCart = ({ type = 'button', onClick, className, children }) => {
	const [focus, setFocus] = useState(false)

	const onFocus = () => {
		setFocus(true)
	}

	const onBlur = () => {
		setFocus(false)
	}

	const handleClick = () => {
		onClick()
		setFocus(false)
	}

	return (
		<button
			type={type}
			className={cn(s.btn, focus && s.focus, className)}
			onClick={handleClick}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			{children}
		</button>
	)
}
