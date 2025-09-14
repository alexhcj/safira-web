import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useResetPasswordStepperContext } from '@context/ResetPasswordStepperContext'

import { useVerifications } from '@hooks/services/useVerifications'

import { ResetPasswordStepperCheckMail } from '@components/StepForms/ResetPasswordStepperForm/ResetPasswordStepperCheckMail'
import { ResetPasswordStepperFormEmail } from '@components/StepForms/ResetPasswordStepperForm/ResetPasswordStepperFormEmail'
import { ResetPasswordStepperFormPasswords } from '@components/StepForms/ResetPasswordStepperForm/ResetPasswordStepperFormPasswords'

import { Space } from '@shared/components/UI/Spacing/Space'
import { Stepper } from '@shared/components/UI/Stepper/Stepper'

import { StepperFinish } from '../StepperFinish/StepperFinish'

import EmailLinkSVG from '@assets/svg/email-link.svg?react'
import EmailSVG from '@assets/svg/email.svg?react'
import ChangeEmailStepperSVG from '@assets/svg/illustrations/change-email-stepper.svg?react'
import PasswordSVG from '@assets/svg/password.svg?react'

import s from './reset-password-stepper.module.scss'

const steps = [
	{
		id: 0,
		title: 'Enter profile email',
		type: 'enter-profile-email',
		icon: <EmailSVG />,
		component: ResetPasswordStepperFormEmail,
	},
	{
		id: 1,
		title: 'Click link',
		type: 'check-email-link',
		icon: <EmailLinkSVG />,
		component: ResetPasswordStepperCheckMail,
	},
	{
		id: 2,
		title: 'Enter new password',
		type: 'reset-password',
		icon: <PasswordSVG />,
		component: ResetPasswordStepperFormPasswords,
	},
]

export const ResetPasswordStepper = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { step, setStep } = useResetPasswordStepperContext()
	const { forgotPassword, resetForgotPassword, isLoading } = useVerifications()

	useEffect(() => {
		if (step.step === 'finish') setStep({ step: 0, email: '' })
	}, [])

	useEffect(() => {
		if (step.step === 'finish' && location.search) {
			navigate('/reset-password', { replace: true })
		}
	}, [location.search, navigate, step.step])

	const handleSubmit = async (type, value) => {
		switch (type) {
			case 'enter-profile-email': {
				const res = await forgotPassword(value)

				if (res && res.success && res.statusCode === 200) {
					setStep({ step: 1, email: value.email })
				}
				break
			}

			case 'on-valid-link': {
				setStep((prev) => ({ ...prev, step: 2 }))
				break
			}

			case 'reset-password': {
				const res = await resetForgotPassword(value)

				if (res && res.success && res.statusCode === 200) {
					setStep({ step: 'finish' })
					navigate('/reset-password', { replace: true })
				} else {
					setStep({ step: 0 })
					navigate('/reset-password', { replace: true })
				}
				break
			}

			default: {
				return null
			}
		}
	}

	const CurrentStepComponent = steps[step.step]?.component

	return (
		<section>
			<div className={s.box}>
				<ChangeEmailStepperSVG />
				<div className={s.content}>
					<Stepper data={steps} currentStep={step.step} />
					{CurrentStepComponent && (
						<CurrentStepComponent onSubmit={handleSubmit} type={steps[step.step].type} isLoading={isLoading} />
					)}
					{step.step === 'finish' && <StepperFinish title='Password reset successfully!' showLogin />}
				</div>
			</div>
			<Space space={70} />
		</section>
	)
}
