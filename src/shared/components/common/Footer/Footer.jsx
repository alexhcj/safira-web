import { NavLink, useLocation } from 'react-router-dom'

import { Button } from '../../UI/Buttons/Button/Button'
import { Border } from '../../UI/Spacing/Border'
import { Space } from '../../UI/Spacing/Space'
import { Text } from '../../UI/Text/Text'

import logo from '@assets/images/logo.png'

import s from './footer.module.scss'

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
						<a href='tel:792134777999'>(921) 34 777 999</a>
					</div>
				</div>
				<div className={s.info}>
					<h3 className={s.title}>Information</h3>
					<div className={s.list}>
						<NavLink to='/'>About us</NavLink>
						<NavLink to='/'>Delivery Information</NavLink>
						<NavLink to='/'>Privacy Policy</NavLink>
						<NavLink to='/'>Terms & Conditions</NavLink>
						<NavLink to='/'>Contact us</NavLink>
						<NavLink to='/'>Site map</NavLink>
					</div>
				</div>
				<div className={s.extra}>
					<h3 className={s.title}>Extras</h3>
					<div className={s.list}>
						<NavLink to='/brands'>Brands</NavLink>
						<NavLink to='/'>Gift Cards</NavLink>
						<NavLink to='/'>Affiliate</NavLink>
						<NavLink to='/'>Specials</NavLink>
						<NavLink to='/'>Returns</NavLink>
						<NavLink to='/'>Order History</NavLink>
					</div>
				</div>
				<div className={s.newsletter}>
					<h3 className={s.title}>Sign Up Newsletter</h3>
					<p>Get updates by subscribe our weekly newsletter</p>
					<form action='src/shared/components/common/Footer/Footer.jsx'>
						<div className={s.input}>
							<input type='text' placeholder='Enter your email' />
							<Button type='subscribe'>
								<Text span color='white'>
									Subscribe
								</Text>
							</Button>
						</div>
					</form>
				</div>
			</footer>
			<Space space={64} />
		</div>
	)
}
