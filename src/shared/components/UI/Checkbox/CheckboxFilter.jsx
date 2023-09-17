import React from 'react'
import s from './checkbox-filter.module.scss'

export const CheckboxFilter = ({ isChecked, children, onClick, className }) => {
	return (
		<label className={className}>
			<input className={s.checkbox} type='checkbox' checked={isChecked} onChange={onClick} />
			{children}
		</label>
	)
}
