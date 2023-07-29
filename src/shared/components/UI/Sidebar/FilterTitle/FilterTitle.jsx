import React from 'react'
import s from './filter-title.module.scss'

export const FilterTitle = ({ text }) => {
	return <h3 className={s.title}>{text}</h3>
}
