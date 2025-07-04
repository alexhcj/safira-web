import cn from 'classnames'

import s from './block-note.module.scss'

export const BlockNote = ({ type, children, className }) => {
	return <div className={cn(s.note, s[`note_${type}`], className)}>{children}</div>
}
