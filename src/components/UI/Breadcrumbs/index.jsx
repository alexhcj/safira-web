import React from 'react'
import { useLocation } from 'react-router-dom'
import s from './breadcrumb.module.css'

export const Breadcrumbs = () => {
	let location = useLocation().pathname.slice(1) // breacrumbs withhout /

	return (
		<div className={s.section}>
			<div className={s.content}>
				<h3 className={s.title}>{location}</h3>
				<div className={s.breacrumbs}>Home / {location}</div>
			</div>
		</div>
	)
}
