import { useCallback, useMemo, useState } from 'react'

import cn from 'classnames'

import { ErrorPopover } from '@shared/components/UI/ErrorPopover/ErrorPopover'

import EyeClosedSVG from '@assets/svg/eye-closed.svg?react'
import EyeSVG from '@assets/svg/eye.svg?react'

import s from './input.module.scss'

export const Input = ({
	type = 'text',
	name,
	value,
	defaultValue,
	label,
	id,
	placeholder,
	required,
	handleChange,
	error,
	className,
}) => {
	const [isShowPassword, setIsShowPassword] = useState(false)
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
			{label && (
				<label className={cn(s.label, s.required && required)} htmlFor={id}>
					{label}
				</label>
			)}
			<input
				className={cn(s.input, { [s.error]: isError })}
				type={type === 'password' && !isShowPassword ? 'password' : 'text'}
				id={id}
				value={value}
				defaultValue={defaultValue}
				name={name}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder}
				required={required}
			/>
			{type === 'password' && (
				<button type='button' className={s.password_btn} onClick={() => setIsShowPassword(!isShowPassword)}>
					{!isShowPassword && <EyeSVG className={s.password_icon} />}
					{isShowPassword && <EyeClosedSVG className={s.password_icon} />}
				</button>
			)}
			{/* TODO: add error variant. On mobile should be text under field. */}
			{/*{isError && <span>{error}</span>}*/}
			<ErrorPopover error={isError && error} />
		</div>
	)
}
