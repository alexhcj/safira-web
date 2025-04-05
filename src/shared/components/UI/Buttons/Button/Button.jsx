import { useState } from 'react';
import { ReactComponent as MagnifierSVG } from '../../../../../assets/svg/magnifier.svg'
import cn from 'classnames'
import s from './button.module.scss'

// types: 'submit' | 'subscribe' | 'search' | 'text' | 'form' | 'post' | 'auth' | 'secondary' | 'profile'
// htmlTypes: 'button' | 'submit'
// rounded: false
export const Button = ({ type, htmlType = 'button', onClick, disabled, rounded = true, className, children }) => {
	const [focus, setFocus] = useState(false)

	const onFocus = () => {
		setFocus(true)
	}

	const onBlur = () => {
		setFocus(false)
	}

	// TODO: don't work in GlobalSearchForm (don't unfocused)
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
		<button
			type={htmlType}
			className={cn(s.btn, type && s[type], focus && s.focus, !rounded && s.border_none, className)}
			onClick={onClick}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDownHandler}
			disabled={disabled}
		>
			{children}
			{type === 'search' && <MagnifierSVG />}
		</button>
	)
}
