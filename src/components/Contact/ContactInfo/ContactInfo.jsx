import cn from 'classnames'

import EmailSVG from '@assets/svg/email.svg?react'
import MapSVG from '@assets/svg/map.svg?react'
import PhoneSVG from '@assets/svg/phone.svg?react'

import s from './contact-info.module.scss'

const contacts = [
	{
		icon: <MapSVG className={s.icon} />,
		alt: 'Local address',
		text: 'Saint Petersburg, Russia, 191040',
		link: 'https://goo.gl/maps/STZQGHm5kxchbajm8',
	},
	{
		icon: <EmailSVG className={s.icon} />,
		alt: 'Email address',
		text: 'foodstore@ecommerce.com',
		link: 'mailto:foodstore@ecommerce.com',
	},
	{
		icon: <PhoneSVG className={cn(s.icon, s.phone_icon)} />,
		alt: 'Phone number',
		text: '(812) 34 777 999',
		link: 'tel:781234777999',
	},
]

export const ContactInfo = () => {
	return (
		<div>
			<h3 className={s.title}>Contact us</h3>
			<p className={s.description}>
				We are a team of developers and designers that create high quality and flexible projects with variety stack
				technology.
			</p>
			<ul className={s.list}>
				{contacts.map((item, index) => (
					<li className={s.item} key={index}>
						{item.icon}
						<a className={s.link} target='_blank' rel='noreferrer' href={item.link}>
							{item.text}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}
