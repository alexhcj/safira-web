import React, { useState } from 'react'
import { Input } from '../../shared/components/Form/Input/Input'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { Preloader } from '../../shared/components/common/Preloader/Preloader'
import s from './change-email-stepper-form.module.scss'

export const ChangeEmailStepperFormEmail = ({ type, isLoading, error, onSubmit }) => {
	const [email, setEmail] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(type, { email })
	}

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<p className={s.text}>Enter new email address and we’ll send to it a verification code.</p>
			<Input
				className={s.input}
				type='email'
				id='email'
				value={email}
				handleChange={(e) => setEmail(e.target.value)}
				placeholder='johnsmith99@gmail.com'
				required
				error={error}
			/>
			<Button className={s.btn} htmlType='submit' disabled={isLoading}>
				{isLoading ? (
					<Preloader width={20} height={20} />
				) : (
					<Text className={s.btn_text} color='white' span>
						Send
					</Text>
				)}
			</Button>
		</form>
	)
}
