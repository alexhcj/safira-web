import { useEffect, useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import { CategoriesDropdown } from '../../UI/CategoriesDropdown/CategoriesDropdown'

import phone from '@assets/images/phone.png'

import s from './navbar.module.scss'

export const Navbar = () => {
	const [sticky, setSticky] = useState(false)
	const location = useLocation()

	const fixNavbarToTop = () => {
		if (window.scrollY >= 150) {
			setSticky(true)
		} else {
			setSticky(false)
		}
	}

	useEffect(() => {
		if (location.pathname === '/compare' || location.pathname === '/categories' || location.pathname === '/brands')
			return
		window.addEventListener('scroll', fixNavbarToTop)

		return () => {
			if (location.pathname === '/compare' || location.pathname === '/categories' || location.pathname === '/brands')
				return
			window.removeEventListener('scroll', fixNavbarToTop)
		}
	}, [location.pathname])

	return (
		<div className={`${s.navbar} ${sticky ? `${s.sticky}` : ''} `}>
			<div className='container'>
				<div className={s.bottom}>
					<CategoriesDropdown />
					<nav className={s.nav}>
						<NavLink className={s.nav__link} to='/'>
							Home
						</NavLink>
						<NavLink className={s.nav__link} to={`/shop?${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}>
							Shop
						</NavLink>
						<NavLink className={s.nav__link} to={`/blog?${import.meta.env.VITE_BLOG_DEFAULT_QUERY}`}>
							Blog
						</NavLink>
						<NavLink className={s.nav__link} to='/contact-us'>
							Contact us
						</NavLink>
					</nav>
					<div className={s.support}>
						<img src={phone} alt='Phone support icon' />
						<div className={s.support__block}>
							<a className={s.support__link} href='tel:781234777999'>
								(812) 34 777 999
							</a>
							<span className={s.support__text}>Customer support</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
