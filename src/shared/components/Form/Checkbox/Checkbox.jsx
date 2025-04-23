import { useCallback, useMemo, useState } from 'react'

import cn from 'classnames'

import { ErrorPopover } from '@shared/components/UI/ErrorPopover/ErrorPopover'

import s from './checkbox.module.scss'

export const Checkbox = ({ children, type, id, name, checked = false, handleChange, error, required, className }) => {
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
		<div className={s.box}>
			{type === 'terms' ? (
				<>
					<input
						className={cn(s.checkbox, { [s.active]: checked, [s.error]: isError })}
						id={id}
						type='checkbox'
						checked={checked}
						name={name}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						required={required}
					/>
					{children}
					<label className={cn(s.label, required && s.required, className)} htmlFor={id}></label>
				</>
			) : (
				<>
					<label className={cn(s.label, required && s.required, className)}>
						<input
							className={cn(s.checkbox, { [s.active]: checked, [s.error]: isError })}
							type='checkbox'
							checked={checked}
							name={name}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							required={required}
						/>
					</label>
					{children}
				</>
			)}
			<ErrorPopover error={isError && error} className={s.error_popover} />
		</div>
	)
}
