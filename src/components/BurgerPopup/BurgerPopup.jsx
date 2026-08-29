import React, { useState } from 'react'

import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import { useAuthStateContext } from '@context/AuthContext'
import { useBurgerPopupContext } from '@context/BurgerPopupContext'

import { useIsBelow } from '@hooks/useIsBelow'

import { CompareBlock } from '@components/CompareBlock/CompareBlock'

import { BurgerModal } from '@shared/components/Modal/BurgerModal'
import { MetaPopup } from '@shared/components/UI/MetaPopup/MetaPopup'
import { Socials } from '@shared/components/UI/Socials/Socials'
import { SupportBadge } from '@shared/components/UI/SupportBadge/SupportBadge'
import { CURRENCY_LIST } from '@shared/data/currency'
import { LANGUAGE_LIST } from '@shared/data/languages'
import { ACCOUNT_NAVIGATION_ITEMS, STORE_NAVIGATION_ITEMS } from '@shared/data/store-navigation'

import ArrowSVG from '@assets/svg/arrow.svg?react'
import EmailSVG from '@assets/svg/envelope.svg?react'
import GooglePlusSVG from '@assets/svg/google-plus.svg?react'
import FacebookSVG from '@assets/svg/socials/facebook.svg?react'
import InstagramSVG from '@assets/svg/socials/instagram.svg?react'
import TwitterSVG from '@assets/svg/socials/twitter.svg?react'
import YoutubeSVG from '@assets/svg/socials/youtube.svg?react'

import s from './burger-popup.module.scss'

const socialsList = [
	{ icon: <TwitterSVG />, url: '/blank-page' },
	{ icon: <GooglePlusSVG />, url: '/blank-page' },
	{ icon: <YoutubeSVG />, url: '/blank-page' },
	{ icon: <FacebookSVG />, url: '/blank-page' },
	{ icon: <InstagramSVG />, url: '/blank-page' },
]

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
						<NavLink
							className={({ isActive }) => cn(s.link, { [s.active]: isActive })}
							to={link.route}
							onClick={onNavigate}
						>
							{link.title}
						</NavLink>
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
						links={STORE_NAVIGATION_ITEMS.shop.browse}
						groupKey='browse'
						activeKey={nestedActiveKey}
						setActiveKey={setNestedActiveKey}
						onNavigate={onNavigate}
					/>
				</li>
				<li>
					<CollapsibleGroup
						title='Quick Access'
						links={STORE_NAVIGATION_ITEMS.shop.quickAccess}
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
	const { isAuthenticated } = useAuthStateContext()
	const { isOpen, setIsOpen } = useBurgerPopupContext()
	const [activeKey, setActiveKey] = useState(null)

	const accountLinks = isAuthenticated ? ACCOUNT_NAVIGATION_ITEMS.authed : ACCOUNT_NAVIGATION_ITEMS.notAuthed

	const handleOnNavigate = () => {
		setActiveKey(null)
		setIsOpen(false)
	}

	return (
		<BurgerModal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className={s.box}>
				<div className={s.meta}>
					<MetaPopup text='Language' data={LANGUAGE_LIST} getLabel={(item) => item.language} />
					<span className={s.meta_divider}>|</span>
					<MetaPopup
						className={s.currency}
						text='Currency'
						data={CURRENCY_LIST}
						getLabel={(item) => `${item.currency} (${item.symbol})`}
					/>
				</div>
				<Socials className={s.socials} socials={socialsList} />
				<SupportBadge className={s.badge} />
				{isMobileM && <CompareBlock handlePopupClose={setIsOpen} />}
			</div>
			<nav>
				<ul className={s.list}>
					<li>
						<NavLink
							className={({ isActive }) => cn(s.link, { [s.active]: isActive })}
							to={STORE_NAVIGATION_ITEMS.home}
							onClick={handleOnNavigate}
						>
							Home
						</NavLink>
					</li>
					<li>
						<ShopGroup activeKey={activeKey} setActiveKey={setActiveKey} onNavigate={handleOnNavigate} />
					</li>
					<li>
						<NavLink
							className={({ isActive }) => cn(s.link, { [s.active]: isActive })}
							to={STORE_NAVIGATION_ITEMS.blog}
							onClick={handleOnNavigate}
						>
							Blog
						</NavLink>
					</li>
					<li>
						<CollapsibleGroup
							title='Pages'
							links={STORE_NAVIGATION_ITEMS.pages}
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
						<NavLink
							className={({ isActive }) => cn(s.link, { [s.active]: isActive })}
							to={STORE_NAVIGATION_ITEMS.contactUs}
							onClick={handleOnNavigate}
						>
							Contact Us
						</NavLink>
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
