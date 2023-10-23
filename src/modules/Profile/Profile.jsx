import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { ProfileDetails } from './ProfileDetails/ProfileDetails'
import { Orders } from './Orders/Orders'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Logout } from '../../shared/components/UI/Logout/Logout'
import s from './profile.module.scss'

const profileNavList = [
	{ component: <ProfileDetails />, text: 'Profile Details', url: 'profile-details' },
	{ component: <Orders />, text: 'Orders', url: 'orders' },
]

export const Profile = () => {
	const location = useLocation()

	return (
		<div className={s.profile}>
			<div className={s.layout}>
				<aside className={s.aside}>
					<ul className={s.list}>
						{profileNavList.map((item, index) => (
							<li key={index} data-section={item.url}>
								<Link className={s.link} to={item.url}>
									<Button
										type='form'
										className={cn(s.btn, { [s.active]: item.url === location.pathname.replace('/profile/', '') })}
									>
										{item.text}
									</Button>
								</Link>
							</li>
						))}
					</ul>
					<Logout />
				</aside>
				<Outlet />
			</div>
		</div>
	)
}
