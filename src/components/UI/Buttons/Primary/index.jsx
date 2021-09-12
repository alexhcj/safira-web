import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { MagnifierSVG } from '../../../svg'
import classNames from 'classnames/bind'
import s from './btn.module.css'

let cx = classNames.bind(s)

export const Button = ({ to = '/', text = 'Read more', type = '' }) => {
	const [focus, setFocus] = useState(false)

	const btnCN = cx('btn', {
		btn__subscribe: type === 'subscribe',
		btn__search: type === 'search',
		btn__submit: type === 'submit',
		focus: focus,
	})

	const onFocus = () => {
		setFocus(true)
	}

	const onBlur = () => {
		setFocus(false)
	}

	return (
		<NavLink to={to} className={btnCN} onFocus={onFocus} onBlur={onBlur}>
			{text}
			{type === 'search' && <MagnifierSVG width={20} height={20} />}
		</NavLink>
	)
}

// NOTE: mb btn should be btn, not link? create another jsx with btn?
