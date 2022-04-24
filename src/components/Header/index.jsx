import { NavLink } from 'react-router-dom'
import { TwitterSVG, GooglePlusSVG, YoutubeSVG, FacebookSVG, InstagramSVG, CartSVG, HeartSVG } from '../svg'
import { MetaPopup } from '../UI'
import { Navbar } from '../Navbar'
import logo from '../../assets/images/logo.png'
import s from './header.module.css'
import { useEffect, useState } from 'react'
import {Button} from "../UI/Buttons/Button/Button";

const languages = [
	{ id: 1, text: 'Russian' },
	{ id: 2, text: 'English' },
	{ id: 3, text: 'Deutch' },
]

const currencies = [
	{ id: 1, text: '₽ Ruble' },
	{ id: 2, text: '$ US Dollar' },
	{ id: 3, text: '€ Euro' },
]

// const languages = [
// 	{ id: 1, language: 'Russian', code: 'ru' },
// 	{ id: 2, language: 'English', code: 'en' },
// 	{ id: 3, language: 'Deutch', code: 'deu' },
// ]

// const currencies = [
// 	{ id: 1, currency: 'Ruble', symbol: '₽' },
// 	{ id: 2, currency: 'US Dollar', symbol: '$' },
// 	{ id: 3, currency: 'Euro', symbol: '€' },
// ]

const account = {
	wishlist: 6,
	cart: 4,
}

export const Header = () => {
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
		<div className={`${s.navbar} ${sticky ? `${s.padding}` : ''} `}>
			<span className={s.navbar__border}></span>
			<div className={s.top}>
				<div className='container'>
					<div className={s.navbar__top}>
						<div className={s.meta}>
							<MetaPopup text='Language' data={languages} />
							<span className={s.meta__divider}>|</span>
							<MetaPopup text='Currency' data={currencies} />
						</div>
						<div className={s.social}>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<TwitterSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<GooglePlusSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<YoutubeSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<FacebookSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<InstagramSVG />
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className={s.navbar__center}>
				<div className='container'>
					<div className={s.center}>
						<NavLink to='/'>
							<img src={logo} alt='' />
						</NavLink>
						<div className={s.search}>
							<form action=''>
								<div className={s.input}>
									<input type='text' placeholder='Search here...' />
									<Button type='search' />
								</div>
							</form>
						</div>
						<div className={s.account}>
							<div className={s.auth}>
								<NavLink to='/' className={s.auth__link}>
									Register
								</NavLink>
								<span className={s.auth__divider}>/</span>
								<NavLink to='/' className={s.auth__link}>
									Login
								</NavLink>
							</div>
							<NavLink to='/' className={s.account__link}>
								<HeartSVG width={25} height={25} />
								<span className={s.count}>{account.wishlist}</span>
							</NavLink>
							<NavLink to='/' className={s.account__link}>
								<CartSVG width={26} height={26} />
								<span className={s.count}>{account.cart}</span>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			<Navbar />
		</div>
	)
}

// TODO: add login & register logic
// TODO: add search logic
// TODO: add language & currency logic
// TODO: add wishlist & cart logic
// TODO: add real social accounts
