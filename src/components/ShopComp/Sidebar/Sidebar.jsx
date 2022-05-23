import React from 'react'
import { Search } from './Search/Search'
import s from './sidebar.module.scss'

export const Sidebar = ({ searchHandler }) => {
	return (
		<aside>
			<h3 className={s.title}>Filter by name</h3>
			<Search searchHandler={searchHandler} />
		</aside>
	)
}
