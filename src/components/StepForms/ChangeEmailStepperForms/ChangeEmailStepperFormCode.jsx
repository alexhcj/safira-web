import { useState } from 'react'

import { exactLength, pattern, required } from '@/utils'

import { useFormValidation } from '@hooks/useFormValidation'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { ResendCode } from '@components/VerifyEmail/ResendCode/ResendCode'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'
import { VERIFY_EMAIL } from '@shared/types/api-types'

import { hideEmailPartial } from '@utils/string'

import s from './change-email-stepper-form.module.scss'

const codeFormValidationSchema = {
	code: [
		required('Code should be filled.'),
		exactLength(6, 'Verification code must be exactly 6 digits.'),
		pattern(/^\d+$/, 'Verification code should contain only digits.'),
	],
}

export const ChangeEmailStepperFormCode = ({ type, isLoading, onSubmit }) => {
	const [step, _] = useLocalStorage('change-email-stepper')
	const [code, setCode] = useState('')
	const { isValid, getFieldError, resetFieldError } = useFormValidation({ code }, codeFormValidationSchema, {
		validateOnChange: false,
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!isValid()) return

		onSubmit(type, { code: +code })
	}

	const handleChange = (e) => {
		if (!isValid()) resetFieldError('code')
		setCode(e.target.value)
	}

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<p className={s.text}>
				We’ve sent <strong>6-digits</strong> verification code to <strong>{hideEmailPartial(step.email)}</strong>. Enter
				this code into input to verify that address is yours.
			</p>
			<Input
				className={s.input_code}
				type='text'
				id='code'
				value={code}
				handleChange={handleChange}
				placeholder='726482'
				error={getFieldError('code')}
			/>
			<ResendCode classNames={s.resend_code} type={VERIFY_EMAIL.CHANGE_EMAIL} />
			<Button className={s.btn} htmlType='submit'>
				{isLoading ? (
					<Preloader width={20} height={20} />
				) : (
					<Text className={s.btn_text} color='white' span>
						Verify code
					</Text>
				)}
			</Button>
		</form>
	)
}
