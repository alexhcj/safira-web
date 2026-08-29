import { useState } from 'react'

import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthActionsContext } from '@context/AuthContext'

import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { PasswordStrength } from '@shared/components/PasswordStrength/PasswordStrength'

import { matchField, maxLength, minLength, pattern, required } from '@utils/validation/form'

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
			'Password should include a mix of character types.',
		),
	],
	confirmPassword: [
		required('Password should be filled.'),
		matchField('password', 'Password must be identical.'),
		maxLength(64, 'Password should be maximum 64 characters.'),
	],
	isPrivacyConfirmed: [required('Terms and policies should be confirmed.')],
}

const passwordStrengthTransition = {
	enter: s.animateEnter,
	enterActive: s.animateEnterActive,
	enterDone: s.animateEnterDone,
	exit: s.animateExit,
	exitActive: s.animateExitActive,
	exitDone: s.animateExitDone,
}

const privacyPolicyTransition = {
	enter: s.privacyAnimateEnter,
	enterActive: s.privacyAnimateEnterActive,
	enterDone: s.privacyAnimateEnterDone,
	exit: s.privacyAnimateExit,
	exitActive: s.privacyAnimateExitActive,
	exitDone: s.privacyAnimateExitDone,
}

/**
 * Register form component
 * @returns {JSX.Element}
 * @constructor
 */
export const RegisterForm = () => {
	const { registerUser, isLoading } = useAuthActionsContext()
	const navigate = useNavigate()
	const initialFormState = {
		email: '',
		password: '',
		confirmPassword: '',
		isPrivacyConfirmed: false,
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError } = useFormValidation(form, registerFormValidationSchema)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const formData = {
				email: form.email,
				password: form.password,
				isPrivacyConfirmed: form.isPrivacyConfirmed,
			}

			const res = await registerUser(formData)

			if (res) {
				if (res.success && res.data.accessToken) {
					setForm(initialFormState)
					navigate('/verify-email', { state: { email: form.email, from: '/register' } })
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

	const handleCheckboxChange = (field) => {
		setForm({
			...form,
			[field]: !form.isPrivacyConfirmed,
		})
	}

	return (
		<div className={s.wrapper}>
			<div className={s.box}>
				<h2 className={s.title}>Register</h2>
				<form className={s.form} onSubmit={handleSubmit}>
					<div className={s.input_box}>
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
					</div>
					<div className={cn(s.input_box, s.password_strength_box)}>
						<PasswordStrength
							classNames={s.password_strength}
							transitionClasses={passwordStrengthTransition}
							value={form['password']}
							isActive={form['password'].length > 0}
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
						className={s.checkbox}
						transitionClasses={privacyPolicyTransition}
						key='checkbox'
						type='terms'
						checked={form['isPrivacyConfirmed']}
						label='Confirm privacy'
						handleChange={() => handleCheckboxChange('isPrivacyConfirmed')}
						error={getFieldError('isPrivacyConfirmed')}
						required
					>
						<span className={s.agree}>I agree to the</span>
						<Link className='terms-link' to='/terms-conditions'>
							Terms of Use
						</Link>
						and
						<Link className='terms-link' to='/privacy-policy'>
							Privacy Policy
						</Link>
						<span className={s.dot}>.</span>
					</Checkbox>
					<div className={cn(s.form_actions, s.register_actions)}>
						<Button htmlType='submit' type='auth' className={cn(s.btn_auth_register, isLoading && s.loading)}>
							{isLoading ? (
								<Preloader width={20} height={20} />
							) : (
								<Text span color='white' className={s.btn_auth_text}>
									Register
								</Text>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
