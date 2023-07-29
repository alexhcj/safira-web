import React from 'react'
import cn from 'classnames'
import s from './textarea.module.scss'

export const Textarea = ({ name, label, id, value, handleChange, placeholder, className }) => {
	const onChange = (e) => {
		const { value } = e.currentTarget
		handleChange(value)
	}

	return (
		<div className={cn(s.box, className)}>
			<label className={s.label} htmlFor={id}>
				{label}
			</label>
			<textarea
				className={s.textarea}
				value={value}
				id={id}
				name={name}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	)
}
