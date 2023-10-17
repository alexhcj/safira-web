import React from 'react'
import { useAuthContext } from '../../../../context/AuthContext'
import { ReactComponent as LogoutSVG } from '../../../../assets/svg/logout.svg'
import s from './logout.module.scss'

export const Logout = () => {
	const { logout } = useAuthContext()

	return (
		<div className={s.logout} onClick={() => logout()}>
			Logout
			<LogoutSVG className={s.icon} />
		</div>
	)
}
