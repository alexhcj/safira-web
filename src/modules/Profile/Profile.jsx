import { useAuthContext } from '../../context/AuthContext'
import { Socials } from '../../shared/components/UI/Socials/Socials'
import { ReactComponent as VkSVG } from '../../assets/svg/socials/vk.svg'
import { ReactComponent as TelegramSVG } from '../../assets/svg/socials/telegram.svg'
import { ReactComponent as GithubSVG } from '../../assets/svg/socials/github.svg'
import s from './profile.module.scss'

const socialsList = [
	{ icon: <GithubSVG />, url: 'https://github.com/alexhcj' },
	{ icon: <TelegramSVG />, url: 'https://t.me/alex_hcj' },
	{ icon: <VkSVG />, url: 'https://vk.com/alex_hcj' },
]

export const Profile = () => {
	const {
		user: { id, accessToken },
	} = useAuthContext()

	return (
		<div className={s.profile}>
			<h1>Profile</h1>
			<Socials socials={socialsList} />
			<div className={s.id}>
				User id: <span>{id}</span>
			</div>
			<div className={s.token}>
				User accessToken: <span>{accessToken}</span>
			</div>
		</div>
	)
}
