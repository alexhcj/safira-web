import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import { camelToStr } from '@/utils'

import { useIsBelow } from '@hooks/useIsBelow'
import { useNavbarVisibility } from '@hooks/useNavbarVisibility'

import { GlobalSearch } from '@components/GlobalSearch/GlobalSearch'

import { SupportBadge } from '@shared/components/UI/SupportBadge/SupportBadge'
import { BREAKPOINTS } from '@shared/data/breakpoints'

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
	const location = useLocation()
	const isTablet = useIsBelow(BREAKPOINTS.tabletL)

	const EXCLUDED_STICKY_PATHS = ['/compare', '/categories', '/brands']
	const isStickyExcluded = EXCLUDED_STICKY_PATHS.includes(location.pathname)

	const { visible, sticky } = useNavbarVisibility({ threshold: 10, topOffset: 150, enabled: !isStickyExcluded })

	const hideOnScrollActive = isTablet && !isStickyExcluded

	return (
		<div
			id='navbar'
			className={`${s.navbar} ${sticky ? `${s.sticky}` : ''} `}
			style={{
				transform: hideOnScrollActive && !visible ? 'translateY(-100%)' : 'translateY(0)',
				transition: 'transform 0.25s ease',
			}}
		>
			<div className='container'>
				<div className={s.bottom}>
					<GlobalSearch className={s.search} isSticky={sticky} />
					<CategoriesDropdown isSticky={sticky} isVisible={visible} />
					<nav className={s.nav}>
						<NavLink className={({ isActive }) => cn(s.nav_link, { [s.active]: isActive })} to='/'>
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
													<NavLink className={({ isActive }) => cn(s.nav_link, { [s.active]: isActive })} to={route}>
														{title}
													</NavLink>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
						<NavLink
							className={({ isActive }) => cn(s.nav_link, { [s.active]: isActive })}
							to={`/blog?${import.meta.env.VITE_BLOG_DEFAULT_QUERY}`}
						>
							Blog
						</NavLink>
						<div className={s.sub_nav_trigger}>
							Pages <ArrowSVG className={s.svg} />
							<div className={cn(s.sub_nav, s.single_col)}>
								<ul className={s.nav_list}>
									{pagesNavList.map(({ title, route }, idx) => (
										<li className={s.nav_item} key={`pages-${idx}`}>
											<NavLink className={({ isActive }) => cn(s.nav_link, { [s.active]: isActive })} to={route}>
												{title}
											</NavLink>
										</li>
									))}
								</ul>
							</div>
						</div>
						<NavLink className={({ isActive }) => cn(s.nav_link, { [s.active]: isActive })} to='/contact-us'>
							Contact us
						</NavLink>
					</nav>
					{!isTablet && <SupportBadge />}
				</div>
			</div>
		</div>
	)
}
