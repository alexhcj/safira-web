import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { PasswordStrength } from '@shared/components/PasswordStrength/PasswordStrength'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import { required, pattern, minLength, maxLength, matchField } from '@utils/validation/form'

import s from './change-password-stepper-form.module.scss'

const changePasswordFormValidationSchema = {
	password: [
		required('Password should be filled.'),
		minLength(8, 'Password should be at least 8 characters.'),
		maxLength(64, 'Password should be maximum 64 characters.'),
		pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]+$/,
			'Password should include a mix of character types.',
		),
	],
	confirmPassword: [
		required('Password should be filled.'),
		matchField('password', 'Password must be identical.'),
		maxLength(64, 'Password should be maximum 64 characters.'),
	],
}

export const ChangePasswordStepperFormPasswords = ({ type, isLoading, onSubmit }) => {
	const location = useLocation()
	const initialFormState = {
		password: '',
		confirmPassword: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError } = useFormValidation(form, changePasswordFormValidationSchema)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!isValid()) return

		onSubmit(type, { form, query: location.search.slice(1) })
	}

	const handleChange = (field) => (e) => {
		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<div className={s.input_box}>
				<PasswordStrength
					classNames={s.password_strength}
					value={form['password']}
					isActive={form['password'].length > 0}
				/>
				<Input
					className={s.input_password}
					key='password'
					type='password'
					id='password'
					label='New password'
					value={form['password']}
					placeholder='********'
					handleChange={handleChange('password')}
					error={getFieldError('password')}
				/>
			</div>
			<Input
				className={s.input_password}
				key='confirmPassword'
				type='password'
				id='confirmPassword'
				label='Confirm password'
				value={form['confirmPassword']}
				placeholder='********'
				handleChange={handleChange('confirmPassword')}
				error={getFieldError('confirmPassword')}
			/>
			<Button className={s.btn} htmlType='submit' disabled={isLoading}>
				{isLoading ? (
					<Preloader width={20} height={20} />
				) : (
					<Text className={s.btn_text} color='white' span>
						Confirm password
					</Text>
				)}
			</Button>
		</form>
	)
}
