import cn from 'classnames'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { useAuthActionsContext } from '@context/AuthContext'

import { OrderHistory } from '@modules/Account/OrderHistory/OrderHistory'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Logout } from '@shared/components/UI/Logout/Logout'
import { Border } from '@shared/components/UI/Spacing/Border'

import { ProfileDetails } from './ProfileDetails/ProfileDetails'
import { Subscriptions } from './Subscriptions/Subscriptions'

import s from './account.module.scss'

const profileNavList = [
	{ component: <ProfileDetails />, text: 'Profile details', url: 'profile-details' },
	{ component: <OrderHistory />, text: 'Order history', url: 'order-history' },
	{ component: <Subscriptions />, text: 'Subscriptions', url: 'subscriptions' },
]

export const Account = () => {
	const location = useLocation()
	const { logoutUser } = useAuthActionsContext()

	const handleLogout = () => {
		logoutUser()
	}

	return (
		<>
			<div className={s.layout}>
				<aside>
					<ul className={s.list}>
						{profileNavList.map((item, index) => {
							const currentTab =
								location.pathname === '/account' ? 'profile-details' : location.pathname.replace('/account/', '')

							return (
								<li key={index} data-section={item.url}>
									<Link className={s.link} to={item.url}>
										<Button type='form' className={cn(s.btn, { [s.active]: item.url === currentTab })}>
											{item.text}
										</Button>
									</Link>
								</li>
							)
						})}
					</ul>
					<Border className={s.border} />
					<Logout onClick={handleLogout} />
				</aside>
				<Outlet />
			</div>
		</>
	)
}
