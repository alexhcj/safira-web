import { NavLink } from 'react-router-dom'
import { MagnifierSVG } from '../../../svg'
import s from './btn.module.css'
import classNames from 'classnames/bind'

let cx = classNames.bind(s)

export const Button = ({ to = '/', text = 'Read more', type = '' }) => {
	const btnCN = cx('btn', { btn__submit: type === 'submit', btn__search: type === 'search' })

	return (
		<NavLink to={to} className={btnCN}>
			{text}
			{type === 'search' && <MagnifierSVG width={20} height={20} />}
		</NavLink>
	)
}

// NOTE: mb btn should be btn, not link? create another jsx with btn?
