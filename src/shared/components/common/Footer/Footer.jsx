import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import { Subscribe } from '@shared/components/Subscribe/Subscribe'
import { Badge } from '@shared/components/UI/Badge/Badge'
import { CONTACTS_NAVIGATION_ITEMS, INFORMATION_NAVIGATION_ITEMS, SHOPPING_NAVIGATION_ITEMS } from '@shared/data/footer'

import { Border } from '../../UI/Spacing/Border'
import { Space } from '../../UI/Spacing/Space'

import logo from '@assets/images/logo.png'

import s from './footer.module.scss'

export const Footer = () => {
	const location = useLocation()
	const isPageWithoutBorder = location.pathname.slice(1) === 'blank-page' || location.pathname === '/'

	return (
		<div className='container'>
			{!isPageWithoutBorder && <Border className={s.border} />}
			<footer className={s.footer} id='footer'>
				<div className={s.meta}>
					<NavLink className={s.logo_link} to='/'>
						<img src={logo} alt='Safira logo' />
					</NavLink>
					<div className={s.description}>
						We are a team of developers and designers that create high quality and flexible projects with variety stack
						technology.
					</div>
					<ul className={s.contacts}>
						{CONTACTS_NAVIGATION_ITEMS.map((item) =>
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
						{SHOPPING_NAVIGATION_ITEMS.map((item, index) => (
							<div className={s.item} key={index}>
								<NavLink className={({ isActive }) => cn(s.link, { [s.active]: isActive })} to={item.link}>
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
						{INFORMATION_NAVIGATION_ITEMS.map((item, index) => (
							<div className={s.item} key={index}>
								<NavLink className={({ isActive }) => cn(s.link, { [s.active]: isActive })} to={item.link}>
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
