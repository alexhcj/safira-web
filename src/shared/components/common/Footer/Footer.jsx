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
]

export const Footer = () => {
	const location = useLocation()
	const isBlankPage = location.pathname.slice(1) === 'blank-page'

	return (
		<div className='container'>
			{!isBlankPage && <Border />}
			<Space space={70} />
			<footer className={s.footer}>
				<div className={s.meta}>
					<NavLink to='/'>
						<img className={s.img} src={logo} alt='' />
					</NavLink>
					<div>
						We are a team of developers and designers that create high quality and flexible projects with variety stack
						technology.
					</div>
					<div className={s.address}>
						Address:
						<a target='_blank' rel='noreferrer' href='https://goo.gl/maps/STZQGHm5kxchbajm8'>
							Saint Petersburg, Russia, 191040
						</a>
					</div>
					<div className={s.email}>
						Email:
						<a href='mailto:foodstore@ecommerce.com'>foodstore@ecommerce.com</a>
					</div>
					<div className={s.phone}>
						Call us:
						<a href='tel:781234777999'>(812) 34 777 999</a>
					</div>
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
			<Space space={64} />
		</div>
	)
}
