import { useEffect, useState } from 'react'

import cn from 'classnames'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { authAPI } from '@api/auth'

import { useAuthContext } from '@context/AuthContext'

import { useFormValidation } from '@hooks/useFormValidation'

import { PasswordStrength } from '@shared/components/PasswordStrength/PasswordStrength'

import { matchField, maxLength, minLength, passwordStrength, pattern, required } from '@utils/validation/form'

import { Button } from '../../UI/Buttons/Button/Button'
import { Text } from '../../UI/Text/Text'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'

import s from './auth-form.module.scss'

const authFormValidationSchema = {
	email: [
		required('Email should be filled.'),
		minLength(2, 'Email should be minimum 2 characters.'),
		maxLength(30, 'Email should be maximum 30 characters.'),
		pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Email should be valid.'),
	],
	password: [
		required('Password should be filled.'),
		minLength(8, 'Password should be at least 8 characters.'),
		maxLength(20, 'Password should be maximum 20 characters.'),
		pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]+$/,
			'Password should contain uppercase, lowercase, number and special character.',
		),
		passwordStrength(),
	],
	confirmPassword: [required('Password should be filled.'), matchField('password', 'Password should be identical.')],
	isPrivacyConfirmed: [required('Terms and policies should be confirmed.')],
}

/**
 * Auth form component. Used for register and login.
 * @param {string} type - type of auth form (register or login)
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthForm = ({ type }) => {
	const { user } = useAuthContext()
	const [authError, setAuthError] = useState(null)
	const { login } = useAuthContext()
	const navigate = useNavigate()
	const location = useLocation()
	const initialFormState = {
		email: '',
		password: '',
		...(type === 'register' && { confirmPassword: '', isPrivacyConfirmed: false }),
	}
	const [form, setForm] = useState(initialFormState)
	const { errors, isErrors } = useFormValidation(form, authFormValidationSchema)

	useEffect(() => {
		if (user !== null) navigate('/')
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!isErrors) {
			const formData = {
				email: form.email,
				password: form.password,
				...(type === 'register' && { isPrivacyConfirmed: form.isPrivacyConfirmed }),
			}

			const user = type === 'register' ? await authAPI.register(formData) : await authAPI.login(formData)

			if (user && user.id && user.accessToken) {
				login(user)
				type === 'register'
					? setForm({ email: '', password: '', confirmPassword: '', isPrivacyConfirmed: false })
					: setForm({ email: '', password: '' })
				location.state?.from
					? navigate(`${location.state?.from}`)
					: navigate('/verify-email', { state: { email: form.email } })
			} else {
				setAuthError(user)
			}
		}
	}

	const handleChange = (field) => (e) => {
		if (authError) setAuthError(false)

		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	const handleCheckboxChange = (field) => {
		setForm({
			...form,
			[field]: !form.isPrivacyConfirmed,
		})
	}

	return (
		<div className={s.wrapper}>
			<div className={s.box}>
				<h2 className={s.title}>{type}</h2>
				<form className={s.form} onSubmit={handleSubmit}>
					<Input
						className={s.input}
						key='email'
						id='email'
						type='email'
						value={form['email']}
						label='Email address'
						handleChange={handleChange('email')}
						error={type === 'register' && errors['email']}
						required
					/>
					<div className={s.input_box}>
						{type === 'register' && (
							<PasswordStrength value={form['password']} isActive={isErrors} classNames={s.password_strength} />
						)}
						<Input
							className={s.input}
							key='password'
							id='password'
							type='password'
							value={form['password']}
							label='Password'
							handleChange={handleChange('password')}
							error={type === 'register' && errors['password']}
							required
						/>
					</div>
					{type === 'register' && (
						<>
							<Input
								className={s.input}
								key='confirmPassword'
								id='confirmPassword'
								type='password'
								value={form['confirmPassword']}
								label='Confirm password'
								handleChange={handleChange('confirmPassword')}
								error={type === 'register' && errors['confirmPassword']}
								required
							/>
							<Checkbox
								key='checkbox'
								type='terms'
								checked={form['isPrivacyConfirmed']}
								label='Confirm privacy'
								handleChange={() => handleCheckboxChange('isPrivacyConfirmed')}
								error={type === 'register' && errors['isPrivacyConfirmed']}
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
						</>
					)}
					<div className={s.form_actions}>
						{authError && <span className={cn(s.auth_error, authError && s.active)}>{authError.message}</span>}
						<Button htmlType='submit' type='auth' className={s.btn_auth}>
							<Text span color='white' className={s.btn_auth_text}>
								{type}
							</Text>
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
