import React from 'react'
import classNames from 'classnames/bind'
import s from './dot.module.scss'

let cx = classNames.bind(s)

export const Dot = ({ onClick, active }) => {
	let btn = cx('btn', { active: active })

	return <button className={btn} onClick={() => onClick()}></button>
}

// TODO: change contol btn size to 14px
