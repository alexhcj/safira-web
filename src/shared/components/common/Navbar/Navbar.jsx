import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import { camelToStr } from '@/utils'

import { useIsBelow } from '@hooks/useIsBelow'

import { GlobalSearch } from '@components/GlobalSearch/GlobalSearch'

import { SupportBadge } from '@shared/components/UI/SupportBadge/SupportBadge'

import { CategoriesDropdown } from '../../UI/CategoriesDropdown/CategoriesDropdown'

import ArrowSVG from '@assets/svg/arrow.svg?react'

import s from './navbar.module.scss'

const shopNavList = {
	browse: [
		{
			title: 'Products',
			route: `/shop?${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`,
		},
		{
			title: 'Categories',
			route: '/categories',
		},
		{
			title: 'Brands',
			route: '/brands',
		},
	],
	quickAccess: [
		{
			title: 'Cart',
			route: '/cart',
		},
		{
			title: 'Wishlist',
			route: '/wishlist',
		},
		{
			title: 'Compare',
			route: '/compare',
		},
	],
}

const pagesNavList = [
	{
		title: 'About us',
		route: '/about-us',
	},
	{
		title: 'Privacy policy',
		route: '/privacy-policy',
	},
	{
		title: 'Terms & Conditions',
		route: '/terms-conditions',
	},
	{
		title: 'Frequently Questions',
		route: '/faq',
	},
	{
		title: 'Site map',
		route: '/site-map',
	},
	{
		title: 'Roadmap',
		route: '/road-map',
	},
]

export const Navbar = () => {
	// Tablet + mobile
	const isTablet = useIsBelow(991)
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
					<GlobalSearch className={s.search} isSticky={sticky} />
					<CategoriesDropdown isSticky={sticky} />
					<nav className={s.nav}>
						<NavLink className={s.nav_link} to='/'>
							Home
						</NavLink>
						<div className={s.sub_nav_trigger}>
							Shop <ArrowSVG className={s.svg} />
							<div className={s.sub_nav}>
								{Object.entries(shopNavList).map(([key, value]) => (
									<div className={s.nav_col} key={key}>
										<h6 className={s.nav_col_title}>{camelToStr(key)}</h6>
										<ul className={s.nav_list}>
											{value.map(({ title, route }, idx) => (
												<li className={s.nav_item} key={`${key}-${idx}`}>
													<NavLink className={s.nav_link} to={route}>
														{title}
													</NavLink>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
						<NavLink className={s.nav_link} to={`/blog?${import.meta.env.VITE_BLOG_DEFAULT_QUERY}`}>
							Blog
						</NavLink>
						<div className={s.sub_nav_trigger}>
							Pages <ArrowSVG className={s.svg} />
							<div className={cn(s.sub_nav, s.single_col)}>
								<ul className={s.nav_list}>
									{pagesNavList.map(({ title, route }, idx) => (
										<li className={s.nav_item} key={`pages-${idx}`}>
											<NavLink className={s.nav_link} to={route}>
												{title}
											</NavLink>
										</li>
									))}
								</ul>
							</div>
						</div>
						<NavLink className={s.nav_link} to='/contact-us'>
							Contact us
						</NavLink>
					</nav>
					{!isTablet && <SupportBadge />}
				</div>
			</div>
		</div>
	)
}
