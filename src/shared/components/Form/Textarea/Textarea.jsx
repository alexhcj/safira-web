import { useCallback, useMemo, useState } from 'react'

import cn from 'classnames'

import { ErrorPopover } from '@shared/components/UI/ErrorPopover/ErrorPopover'

import s from './textarea.module.scss'

export const Textarea = ({ name, label, id, value, handleChange, placeholder, error, required, className }) => {
	const [isTouched, setIsTouched] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const isError = useMemo(() => !isFocused && isTouched && error, [isFocused, isTouched, error])

	const handleFocus = useCallback(() => {
		setIsFocused(true)
		setIsTouched(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)
	}, [])

	return (
		<div className={cn(s.box, className)}>
			<label className={cn(s.label, { [s.required]: required })} htmlFor={id}>
				{label}
			</label>
			<textarea
				className={cn(s.textarea, { [s.error]: isError })}
				value={value}
				id={id}
				name={name}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder}
				required={required}
			/>
			<ErrorPopover error={isError && Object.values(error)[0]} className={s.error_popover} />
		</div>
	)
}
