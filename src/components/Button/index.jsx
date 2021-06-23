import { NavLink } from 'react-router-dom'
import s from './btn.module.css'

export const Button = ({to = '/', text = 'Read more'}) => {
    return (
        <NavLink to={to} className={s.btn}>
            {text}
        </NavLink>
    )
}