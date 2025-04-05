import cn from 'classnames'
import { ReactComponent as FileSVG } from '../../../assets/svg/file.svg'
import s from './user-actions.module.scss'

export const UserActions = ({ icon, message, actionMessage, onClick, className }) => {
	return (
		<div className={cn(s.action, className)}>
			{icon || <FileSVG className={s.icon} />}
			{message}
			<button className={s.btn} onClick={onClick} type='button'>
				{actionMessage}
			</button>
		</div>
	)
}
