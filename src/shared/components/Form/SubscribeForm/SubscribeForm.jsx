import { useState } from 'react'

import cn from 'classnames'

import { maxLength, pattern, required } from '@/utils'

import { useAuth } from '@hooks/services/useAuth'
import { useEmailer } from '@hooks/services/useEmailer'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import s from './subscribe-form.module.scss'

const subscribeFormValidationSchema = {
	// email: no minLength, pattern min 5 chars
	email: [
		required('Email should be filled.'),
		pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Email should be valid.'),
		maxLength(64, 'Email should be maximum 64 characters.'),
	],
}

/**
 * SubscribeForm form component
 * @returns {JSX.Element}
 * @constructor
 */
export const SubscribeForm = () => {
	const { user } = useAuth()
	const { subscribe, isLoading } = useEmailer()
	const initialFormState = {
		email: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError, resetFieldError } = useFormValidation(form, subscribeFormValidationSchema, {
		validateOnChange: false,
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid(true)) {
			const formData = {
				email: form.email,
			}

			const res = await subscribe(formData)

			if (res && res.success) {
				setForm(initialFormState)
			}
		}
	}

	const handleChange = (e) => {
		!isValid() && resetFieldError('email')
		setForm({ email: e.target.value })
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={s.input}>
				<Input
					className={s.input}
					id='sub-email'
					name='sub-email'
					type='text'
					placeholder='Enter your email'
					value={form['email']}
					handleChange={handleChange}
					error={getFieldError('email')}
				/>
				<Button htmlType='submit' className={cn(s.btn_subscribe, isLoading && s.loading)} type='subscribe'>
					{isLoading ? (
						<Preloader width={20} height={20} />
					) : (
						<Text span color='white'>
							Subscribe
						</Text>
					)}
				</Button>
			</div>
		</form>
	)
}
