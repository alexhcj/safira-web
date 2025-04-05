import { useState } from 'react';
import { useProfile } from '../../hooks/services/useProfile'
import { ResendCode } from '../../components/VerifyEmail/ResendCode/ResendCode'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { Input } from '../../shared/components/Form/Input/Input'
import { Preloader } from '../../shared/components/common/Preloader/Preloader'
import { hideEmailPartial } from '../../utils'
import { VERIFY_EMAIL } from '../../shared/types/api-types'
import s from './change-password-stepper-form.module.scss'

export const ChangePasswordStepperFormCode = ({ type, isLoading, error, onSubmit }) => {
	const { profile } = useProfile()
	const [code, setCode] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(type, { code: +code })
	}

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			{Object.keys(profile).length !== 0 && (
				<p className={s.text}>
					We’ve sent <strong>6-digits</strong> verification code to <strong>{hideEmailPartial(profile.email)}</strong>.
					Enter this code into input to verify that address is yours.
				</p>
			)}
			<Input
				className={s.input_code}
				type='text'
				id='code'
				value={code}
				handleChange={(e) => setCode(e.target.value)}
				placeholder='726482'
				error={error}
			/>
			<ResendCode classNames={s.resend_code} type={VERIFY_EMAIL.CHANGE_PASSWORD} />
			<Button className={s.btn} htmlType='submit' disabled={isLoading}>
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
