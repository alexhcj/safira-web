import React, { useState } from 'react'

import cn from 'classnames'
import { Link } from 'react-router-dom'

import { useBurgerPopupContext } from '@context/BurgerPopupContext'

import { useAuth } from '@hooks/services/useAuth'
import { useIsBelow } from '@hooks/useIsBelow'

import { CompareBlock } from '@components/CompareBlock/CompareBlock'

import { BurgerModal } from '@shared/components/Modal/BurgerModal'
import { MetaPopup } from '@shared/components/UI/MetaPopup/MetaPopup'
import { Socials } from '@shared/components/UI/Socials/Socials'
import { SupportBadge } from '@shared/components/UI/SupportBadge/SupportBadge'

import ArrowSVG from '@assets/svg/arrow.svg?react'
import EmailSVG from '@assets/svg/envelope.svg?react'
import GooglePlusSVG from '@assets/svg/google-plus.svg?react'
import FacebookSVG from '@assets/svg/socials/facebook.svg?react'
import InstagramSVG from '@assets/svg/socials/instagram.svg?react'
import TwitterSVG from '@assets/svg/socials/twitter.svg?react'
import YoutubeSVG from '@assets/svg/socials/youtube.svg?react'

import s from './burger-popup.module.scss'

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

const accountNavMap = {
	authed: [
		{
			title: 'Profile',
			route: '/profile',
		},
		{
			title: 'Orders',
			route: '/orders',
		},
		{
			title: 'Subscriptions',
			route: '/subscriptions',
		},
	],
	notAuthed: [
		{
			title: 'Login',
			route: '/login',
		},
		{
			title: 'Register',
			route: '/register',
		},
	],
}

const navMap = {
	home: '/',
	shop: {
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
	},
	blog: `/blog?${import.meta.env.VITE_BLOG_DEFAULT_QUERY}`,
	pages: [
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
	],
	account: null, // position marker — resolved via accountNavMap at render time
	contactUs: '/contact-us',
}

function CollapsibleGroup({ title, links, activeKey, setActiveKey, groupKey, onNavigate }) {
	const open = activeKey === groupKey

	const handleToggle = () => {
		setActiveKey(open ? null : groupKey)
	}

	return (
		<>
			<button className={s.link} onClick={handleToggle} aria-expanded={open}>
				{title}
				<ArrowSVG className={cn(s.svg, open && s.open)} />
			</button>
			<ul className={cn(s.nested_list, open && s.open)}>
				{links.map((link) => (
					<li key={link.route}>
						<Link className={s.link} to={link.route} onClick={onNavigate}>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

// Shop has nested groups, handled inline
function ShopGroup({ activeKey, setActiveKey, onNavigate }) {
	const open = activeKey === 'shop'
	const [nestedActiveKey, setNestedActiveKey] = useState(null)

	const handleToggle = () => {
		if (open) {
			setNestedActiveKey(null) // reset nested on close
			setActiveKey(null)
		} else {
			setActiveKey('shop')
		}
	}

	return (
		<>
			<button className={s.link} onClick={handleToggle} aria-expanded={open}>
				Shop
				<ArrowSVG className={cn(s.svg, open && s.open)} />
			</button>
			<ul className={cn(s.nested_list, open && s.open)}>
				<li>
					<CollapsibleGroup
						title='Browse'
						links={navMap.shop.browse}
						groupKey='browse'
						activeKey={nestedActiveKey}
						setActiveKey={setNestedActiveKey}
						onNavigate={onNavigate}
					/>
				</li>
				<li>
					<CollapsibleGroup
						title='Quick Access'
						links={navMap.shop.quickAccess}
						groupKey='quickAccess'
						activeKey={nestedActiveKey}
						setActiveKey={setNestedActiveKey}
						onNavigate={onNavigate}
					/>
				</li>
			</ul>
		</>
	)
}

export const BurgerPopup = () => {
	const isMobileM = useIsBelow(375)
	const isMobile = useIsBelow(576)
	const { user } = useAuth()
	const { isOpen, setIsOpen } = useBurgerPopupContext()
	const [activeKey, setActiveKey] = useState(null)

	const accountLinks = user ? accountNavMap.authed : accountNavMap.notAuthed

	const handleOnNavigate = () => {
		setActiveKey(null)
		setIsOpen(false)
	}

	return (
		<BurgerModal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className={s.box}>
				<div className={s.meta}>
					<MetaPopup text='Language' data={languages} />
					<span className={s.meta_divider}>|</span>
					<MetaPopup text='Currency' data={currencies} />
				</div>
				<Socials className={s.socials} socials={socialsList} />
				<SupportBadge className={s.badge} />
				{isMobileM && <CompareBlock />}
			</div>
			<nav>
				<ul className={s.list}>
					<li>
						<Link className={s.link} to={navMap.home} onClick={handleOnNavigate}>
							Home
						</Link>
					</li>
					<li>
						<ShopGroup activeKey={activeKey} setActiveKey={setActiveKey} onNavigate={handleOnNavigate} />
					</li>
					<li>
						<Link className={s.link} to={navMap.blog} onClick={handleOnNavigate}>
							Blog
						</Link>
					</li>
					<li>
						<CollapsibleGroup
							title='Pages'
							links={navMap.pages}
							groupKey='pages'
							activeKey={activeKey}
							setActiveKey={setActiveKey}
							onNavigate={handleOnNavigate}
						/>
					</li>
					{isMobile && (
						<li>
							<CollapsibleGroup
								title='Account'
								links={accountLinks}
								groupKey='account'
								activeKey={activeKey}
								setActiveKey={setActiveKey}
								onNavigate={handleOnNavigate}
							/>
						</li>
					)}
					<li>
						<Link className={s.link} to={navMap.contactUs} onClick={handleOnNavigate}>
							Contact Us
						</Link>
					</li>
				</ul>
			</nav>
			<a className={s.email} target='_blank' rel='noreferrer' href='mailto:foodstore@ecommerce.com'>
				<EmailSVG className={s.icon} />
				foodstore@ecommerce.com
			</a>
		</BurgerModal>
	)
}
