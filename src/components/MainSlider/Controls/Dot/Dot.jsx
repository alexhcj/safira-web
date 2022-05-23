import React from 'react'
import cn from 'classnames'
import s from './dot.module.scss'

export const Dot = ({ onClick, active }) => {
	return <button className={cn(s.btn, active && s.active)} onClick={() => onClick()}></button>
}

// TODO: change control btn size to 14px
