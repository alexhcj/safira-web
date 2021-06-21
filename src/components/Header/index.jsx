import { NavLink } from 'react-router-dom'
import s from './header.module.css'

export const Header = () => {
	return <div>
		<NavLink className={s.nav__link} to='/'>Home</NavLink>
		<NavLink className={s.nav__link} to='/shop'>Shop</NavLink>
		<NavLink className={s.nav__link} to='/blog'>Blog</NavLink>
		<NavLink className={s.nav__link} to='/cart'>Cart</NavLink>
		<NavLink className={s.nav__link} to='/checkout'>Checkout</NavLink>
		<NavLink className={s.nav__link} to='/product'>Product</NavLink>
		
	</div>
}
