import { Socials } from '@shared/components/UI/Socials/Socials'

import GithubSVG from '@assets/svg/socials/github.svg?react'
import TelegramSVG from '@assets/svg/socials/telegram.svg?react'
import VkSVG from '@assets/svg/socials/vk.svg?react'

import s from './blank-page-info.module.scss'

const socialsList = [
	{ icon: <GithubSVG />, url: 'https://github.com/alexhcj' },
	{ icon: <TelegramSVG />, url: 'https://t.me/alex_hcj' },
	{ icon: <VkSVG />, url: 'https://vk.com/alex_hcj' },
]

export const BlankPageInfo = () => {
	return (
		<section className={s.section}>
			<div className='container'>
				<div className={s.page}>
					<h1 className={s.title}>This is the fake blank page</h1>
					<p className={s.text}>Thanks for visiting!</p>
					<h2 className={s.hello}>
						Hi! I&apos;m <span>Alex</span> and I&apos;m <span>Fullstack developer</span>.
					</h2>
					<p className={s.description}>
						Focused on: e-commerce, CMS and CRM platforms, services of varying complexity, blogs and landing pages.
					</p>
					<p className={s.contact}>You could contact me or watch my code by the links below.</p>
					<Socials socials={socialsList} width={30} height={30} className={s.socials} />
				</div>
			</div>
		</section>
	)
}
