import { useCallback, useMemo, useState } from 'react'

import cn from 'classnames'

import { ErrorPopover } from '@shared/components/UI/ErrorPopover/ErrorPopover'

import s from './textarea.module.scss'

export const Textarea = ({ name, label, id, value, handleChange, placeholder, error, required, className }) => {
	const [isFocused, setIsFocused] = useState(false)
	const isError = useMemo(() => !isFocused && error, [isFocused, error])

	const handleFocus = useCallback(() => {
		setIsFocused(true)
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
			/>
			<ErrorPopover error={isError && error} />
		</div>
	)
}
