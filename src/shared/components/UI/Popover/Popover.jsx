import cn from 'classnames'
import s from './popover.module.scss'

export const Popover = ({ isOpen, children }) => {
	return <div className={cn(s.popover, { [s.active]: isOpen })}>{children}</div>
}
