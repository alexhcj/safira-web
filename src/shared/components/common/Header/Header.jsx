import { useEffect, useState } from 'react'

import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'
import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { RecentSearchProvider } from '@context/RecentSearchContext'
import { useWishlistContext } from '@context/WishlistContext'

import { GlobalSearch } from '@components/GlobalSearch/GlobalSearch'
import { ProfilePopoverMenu } from '@components/ProfilePopoverMenu/ProfilePopoverMenu'

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

const languages = [
	{ id: 1, text: 'Russian' },
	{ id: 2, text: 'English' },
	{ id: 3, text: 'Deutsch' },
]

const currencies = [
	{ id: 1, text: '₽ Ruble' },
	{ id: 2, text: '$ US Dollar' },
	{ id: 3, text: '€ Euro' },
]

const socialsList = [
	{ icon: <TwitterSVG />, url: '/blank-page' },
	{ icon: <GooglePlusSVG />, url: '/blank-page' },
	{ icon: <YoutubeSVG />, url: '/blank-page' },
	{ icon: <FacebookSVG />, url: '/blank-page' },
	{ icon: <InstagramSVG />, url: '/blank-page' },
]

// const languages = [
// 	{ id: 1, language: 'Russian', code: 'ru' },
// 	{ id: 2, language: 'English', code: 'en' },
// 	{ id: 3, language: 'Deutsch', code: 'deu' },
// ]

// const currencies = [
// 	{ id: 1, currency: 'Ruble', symbol: '₽' },
// 	{ id: 2, currency: 'US Dollar', symbol: '$' },
// 	{ id: 3, currency: 'Euro', symbol: '€' },
// ]

export const Header = () => {
	const location = useLocation()
	const [sticky, setSticky] = useState(false)
	const [isPopoverShown, setIsPopoverShown] = useState(false)
	const { user } = useAuthContext()
	const { wishlist } = useWishlistContext()
	const { cart } = useCartContext()
	const { calcTotalCompareItems } = useCompareContext()

	const fixNavbarToTop = () => {
		if (window.scrollY >= 150) {
			setSticky(true)
		} else {
			setSticky(false)
		}
	}

	const handlePopoverShow = (e) => {
		e.type === 'mouseenter' ? setIsPopoverShown(true) : setIsPopoverShown(false)
	}

	useEffect(() => {
		window.addEventListener('scroll', fixNavbarToTop)

		return () => {
			window.removeEventListener('scroll', fixNavbarToTop)
		}
	}, [])

	return (
		<div className={`${s.navbar}`}>
			<span className={s.navbar__border}></span>
			<div className={s.top}>
				<div className='container'>
					<div className={s.navbar__top}>
						<div className={s.meta}>
							<MetaPopup text='Language' data={languages} />
							<span className={s.meta__divider}>|</span>
							<MetaPopup text='Currency' data={currencies} />
						</div>
						<Socials socials={socialsList} />
					</div>
				</div>
			</div>
			<div className={`${s.navbar__center} ${sticky ? `${s.padding}` : ''} `}>
				<div className='container'>
					<div className={s.center}>
						<NavLink to='/'>
							<img src={logo} alt='' />
						</NavLink>
						<div className={s.search}>
							<RecentSearchProvider>
								<GlobalSearch />
							</RecentSearchProvider>
						</div>
						<div className={s.account}>
							{user ? (
								<div className={s.profile_nav} onMouseEnter={handlePopoverShow} onMouseLeave={handlePopoverShow}>
									<NavLink
										to='/profile'
										className={cn(s.account_link, location.pathname.slice(1) === 'profile' && s.active)}
									>
										<ProfileSVG />
									</NavLink>
									<Popover isOpen={isPopoverShown}>
										<ProfilePopoverMenu />
									</Popover>
								</div>
							) : (
								<div className={s.auth}>
									<NavLink to='/register' className={s.auth__link}>
										Register
									</NavLink>
									<span className={s.auth__divider}>/</span>
									<NavLink to='/login' className={s.auth__link}>
										Login
									</NavLink>
								</div>
							)}
							<NavLink
								to='/compare'
								className={cn(s.account_link, location.pathname.slice(1) === 'compare' && s.active)}
							>
								<CompareSVG className={s.compare_link} />
								<span className={s.count}>{calcTotalCompareItems()}</span>
							</NavLink>
							<NavLink
								to='/wishlist'
								className={cn(s.account_link, location.pathname.slice(1) === 'wishlist' && s.active)}
							>
								<HeartSVG />
								<span className={s.count}>{wishlist.length}</span>
							</NavLink>
							<NavLink to='/cart' className={cn(s.account_link, location.pathname.slice(1) === 'cart' && s.active)}>
								<CartSVG />
								<span className={s.count}>{cart.length}</span>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			<Navbar />
		</div>
	)
}
