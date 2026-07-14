import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { Logout } from '@shared/components/UI/Logout/Logout'
import { Border } from '@shared/components/UI/Spacing/Border'

import s from './profile-popover-menu.module.scss'

const accountNavList = [
	{ text: 'Profile details', url: '/account/profile-details' },
	{ text: 'Order history', url: '/account/order-history' },
	{ text: 'Subscriptions', url: '/account/subscriptions' },
]

export const AccountPopoverMenu = ({ setIsPopoverShown }) => {
	const { logout } = useAuthContext()

	const handleLogout = () => {
		setIsPopoverShown(false)
		logout()
	}

	return (
		<>
			<ul className={s.list}>
				{accountNavList.map(({ url, text }, index) => (
					<li key={index}>
						<NavLink className={({ isActive }) => cn(s.link, { [s.active]: isActive })} to={url}>
							{text}
						</NavLink>
					</li>
				))}
			</ul>
			<Border className={s.border} />
			<Logout onClick={handleLogout} />
		</>
	)
}
