import React from 'react'
import s from './sidebar-layout.module.scss'

export const SidebarLayout = (props) => {
	return (
		<div className={s.layout}>
			<div className={s.main}>
				{props.main}
			</div>
			<aside className={s.aside}>
				{props.aside}
			</aside>
		</div>
	)
}
