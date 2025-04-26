import { useState } from 'react'

import { useProfile } from '@hooks/services/useProfile'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import { hideEmailPartial } from '@utils/string'

import s from './change-email-stepper-form.module.scss'

export const ChangeEmailStepperFormPassword = ({ type, isLoading, error, onSubmit }) => {
	const { profile } = useProfile()
	const [password, setPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(type, { password })
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
				handleChange={(e) => setPassword(e.target.value)}
				placeholder='********'
				error={error}
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
