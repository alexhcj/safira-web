import React from 'react'
import cn from 'classnames'
import s from './button-popup.module.scss'

// sizes: lg
export const ButtonPopup = ({ text = 'Add to Cart', size, onClick, className, children }) => {
	return (
		<div className={s.wrapper}>
			<button className={cn(s.btn, s[`btn_${size}`], className)} type='button' onClick={onClick}>
				{children}
			</button>
			<span className={s.popup}>{text}</span>
		</div>
	)
}

// TODO: add tooltip components
// TODO: fix multiple rerenders when hover on wrapper (popup rerenders).
// animation: transform + opacity + z-index. display none when hover on popup with no animation.
