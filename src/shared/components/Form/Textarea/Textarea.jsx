import React, { useCallback, useMemo, useState } from 'react'
import cn from 'classnames'
import s from './textarea.module.scss'

export const Textarea = ({ name, label, id, value, handleChange, placeholder, error, className }) => {
	const [isTouched, setIsTouched] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const isError = useMemo(() => isFocused && isTouched && error, [isFocused, isTouched, error])

	const handleFocus = useCallback(() => {
		setIsFocused(true)
		setIsTouched(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)
	}, [])

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
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder}
			/>
			{isError && <span className={s.error}>{Object.values(error)[0]}</span>}
		</div>
	)
}
