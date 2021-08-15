import { NavLink } from 'react-router-dom'
import s from './btn.module.css'

export const Button = ({ to = '/', text = 'Add to Cart', children }) => {
	return (
		<div className={s.wrapper}>
			<NavLink to={to} className={s.btn}>
                {children}
            </NavLink>
			<span className={s.popup}>{text}</span>
		</div>
	)
}

// BUG: fix sync svg white gaps (hovers)
// TODO: add new popup animation when hover. existing (display none + opacity). Now: add transform + display none when hover on popup with no animation
// TODO: fix gap when hover on btn (border radius)