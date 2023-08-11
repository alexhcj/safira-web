import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CategoriesDropdown } from '../../UI/CategoriesDropdown/CategoriesDropdown'
import phone from '../../../../assets/images/phone.png'
import s from './navbar.module.scss'

export const Navbar = () => {
	const [sticky, setSticky] = useState(false)

	const fixNavbarToTop = () => {
		if (window.scrollY >= 150) {
			setSticky(true)
		} else {
			setSticky(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', fixNavbarToTop)

		return function cleanup() {
			window.removeEventListener('scroll', fixNavbarToTop)
		}
	}, [])

	return (
		<div className={`${s.navbar} ${sticky ? `${s.sticky}` : ''} `}>
			<div className='container'>
				<div className={s.bottom}>
					<CategoriesDropdown />
					<nav className={s.nav}>
						<NavLink className={s.nav__link} to='/'>
							Home
						</NavLink>
						<NavLink className={s.nav__link} to='/shop'>
							Shop
						</NavLink>
						<NavLink className={s.nav__link} to='/blog'>
							Blog
						</NavLink>
					</nav>
					<div className={s.support}>
						<img src={phone} alt='Phone support icon' />
						<div className={s.support__block}>
							<a className={s.support__link} href='tel:792134777999'>
								(921) 34 777 999
							</a>
							<span className={s.support__text}>Customer support</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
