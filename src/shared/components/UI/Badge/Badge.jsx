import cn from 'classnames'

import s from './badge.module.scss'

export const Badge = ({ text, className }) => {
	return <div className={cn(s.badge, className)}>{text}</div>
}
