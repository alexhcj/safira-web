import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Text } from '../Text/Text'
import { Space } from '../Spacing/Space'
import cn from 'classnames'
import s from './breadcrumbs.module.scss'

export const Breadcrumbs = () => {
	let location = useLocation().pathname.slice(1) // breadcrumbs without /
	const breadcrumbs = location.split('/')

	return (
		<div className={s.section}>
			<div className={s.content}>
				<div className={s.box}>
					<h3 className={s.page}>{breadcrumbs[0]}</h3>
					<Space space={9} />
					<div className={s.breadcrumbs}>
						<div className={s.route}>
							<NavLink to='/' className={cn(s.current, s.link)}>Home</NavLink>
							<Text span>/</Text>
						</div>
						<div className={s.route}>
							<Text className={s.current}>{breadcrumbs[0]}</Text>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
