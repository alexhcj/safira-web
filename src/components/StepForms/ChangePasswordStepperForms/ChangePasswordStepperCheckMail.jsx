import { useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { useProfile } from '@hooks/services/useProfile'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Text } from '@shared/components/UI/Text/Text'

import { hideEmailPartial } from '@utils/string'

import s from './change-password-stepper-form.module.scss'

export const ChangePasswordStepperCheckMail = ({ onSubmit }) => {
	const location = useLocation()
	const { user } = useAuthContext()
	const [step, setStep] = useLocalStorage('change-password-stepper')
	const { profile } = useProfile()
	const [isLoading, setIsLoading] = useState(false)
	// const [linkError, setLinkError] = useState({ isError: true, message: 'Link expired', type: 'expiration' })

	useEffect(() => {
		setIsLoading(true)
		const params = new URLSearchParams(location.search.slice(1))
		const data = Object.fromEntries(params.entries())

		if (params.size !== 0) {
			if (step.step !== 2) {
				setStep({ step: 0 })
				// setLinkError({ isError: true, message: 'Something went wrong', type: 'step' })
				// send	undo password change request
			}

			if (!data.userId || data.userId !== user.id) {
				setStep({ step: 0 })
				// setLinkError({ isError: true, message: 'Unauthorized', type: 'auth' })
				// send	undo password change request
			}

			if (new Date().getTime() > +data.expirationTime) {
				setStep({ step: 0 })
				// setLinkError({ isError: true, message: 'Link expired', type: 'expiration' })
				// send undo password change request
			}

			setIsLoading(false)
			setTimeout(() => {
				onSubmit('on-valid-link')
			}, 1000)
		}
	}, [location.search, setStep, user.id])

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
			{/*{linkError.isError && (*/}
			{/*	<div className={s.validate_failure}>*/}
			{/*		Link is not valid!*/}
			{/*		<br /> {linkError.message}*/}
			{/*	</div>*/}
			{/*)}*/}
		</div>
	)
}
