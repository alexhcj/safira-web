import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { Text } from '../Text/Text'
import { Space } from '../Spacing/Space'
import s from './breadcrumbs.module.scss'

export const Breadcrumbs = () => {
	let { pathname, state } = useLocation()

	return (
		<div className={s.section}>
			<div className={s.content}>
				<h3 className={s.page}>{pathname.slice(1)}</h3>
				<Space space={9} />
				<div className={s.breadcrumbs}>
					<div>
						<NavLink to='/' className={cn(s.current, s.link)}>
							Home
						</NavLink>
					</div>
					{pathname && !state.category && (
						<>
							<Text span>/ </Text>
							<Text className={s.current} span>
								{pathname.slice(1)}
							</Text>
						</>
					)}
					{state.category && (
						<>
							<Text span>/ </Text>
							<Text className={s.current} span>
								{state.category}
							</Text>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
