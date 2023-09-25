import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../../../context/AuthContext'
import { useWishlistContext } from '../../../../context/WishlistContext'
import { useCartContext } from '../../../../context/CartContext'
import { Navbar } from '../Navbar/Navbar'
import { Button } from '../../UI/Buttons/Button/Button'
import { MetaPopup } from '../../UI/MetaPopup/MetaPopup'
import { throttle } from '../../../../utils'
import logo from '../../../../assets/images/logo.png'
import { ReactComponent as CartSVG } from '../../../../assets/svg/cart.svg'
import { ReactComponent as HeartSVG } from '../../../../assets/svg/heart.svg'
import { ReactComponent as InstagramSVG } from '../../../../assets/svg/instagram.svg'
import { ReactComponent as FacebookSVG } from '../../../../assets/svg/facebook.svg'
import { ReactComponent as YoutubeSVG } from '../../../../assets/svg/youtube.svg'
import { ReactComponent as GooglePlusSVG } from '../../../../assets/svg/google-plus.svg'
import { ReactComponent as TwitterSVG } from '../../../../assets/svg/twitter.svg'
import { ReactComponent as ProfileSVG } from '../../../../assets/svg/profile.svg'
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
	const [sticky, setSticky] = useState(false)
	const { user } = useAuthContext()
	const { wishlist } = useWishlistContext()
	const { cart } = useCartContext()

	const fixNavbarToTop = () => {
		if (window.scrollY >= 150) {
			setSticky(true)
		} else {
			setSticky(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', throttle(fixNavbarToTop, 100))

		return () => {
			window.removeEventListener('scroll', throttle(fixNavbarToTop, 100))
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
						{/* TODO: replace a with Link && refactor to map => ... */}
						<div className={s.social}>
							<a className={s.social__link} href='/src/pages' target='_blank' rel='noopener noreferrer'>
								<TwitterSVG />
							</a>
							<a className={s.social__link} href='/src/pages' target='_blank' rel='noopener noreferrer'>
								<GooglePlusSVG />
							</a>
							<a className={s.social__link} href='/src/pages' target='_blank' rel='noopener noreferrer'>
								<YoutubeSVG />
							</a>
							<a className={s.social__link} href='/src/pages' target='_blank' rel='noopener noreferrer'>
								<FacebookSVG />
							</a>
							<a className={s.social__link} href='/src/pages' target='_blank' rel='noopener noreferrer'>
								<InstagramSVG />
							</a>
						</div>
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
							<form action='src/shared/components/common/Header/Header.jsx'>
								<div className={s.input}>
									<input type='text' placeholder='Search here...' />
									<Button type='search' />
								</div>
							</form>
						</div>
						<div className={s.account}>
							{user ? (
								<NavLink to='/profile' className={s.account__link}>
									<ProfileSVG />
								</NavLink>
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
							<NavLink to='/wishlist' className={s.account__link}>
								<HeartSVG />
								<span className={s.count}>{wishlist.length}</span>
							</NavLink>
							<NavLink to='/cart' className={s.account__link}>
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
