import { useEffect, useState } from 'react'

import cn from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { useAuth } from '@hooks/services/useAuth'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'

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
			'Password should include a mix of character types.',
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
	const { login, isLoading } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const initialFormState = {
		email: '',
		password: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError } = useFormValidation(form, loginFormValidationSchema)

	useEffect(() => {
		if (user !== null) navigate('/')
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const formData = {
				email: form.email,
				password: form.password,
			}

			const res = await login(formData)

			if (res) {
				if (res.success && res.user.accessToken) {
					setForm({ email: '', password: '' })

					!res.isEmailVerified
						? navigate('/verify-email', { state: { email: form.email } })
						: navigate(`${location.state?.from?.pathname || '/'}`, { replace: true })
				}
			}
		}
	}

	const handleChange = (field) => (e) => {
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
						type='text'
						value={form['email']}
						label='Email address'
						handleChange={handleChange('email')}
						error={getFieldError('email')}
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
						error={getFieldError('password')}
						required
					/>
					<div className={s.form_actions}>
						<Button htmlType='submit' type='auth' className={cn(s.btn_auth_login, isLoading && s.loading)}>
							{isLoading ? (
								<Preloader width={20} height={20} />
							) : (
								<Text span color='white' className={s.btn_auth_text}>
									Login
								</Text>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
