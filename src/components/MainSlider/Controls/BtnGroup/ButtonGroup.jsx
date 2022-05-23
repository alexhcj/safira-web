import React from 'react'
import cn from 'classnames'
import { Arrow } from '../Arrow/Arrow'
import s from './btn-group.module.scss'

export const ButtonGroup = ({ next, previous, active }) => {
	return (
		<div className={cn(s.btn__group, active && s.active)}>
			<Arrow width={32} height={35} className={s.left} onClick={() => previous()} />
			<Arrow width={32} height={35} className={s.right} onClick={() => next()} />
		</div>
	)
}
