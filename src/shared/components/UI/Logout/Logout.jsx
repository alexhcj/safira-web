import cn from 'classnames'

import LogoutSVG from '@assets/svg/logout.svg?react'

import s from './logout.module.scss'

export const Logout = ({ onClick, className }) => {
	return (
		<div className={cn(s.logout, className)} onClick={onClick}>
			Logout
			<LogoutSVG className={s.icon} />
		</div>
	)
}
