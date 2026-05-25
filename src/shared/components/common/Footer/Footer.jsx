import { NavLink, useLocation } from 'react-router-dom'

import { Subscribe } from '@shared/components/Subscribe/Subscribe'
import { Badge } from '@shared/components/UI/Badge/Badge'

import { Border } from '../../UI/Spacing/Border'
import { Space } from '../../UI/Spacing/Space'

import logo from '@assets/images/logo.png'

import s from './footer.module.scss'

const shoppingToolsList = [
	{
		text: 'Brands',
		link: '/brands',
	},
	{
		text: 'Gift Cards',
		link: '/',
		badge: 'Coming soon',
	},
	{
		text: 'Affiliate',
		link: '/',
		badge: 'Coming soon',
	},
	{
		text: 'Specials',
		link: '/',
		badge: 'Coming soon',
	},
	{
		text: 'Returns',
		link: '/',
		badge: 'Coming soon',
	},
	{
		text: 'Order History',
		link: '/',
		badge: 'Coming soon',
	},
]

const informationList = [
	{
		text: 'About us',
		link: '/about-us',
	},
	{
		text: 'Delivery',
		link: '/',
		badge: 'Coming soon',
	},
	{
		text: 'Privacy Policy',
		link: '/privacy-policy',
	},
	{
		text: 'Terms & Conditions',
		link: '/terms-conditions',
	},
	{
		text: 'Frequently Questions',
		link: '/faq',
	},
	{
		text: 'Contact us',
		link: '/contact-us',
	},
	{
		text: 'Site map',
		link: '/site-map',
	},
	{
		text: 'Road map',
		link: '/road-map',
	},
]

const contactsList = [
	{
		type: 'address',
		label: 'Address',
		text: 'Saint Petersburg, Russia, 191040',
		href: 'https://goo.gl/maps/STZQGHm5kxchbajm8',
	},
	{
		type: 'email',
		label: 'Email',
		text: 'foodstore@ecommerce.com',
		href: 'mailto:foodstore@ecommerce.com',
	},
	{
		type: 'phone',
		label: 'Call us',
		text: '(921) 34 777 999',
		href: 'tel:781234777999',
	},
]

export const Footer = () => {
	const location = useLocation()
	const isPageWithoutBorder = location.pathname.slice(1) === 'blank-page' || location.pathname === '/'

	return (
		<div className='container'>
			{!isPageWithoutBorder && <Border className={s.border} />}
			<footer className={s.footer}>
				<div className={s.meta}>
					<NavLink className={s.logo_link} to='/'>
						<img src={logo} alt='Safira logo' />
					</NavLink>
					<div className={s.description}>
						We are a team of developers and designers that create high quality and flexible projects with variety stack
						technology.
					</div>
					<ul className={s.contacts}>
						{contactsList.map((item) =>
							item.type === 'address' ? (
								<li className={s.contact} key={item.type}>
									<strong className={s.label}>{item.label}:</strong>
									<a className={s.contact_link} target='_blank' rel='noreferrer' href={item.href}>
										{item.text}
									</a>
								</li>
							) : (
								<li className={s.contact} key={item.type}>
									<strong className={s.label}>{item.label}:</strong>
									<a className={s.contact_link} href={item.href}>
										{item.text}
									</a>
								</li>
							),
						)}
					</ul>
				</div>
				<div className={s.links_column}>
					<h3 className={s.title}>Shopping tools</h3>
					<div className={s.list}>
						{shoppingToolsList.map((item, index) => (
							<div className={s.item} key={index}>
								<NavLink className={s.link} to={item.link}>
									{item.text}
								</NavLink>
								{item.badge && <Badge text={item.badge} />}
							</div>
						))}
					</div>
				</div>
				<div className={s.links_column}>
					<h3 className={s.title}>Information</h3>
					<div className={s.list}>
						{informationList.map((item, index) => (
							<div className={s.item} key={index}>
								<NavLink className={s.link} to={item.link}>
									{item.text}
								</NavLink>
								{item.badge && <Badge text={item.badge} />}
							</div>
						))}
					</div>
				</div>
				<Subscribe />
			</footer>
			<Space size='md' />
		</div>
	)
}
