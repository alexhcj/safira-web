import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import { useAuthStateContext } from '@context/AuthContext'
import { useBurgerPopupContext } from '@context/BurgerPopupContext'
import { useCartContext } from '@context/CartContext'
import { useCartPopupContext } from '@context/CartPopupContext'
import { useCompareContext } from '@context/CompareContext'
import { RecentSearchProvider } from '@context/RecentSearchContext'
import { useWishlistContext } from '@context/WishlistContext'

import { useIsBelow } from '@hooks/useIsBelow'

import { GlobalSearch } from '@components/GlobalSearch/GlobalSearch'
import { AccountPopoverMenu } from '@components/ProfilePopoverMenu/AccountPopoverMenu'

import { Burger } from '@shared/components/UI/Burger/Burger'
import { CURRENCY_LIST } from '@shared/data/currency'
import { LANGUAGE_LIST } from '@shared/data/languages'

import { MetaPopup } from '../../UI/MetaPopup/MetaPopup'
import { Popover } from '../../UI/Popover/Popover'
import { Socials } from '../../UI/Socials/Socials'
import { Navbar } from '../Navbar/Navbar'

import logo from '@assets/images/logo.png'
import CartSVG from '@assets/svg/cart.svg?react'
import CompareSVG from '@assets/svg/compare.svg?react'
import GooglePlusSVG from '@assets/svg/google-plus.svg?react'
import HeartSVG from '@assets/svg/heart.svg?react'
import ProfileSVG from '@assets/svg/profile.svg?react'
import FacebookSVG from '@assets/svg/socials/facebook.svg?react'
import InstagramSVG from '@assets/svg/socials/instagram.svg?react'
import TwitterSVG from '@assets/svg/socials/twitter.svg?react'
import YoutubeSVG from '@assets/svg/socials/youtube.svg?react'

import s from './header.module.scss'

const socialsList = [
	{ icon: <TwitterSVG />, url: '/blank-page' },
	{ icon: <GooglePlusSVG />, url: '/blank-page' },
	{ icon: <YoutubeSVG />, url: '/blank-page' },
	{ icon: <FacebookSVG />, url: '/blank-page' },
	{ icon: <InstagramSVG />, url: '/blank-page' },
]

export const Header = () => {
	// Tablet + mobile
	const isTablet = useIsBelow(991)
	const isMobileM = useIsBelow(375)
	const location = useLocation()
	const { isOpen: isBurgerOpen, setIsOpen: setIsBurgerOpen } = useBurgerPopupContext()
	const { setIsOpen } = useCartPopupContext()
	const [sticky, setSticky] = useState(false)
	const [isPopoverShown, setIsPopoverShown] = useState(false)
	const { isAuthenticated } = useAuthStateContext()
	const { wishlist } = useWishlistContext()
	const { cart } = useCartContext()
	const { calcTotalCompareItems } = useCompareContext()

	const fixNavbarToTop = () => {
		setSticky(window.scrollY >= 150)
	}

	const handlePopoverShow = (e) => {
		e.type === 'mouseenter' ? setIsPopoverShown(true) : setIsPopoverShown(false)
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

	useEffect(() => {
		setSticky(false)
	}, [location.pathname])

	const handleBurgerToggle = () => {
		setIsBurgerOpen(!isBurgerOpen)
	}

	return (
		<RecentSearchProvider>
			<div className={`${s.navbar}`}>
				<span className={s.navbar__border}></span>
				<div className={s.top}>
					<div className='container'>
						<div className={s.navbar__top}>
							<div className={s.meta}>
								<MetaPopup text='Language' data={LANGUAGE_LIST} getLabel={(item) => item.language} />
								<span className={s.meta__divider}>|</span>
								<MetaPopup
									text='Currency'
									data={CURRENCY_LIST}
									getLabel={(item) => `${item.currency} (${item.symbol})`}
								/>
							</div>
							<Socials socials={socialsList} />
						</div>
					</div>
				</div>
				<div className={`${s.navbar__center} ${sticky ? `${s.padding}` : ''} `}>
					<div className='container'>
						<div className={s.center}>
							<NavLink className={s.logo_link} to='/'>
								<img className={s.logo} src={logo} alt='' />
							</NavLink>
							{!isTablet && <GlobalSearch className={s.search} />}
							<div className={s.account}>
								{isAuthenticated ? (
									<div className={s.profile_nav} onMouseEnter={handlePopoverShow} onMouseLeave={handlePopoverShow}>
										<NavLink
											to='/account'
											className={cn(s.account_link, location.pathname.slice(1) === 'account' && s.active)}
										>
											<ProfileSVG />
										</NavLink>
										<Popover isOpen={isPopoverShown}>
											<AccountPopoverMenu setIsPopoverShown={setIsPopoverShown} />
										</Popover>
									</div>
								) : (
									<div className={s.auth}>
										<NavLink to='/register' className={s.auth__link}>
											Register
										</NavLink>
										<span className={s.auth__divider}>/</span>
										<NavLink to='/login' state={{ from: location }} replace className={s.auth__link}>
											Login
										</NavLink>
									</div>
								)}
								{!isMobileM && (
									<NavLink
										to='/compare'
										className={cn(s.account_link, location.pathname.slice(1) === 'compare' && s.active)}
									>
										<CompareSVG className={cn(s.account_link_svg, s.compare_link)} />
										<span className={s.count}>{calcTotalCompareItems()}</span>
									</NavLink>
								)}
								<NavLink
									to='/wishlist'
									className={cn(s.account_link, location.pathname.slice(1) === 'wishlist' && s.active)}
								>
									<HeartSVG className={s.account_link_svg} />
									<span className={s.count}>{wishlist.length}</span>
								</NavLink>
								<button
									type='button'
									className={cn(s.account_link, location.pathname.slice(1) === 'cart' && s.active)}
									onClick={() => setIsOpen(true)}
								>
									<CartSVG className={s.account_link_svg} />
									<span className={s.count}>{cart.length}</span>
								</button>
							</div>

							{isTablet && (
								<div className={s.burger}>
									<Burger onClick={handleBurgerToggle} />
								</div>
							)}
						</div>
					</div>
				</div>
				<Navbar />
			</div>
		</RecentSearchProvider>
	)
}
