import { useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { useProfile } from '@hooks/services/useProfile'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Text } from '@shared/components/UI/Text/Text'

import { hideEmailPartial } from '@utils/index'

import s from './change-password-stepper-form.module.scss'

export const ChangePasswordStepperCheckMail = () => {
	const location = useLocation()
	const { user } = useAuthContext()
	const [step, setStep] = useLocalStorage('change-password-stepper')
	const { profile } = useProfile()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		const params = new URLSearchParams(location.search.slice(1))
		const data = Object.fromEntries(params.entries())

		if (params.size !== 0) {
			if (step.step !== 2) {
				setStep({ step: 0 })
				console.log('Wrong step')
			}

			if (!data.userId || data.userId !== user.id) {
				setStep({ step: 0 })
				console.log('Unauthorized')
				// 	set error
				// send	undo password change request
			}

			if (new Date().getTime() > data.expirationTime) {
				setStep({ step: 0 })
				console.log('Expiration expired')
				// 	set error
				//	send undo password change request
				// 	show reset step button to try again from scratch
			}

			setIsLoading(false)
			setTimeout(() => {
				setStep({ step: 3 })
			}, 1000)
		}
	}, [location.search])

	return (
		<div className={s.form}>
			{Object.keys(profile).length !== 0 && !location.search && (
				<>
					<p className={s.text}>
						We’ve sent <strong>reset password link</strong> to <strong>{hideEmailPartial(profile.email)}</strong> your
						email address. Click this link to reset password.
					</p>
					<Link className={s.check_mail} to='mailto:'>
						<Text className={s.check_mail_text} weight='semi' color='white' span>
							Check Email
						</Text>
					</Link>
				</>
			)}
			{location.search && isLoading && (
				<div className={s.validate}>
					<Preloader width={20} height={20} />
					<div className={s.text}>Validating link</div>
				</div>
			)}
			{location.search && !isLoading && <div className={s.validate_success}>Link is valid!</div>}
		</div>
	)
}
