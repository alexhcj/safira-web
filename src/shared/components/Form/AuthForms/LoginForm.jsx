import { useEffect, useState } from 'react'

import cn from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

import { authAPI } from '@api/auth'

import { useAuthContext } from '@context/AuthContext'

import { useFormValidation } from '@hooks/useFormValidation'

import { maxLength, minLength, pattern, required } from '@utils/validation/form'

import { Button } from '../../UI/Buttons/Button/Button'
import { Text } from '../../UI/Text/Text'
import { Input } from '../Input/Input'

import s from './auth-form.module.scss'

const loginFormValidationSchema = {
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
	],
}

/**
 * Login form component
 * @returns {JSX.Element}
 * @constructor
 */
export const LoginForm = () => {
	const { user } = useAuthContext()
	const [authError, setAuthError] = useState(null)
	const { login } = useAuthContext()
	const navigate = useNavigate()
	const location = useLocation()
	const initialFormState = {
		email: '',
		password: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { errors, isErrors } = useFormValidation(form, loginFormValidationSchema)

	useEffect(() => {
		if (user !== null) navigate('/')
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!isErrors()) {
			const formData = {
				email: form.email,
				password: form.password,
			}

			const user = await authAPI.login(formData)

			// TODO: handle res ok | error

			if (user && user.id && user.accessToken) {
				login(user)
				setForm({ email: '', password: '' })
				navigate(`${location.state?.from}`)
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

	return (
		<div className={s.wrapper}>
			<div className={s.box}>
				<h2 className={s.title}>Login</h2>
				<form className={s.form} onSubmit={handleSubmit}>
					<Input
						className={s.input}
						key='email'
						id='email'
						type='email'
						value={form['email']}
						label='Email address'
						handleChange={handleChange('email')}
						error={errors['email']}
						required
					/>
					<Input
						className={s.input}
						key='password'
						id='password'
						type='password'
						value={form['password']}
						label='Password'
						handleChange={handleChange('password')}
						error={errors['password']}
						required
					/>
					<div className={s.form_actions}>
						{authError && <span className={cn(s.auth_error, authError && s.active)}>{authError.message}</span>}
						<Button htmlType='submit' type='auth' className={s.btn_auth}>
							<Text span color='white' className={s.btn_auth_text}>
								Login
							</Text>
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
