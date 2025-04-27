import { useState } from 'react'

import { maxLength, pattern, required } from '@/utils'

import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import s from './change-password-stepper-form.module.scss'

const emailFormValidationSchema = {
	// email: no minLength, pattern min 5 chars
	email: [
		required('Email should be filled.'),
		pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Email should be valid.'),
		maxLength(64, 'Email should be maximum 64 characters.'),
	],
}

export const ChangePasswordStepperFormEmail = ({ type, isLoading, error, onSubmit }) => {
	const [email, setEmail] = useState('')
	const { isValid, getFieldError, resetFieldError } = useFormValidation({ email }, emailFormValidationSchema, {
		validateOnChange: false,
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!isValid()) return

		onSubmit(type, { email })
	}

	const handleChange = (e) => {
		if (!isValid()) resetFieldError('email')
		setEmail(e.target.value)
	}

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<p className={s.text}>Enter profile email address and we’ll send to it a verification code.</p>
			<Input
				className={s.input_email}
				type='text'
				id='email'
				value={email}
				handleChange={handleChange}
				placeholder='johnsmith99@gmail.com'
				error={getFieldError('email')}
			/>
			<Button className={s.btn} htmlType='submit' disabled={isLoading}>
				{isLoading ? (
					<Preloader width={20} height={20} />
				) : (
					<Text className={s.btn_text} color='white' span>
						Send
					</Text>
				)}
			</Button>
		</form>
	)
}
