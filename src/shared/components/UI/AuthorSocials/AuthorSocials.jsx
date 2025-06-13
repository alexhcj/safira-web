import { Link } from 'react-router-dom'

import GithubSVG from '@assets/svg/socials/github-cat.svg?react'
import MailSVG from '@assets/svg/socials/mail.svg?react'
import TelegramSVG from '@assets/svg/socials/telegram-color.svg?react'

import s from './author-socials.module.scss'

const socials = [
	{ icon: <TelegramSVG />, url: 'https://t.me/alex_hcj', text: '@alex_hcj' },
	{ icon: <MailSVG />, url: 'mailto:alexhcj@yandex.ru', text: 'alexhcj@yandex.ru' },
	{ icon: <GithubSVG />, url: 'https://github.com/alexhcj', text: 'github' },
]

export const AuthorSocials = () => {
	return (
		<ul className={s.socials}>
			{socials.map((social, index) => (
				<li className={s.item} key={index}>
					<Link className={s.link} to={social.url} target='_blank'>
						{social.icon}
						<span>{social.text}</span>
					</Link>
				</li>
			))}
		</ul>
	)
}
