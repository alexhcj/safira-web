import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import {Text} from "../Text/Text";
import cn from "classnames";
import s from './breadcrumbs.module.scss'

export const Breadcrumbs = () => {
	let location = useLocation().pathname.slice(1) // breadcrumbs without /
	const breadcrumbs = location.split('/')

	return (
		<div className={s.section}>
			<div className={s.content}>
				<div className={s.box}>
					<NavLink to='/' className={cn(s.breadcrumbs, s.link)}>Home</NavLink>
					<Text span>/</Text>
				</div>
				<div className={s.box}>
					<Text className={s.breadcrumbs}>{breadcrumbs[0]}</Text>
				</div>
			</div>
		</div>
	)
}
