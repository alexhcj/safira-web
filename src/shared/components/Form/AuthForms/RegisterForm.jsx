import { useState } from 'react'

import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

import { authAPI } from '@api/auth'

import { useFormValidation } from '@hooks/useFormValidation'

import { PasswordStrength } from '@shared/components/PasswordStrength/PasswordStrength'

import { matchField, maxLength, minLength, passwordStrength, pattern, required } from '@utils/validation/form'

import { Button } from '../../UI/Buttons/Button/Button'
import { Text } from '../../UI/Text/Text'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'

import s from './auth-form.module.scss'

const registerFormValidationSchema = {
	// email: no minLength, pattern min 5 chars
	email: [
		required('Email should be filled.'),
		pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Email should be valid.'),
		maxLength(64, 'Email should be maximum 64 characters.'),
	],
	password: [
		required('Password should be filled.'),
		minLength(8, 'Password should be at least 8 characters.'),
		maxLength(64, 'Password should be maximum 64 characters.'),
		pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]+$/,
			'Password should contain uppercase, lowercase, number and special character.',
		),
		passwordStrength(),
	],
	confirmPassword: [required('Password should be filled.'), matchField('password', 'Password must be identical.')],
	isPrivacyConfirmed: [required('Terms and policies should be confirmed.')],
}

/**
 * Register form component
 * @returns {JSX.Element}
 * @constructor
 */
export const RegisterForm = () => {
	const [authError, setAuthError] = useState(null)
	const navigate = useNavigate()
	const initialFormState = {
		email: '',
		password: '',
		confirmPassword: '',
		isPrivacyConfirmed: false,
	}
	const [form, setForm] = useState(initialFormState)
	const { errors, isValid, markFieldAsDirty, isFieldDirty, markAllFieldsDirty } = useFormValidation(
		form,
		registerFormValidationSchema,
		{
			validateOnlyDirty: true, // Only validate fields the user has touched
		},
	)

	const handleSubmit = async (e) => {
		e.preventDefault()

		markAllFieldsDirty()

		if (isValid()) {
			const formData = {
				email: form.email,
				password: form.password,
				isPrivacyConfirmed: form.isPrivacyConfirmed,
			}

			const res = await authAPI.register(formData)
			// TODO: handle res ok | error

			if (res.statusCode === 404) {
				console.log('Error')
			}

			setForm({ email: '', password: '', confirmPassword: '', isPrivacyConfirmed: false })
			navigate('/verify-email', { state: { email: form.email } })
		}
	}

	const handleChange = (field) => (e) => {
		if (authError) setAuthError(false)

		setForm({
			...form,
			[field]: e.target.value,
		})

		// Mark field as dirty when user changes it
		markFieldAsDirty(field)
	}

	const handleCheckboxChange = (field) => {
		setForm({
			...form,
			[field]: !form.isPrivacyConfirmed,
		})

		// Mark checkbox as dirty when user clicks it
		markFieldAsDirty(field)
	}

	// Show error only if field is dirty
	const getFieldError = (field) => {
		return isFieldDirty(field) ? errors[field] : null
	}

	return (
		<div className={s.wrapper}>
			<div className={s.box}>
				<h2 className={s.title}>Register</h2>
				<form className={s.form} onSubmit={handleSubmit}>
					<Input
						className={s.input}
						key='email'
						id='email'
						type='email'
						value={form['email']}
						label='Email address'
						handleChange={handleChange('email')}
						error={getFieldError('email')}
						required
					/>
					<div className={s.input_box}>
						<PasswordStrength
							classNames={s.password_strength}
							value={form['password']}
							isActive={isFieldDirty('password')}
						/>
						<Input
							className={s.input}
							key='password'
							id='password'
							type='password'
							value={form['password']}
							label='Password'
							handleChange={handleChange('password')}
							error={getFieldError('password')}
							required
						/>
					</div>
					<Input
						className={s.input}
						key='confirmPassword'
						id='confirmPassword'
						type='password'
						value={form['confirmPassword']}
						label='Confirm password'
						handleChange={handleChange('confirmPassword')}
						error={getFieldError('confirmPassword')}
						required
					/>
					<Checkbox
						key='checkbox'
						type='terms'
						checked={form['isPrivacyConfirmed']}
						label='Confirm privacy'
						handleChange={() => handleCheckboxChange('isPrivacyConfirmed')}
						error={getFieldError('isPrivacyConfirmed')}
						required
					>
						<div className='terms'>
							I agree to the{' '}
							<Link className='terms-link' to='/'>
								Terms of Use
							</Link>{' '}
							and{' '}
							<Link className='terms-link' to='/'>
								Privacy Policy
							</Link>
							.
						</div>
					</Checkbox>
					<div className={s.form_actions}>
						{authError && <span className={cn(s.auth_error, authError && s.active)}>{authError.message}</span>}
						<Button htmlType='submit' type='auth' className={s.btn_auth}>
							<Text span color='white' className={s.btn_auth_text}>
								Register
							</Text>
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
