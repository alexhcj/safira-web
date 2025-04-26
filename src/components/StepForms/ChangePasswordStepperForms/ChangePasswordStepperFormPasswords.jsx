import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { PasswordStrength } from '@shared/components/PasswordStrength/PasswordStrength'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import { required, pattern, minLength, maxLength } from '@utils/validation/form'

import s from './change-password-stepper-form.module.scss'

const changePasswordFormValidationSchema = {
	email: [
		required('Email should be filled.'),
		pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Email should be valid.'),
		maxLength(64, 'Email should be maximum 64 characters.'),
	],
	password: [
		required('Password should be filled.'),
		minLength(8, 'Password should be minimum 8 characters.'),
		maxLength(64, 'Password should be maximum 64 characters.'),
		pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			'Password should contain uppercase, lowercase, number and special character.',
		),
	],
	confirmPassword: [
		required('Please confirm your password.'),
		pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Passwords must match.'),
		maxLength(64, 'Password should be maximum 64 characters.'),
	],
}

// TODO: check error
export const ChangePasswordStepperFormPasswords = ({ type, isLoading, error, onSubmit }) => {
	const location = useLocation()
	const initialFormState = {
		password: '',
		confirmPassword: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { errors, isValid } = useFormValidation(form, changePasswordFormValidationSchema)

	const handleSubmit = (e) => {
		e.preventDefault()
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
				<PasswordStrength value={form['password']} isActive={isValid()} />
				<Input
					className={s.input_password}
					key='password'
					type='password'
					id='password'
					label='New password'
					value={form['password']}
					placeholder='********'
					handleChange={handleChange('password')}
					error={errors['password']}
					required
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
				error={errors['confirmPassword']}
				required
			/>
			<Button className={s.btn} htmlType='submit' disabled={isLoading || isValid()}>
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
