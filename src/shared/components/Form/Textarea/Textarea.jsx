import React from 'react';
import cn from "classnames";
import s from './textarea.module.scss'

export const Textarea = ({name, label, id, handleChange, placeholder, className}) => {
	const onChange = (e) => {
		const {id} = e.currentTarget
		handleChange(id)
	}

	return (
		<div className={cn(s.box, className)}>
			<label className={s.label} htmlFor={id}>{label}</label>
			<textarea className={s.textarea} id={id} name={name} onChange={onChange} placeholder={placeholder} />
		</div>
	)
}
