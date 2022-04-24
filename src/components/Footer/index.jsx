import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import {Button} from "../UI/Buttons/Button/Button";
import s from './footer.module.css'
import {Text} from "../../shared/components/UI/Text/Text";

export const Footer = () => {
	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.footer}>
					<div className={s.meta}>
						<NavLink to='/'>
							<img className={s.img} src={logo} alt='' />
						</NavLink>
						<div className={s.desc}>
							We are a team of designers and developers that create high quality eCommerce with MERN stack
							technology .
						</div>
						<div className={s.adress}>
							Adress:
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
							<NavLink to='/'>Grift Cards</NavLink>
							<NavLink to='/'>Specials</NavLink>
							<NavLink to='/'>Site map</NavLink>
						</div>
					</div>
					<div className={s.newsletter}>
						<h3 className={s.title}>Sign Up Newsletter</h3>
						<p>Get updates by subscribe our weekly newsletter</p>
						<form action='' className={s.form}>
							<div className={s.input}>
								<input type='text' placeholder='Enter your email' />
								<Button type='subscribe'>
									<Text span color="white">Subscribe</Text>
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
