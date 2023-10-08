import React from 'react'
import { NavLink } from 'react-router-dom'
import { DefaultLayout } from '../../../layouts/DefaultLayout/DefaultLayout'
import { Border } from '../../UI/Spacing/Border'
import { Space } from '../../UI/Spacing/Space'
import { Button } from '../../UI/Buttons/Button/Button'
import { Text } from '../../UI/Text/Text'
import logo from '../../../../assets/images/logo.png'
import s from './footer.module.scss'

export const Footer = () => {
	return (
		<DefaultLayout>
			<Border />
			<Space space={70} />
			<div className='container'>
				<div className={s.footer}>
					<div className={s.meta}>
						<NavLink to='/'>
							<img className={s.img} src={logo} alt='' />
						</NavLink>
						<div>
							We are a team of designers and developers that create high quality eCommerce with MERN stack technology.
						</div>
						<div className={s.address}>
							Address:
							<a target='_blank' rel='noreferrer' href='https://goo.gl/maps/STZQGHm5kxchbajm8'>
								Saint Petersburg, Russia, 191040
							</a>
						</div>
						<div className={s.email}>
							Email:
							<a href='mailto:foodstore@eccomrce.com'>foodstore@eccomrce.com</a>
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
						</div>
					</div>
					<div className={s.extra}>
						<h3 className={s.title}>Extras</h3>
						<div className={s.list}>
							<NavLink to='/'>Order History</NavLink>
							<NavLink to='/'>Gift Cards</NavLink>
							<NavLink to='/'>Specials</NavLink>
							<NavLink to='/'>Site map</NavLink>
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
				</div>
			</div>
			<Space space={65} />
		</DefaultLayout>
	)
}
