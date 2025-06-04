import { NavLink } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { Logout } from '@shared/components/UI/Logout/Logout'

import s from './profile-popover-menu.module.scss'

const profileNavList = [{ text: 'Profile', url: '/profile' }]

export const ProfilePopoverMenu = ({ setIsPopoverShown }) => {
	const { logout } = useAuthContext()

	const handleLogout = () => {
		setIsPopoverShown(false)
		logout()
	}

	return (
		<div className={s.profile}>
			<ul>
				{profileNavList.map((item, index) => (
					<li key={index}>
						<NavLink className={s.link} to={'/profile'}>
							Profile
						</NavLink>
					</li>
				))}
			</ul>
			<Logout onClick={handleLogout} />
		</div>
	)
}
