import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { ReactComponent as LogoutSVG } from '../../assets/svg/logout.svg'
import s from './profile-popover-menu.module.scss'

const profileNavList = [{ text: 'Profile', url: '/profile' }]

export const ProfilePopoverMenu = () => {
	const { logout } = useAuthContext()

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
			<div className={s.logout} onClick={() => logout()}>
				Logout
				<LogoutSVG className={s.icon} />
			</div>
		</div>
	)
}
