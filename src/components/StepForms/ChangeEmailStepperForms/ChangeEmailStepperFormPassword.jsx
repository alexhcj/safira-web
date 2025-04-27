import { useState } from 'react'

import { maxLength, minLength, pattern, required } from '@/utils'

import { useProfile } from '@hooks/services/useProfile'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import { hideEmailPartial } from '@utils/string'

import s from './change-email-stepper-form.module.scss'

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
}

export const ChangeEmailStepperFormPassword = ({ type, isLoading, error, onSubmit }) => {
	const { profile } = useProfile()
	const [password, setPassword] = useState('')
	const { isValid, getFieldError, resetFieldError } = useFormValidation(
		{ password },
		changePasswordFormValidationSchema,
		{ validateOnChange: false },
	)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!isValid()) return

		onSubmit(type, { password })
	}

	const handleChange = (e) => {
		if (!isValid()) resetFieldError('password')
		setPassword(e.target.value)
	}

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			{profile.email && (
				<p className={s.text}>
					To verify it&apos;s you, enter the current password for <strong>{hideEmailPartial(profile.email)}</strong>.
				</p>
			)}
			<Input
				className={s.input_password}
				type='password'
				id='password'
				value={password}
				handleChange={handleChange}
				placeholder='********'
				error={getFieldError('password')}
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
