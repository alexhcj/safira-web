import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useFormErrors } from '@hooks/useFormErrors'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import s from './change-password-stepper-form.module.scss'

const changePasswordFormValidationSchema = {
	email: [
		{ type: 'required', pattern: /^(?!\s*$).+/, text: 'Email should be filled.' },
		{
			type: 'text',
			pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,30}$/i,
			text: 'Email should be 2-30 characters and valid.',
		},
	],
	password: [
		{ type: 'required', pattern: /^(?!\s*$).+/, text: 'Password should be filled.' },
		{
			type: 'text',
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
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
}

export const ChangePasswordStepperFormPasswords = ({ type, isLoading, error, onSubmit }) => {
	const location = useLocation()
	const initialFormState = {
		password: '',
		confirmPassword: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { errors } = useFormErrors(form, changePasswordFormValidationSchema)

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
	console.log(errors)
	return (
		<form className={s.form} onSubmit={handleSubmit}>
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
			<Button className={s.btn} htmlType='submit' disabled={isLoading || Object.keys(errors).length !== 0}>
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
