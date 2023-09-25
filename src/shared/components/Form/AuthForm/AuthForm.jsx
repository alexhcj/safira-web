import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { authAPI } from '../../../../api/auth'
import { useAuthContext } from '../../../../context/AuthContext'
import { useFormErrors } from '../../../../hooks/useFormErrors'
import { Input } from '../Input/Input'
import { Checkbox } from '../Checkbox/Checkbox'
import { Button } from '../../UI/Buttons/Button/Button'
import { Text } from '../../UI/Text/Text'
import s from './auth-form.module.scss'

const authFormValidationSchema = {
	email: [
		{ type: 'required', pattern: /^(?!\s*$).+/, text: 'Email should be filled.' },
		{
			type: 'text',
			pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,30}$/i, // TODO: change pattern
			text: 'Email should be 2-30 characters and valid.',
		},
	],
	password: [
		{ type: 'required', pattern: /^(?!\s*$).+/, text: 'Password should be filled.' },
		{
			type: 'text',
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
			text: 'Password should be 8-20 characters and valid.',
		},
	],
	confirmPassword: [
		{ type: 'required', pattern: /^(?!\s*$).+/, text: 'Password should be filled.' },
		{
			type: 'text',
			text: 'Password should be identic.',
		},
	],
	isPrivacyConfirmed: [{ type: 'required', pattern: true, text: 'Terms and policies should be confirmed.' }],
}

export const AuthForm = ({ type }) => {
	const [authError, setAuthError] = useState(null)
	const { login } = useAuthContext()
	const navigate = useNavigate()
	const initialFormState = {
		email: '',
		password: '',
		...(type === 'register' && { confirmPassword: '', isPrivacyConfirmed: false }),
	}
	const [form, setForm] = useState(initialFormState)
	const { errors } = useFormErrors(form, authFormValidationSchema)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (Object.keys(errors).length === 0) {
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
				navigate('/')
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
								error={errors['confirmPassword']}
								required
							/>
							<Checkbox
								key='checkbox'
								type='terms'
								checked={form['isPrivacyConfirmed']}
								label='Confirm privacy'
								handleChange={() => handleCheckboxChange('isPrivacyConfirmed')}
								error={errors['isPrivacyConfirmed']}
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
