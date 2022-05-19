import React from 'react';
import cn from "classnames";
import s from './input.module.scss'

export const Input = ({type = 'text', name, value, label, id, placeholder, required, handleChange, className}) => {
	const onChange = (e) => {
		const {value} = e.currentTarget
		handleChange(value)
	}

	return (
		<div className={cn(s.box, className)}>
			<label className={cn(s.label, required && s.required)} htmlFor={id}>{label}</label>
			<input
				className={s.input}
				type={type}
				id={id}
				value={value}
				name={name}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	)
}
