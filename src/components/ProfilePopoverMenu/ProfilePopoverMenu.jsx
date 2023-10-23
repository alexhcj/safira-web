import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logout } from '../../shared/components/UI/Logout/Logout'
import s from './profile-popover-menu.module.scss'

const profileNavList = [{ text: 'Profile', url: '/profile' }]

export const ProfilePopoverMenu = () => {
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
			<Logout />
		</div>
	)
}
