import cn from 'classnames'

import ListSVG from '@assets/svg/list.svg?react'

import s from './button-sidebar.module.scss'

// TODO: (refactor) unite with ButtonScroll (similar buttons), make editable
export const ButtonSidebar = ({ onClick, className }) => {
	return (
		<button className={cn(s.btn, className)} onClick={onClick}>
			<ListSVG className={s.svg} />
		</button>
	)
}
