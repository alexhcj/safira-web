import { useState } from 'react'

import cn from 'classnames'
import { useLocation } from 'react-router-dom'

import { useResetPasswordStepperContext } from '@context/ResetPasswordStepperContext'

import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { PasswordStrength } from '@shared/components/PasswordStrength/PasswordStrength'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import { required, pattern, minLength, maxLength, matchField } from '@utils/validation/form'

import s from './reset-password-stepper-form.module.scss'

const errorPopoverTransition = {
	enter: s.animateEnter,
	enterActive: s.animateEnterActive,
	enterDone: s.animateEnterDone,
	exit: s.animateExit,
	exitActive: s.animateExitActive,
	exitDone: s.animateExitDone,
}

const passwordStrengthTransition = {
	enter: s.passwordStrengthAnimateEnter,
	enterActive: s.passwordStrengthAnimateEnterActive,
	enterDone: s.passwordStrengthAnimateEnterDone,
	exit: s.passwordStrengthAnimateExit,
	exitActive: s.passwordStrengthAnimateExitActive,
	exitDone: s.passwordStrengthAnimateExitDone,
}

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

export const ResetPasswordStepperFormPasswords = ({ type, isLoading, onSubmit }) => {
	const location = useLocation()
	const { step } = useResetPasswordStepperContext()
	const initialFormState = {
		password: '',
		confirmPassword: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError } = useFormValidation(form, changePasswordFormValidationSchema)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!isValid()) return

		onSubmit(type, { form: { ...form, email: step.email }, query: location.search.slice(1) })
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
					transitionClasses={passwordStrengthTransition}
					value={form['password']}
					isActive={form['password'].length > 0}
				/>
				<Input
					className={s.input_password}
					errorTransitionClasses={errorPopoverTransition}
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
				errorTransitionClasses={errorPopoverTransition}
				key='confirmPassword'
				type='password'
				id='confirmPassword'
				label='Confirm password'
				value={form['confirmPassword']}
				placeholder='********'
				handleChange={handleChange('confirmPassword')}
				error={getFieldError('confirmPassword')}
			/>
			<Button className={cn(s.btn, s.btn_password, isLoading && s.loading)} htmlType='submit'>
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
