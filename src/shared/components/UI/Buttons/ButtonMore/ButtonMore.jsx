import React from 'react'
import { NavLink } from 'react-router-dom'
import { MoreSVG } from '../../../../../components/svg'
import s from './button-more.module.scss'

export const ButtonMore = ({ to = '/', text = 'Show more' }) => {
	return (
		<NavLink to={to} className={s.btn}>
			{text}
			<MoreSVG />
		</NavLink>
	)
}

// TODO: create btn Class for extends
