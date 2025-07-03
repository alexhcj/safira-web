import cn from 'classnames'

import s from './block-note.module.scss'

export const BlockNote = ({ children, className }) => {
	return <div className={cn(s.box, className)}>{children}</div>
}
