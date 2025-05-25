import cn from 'classnames'

import { useAuthContext } from '@context/AuthContext'

import LogoutSVG from '@assets/svg/logout.svg?react'

import s from './logout.module.scss'

export const Logout = ({ setIsPopoverShown, className }) => {
	const { logout } = useAuthContext()

	const handleClick = () => {
		setIsPopoverShown(false)
		logout()
	}

	return (
		<div className={cn(s.logout, className)} onClick={handleClick}>
			Logout
			<LogoutSVG className={s.icon} />
		</div>
	)
}
