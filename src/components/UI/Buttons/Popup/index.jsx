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
