import cn from 'classnames'

import { useAuthContext } from '@context/AuthContext'

import LogoutSVG from '@assets/svg/logout.svg?react'

import s from './logout.module.scss'

export const Logout = ({ className }) => {
	const { logout } = useAuthContext()

	return (
		<div className={cn(s.logout, className)} onClick={() => logout()}>
			Logout
			<LogoutSVG className={s.icon} />
		</div>
	)
}
