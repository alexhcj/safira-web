import { useEffect, useState } from 'react'

import { verificationsAPI } from '@api/verifications'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'
import { Space } from '@shared/components/UI/Spacing/Space'
import { Stepper } from '@shared/components/UI/Stepper/Stepper'

import { ChangePasswordStepperCheckMail } from '../../Forms/ChangePasswordStepperForms/ChangePasswordStepperCheckMail'
import { ChangePasswordStepperFormCode } from '../../Forms/ChangePasswordStepperForms/ChangePasswordStepperFormCode'
import { ChangePasswordStepperFormEmail } from '../../Forms/ChangePasswordStepperForms/ChangePasswordStepperFormEmail'
import { ChangePasswordStepperFormPasswords } from '../../Forms/ChangePasswordStepperForms/ChangePasswordStepperFormPasswords'
import { StepperFinish } from '../StepperFinish/StepperFinish'

import { ReactComponent as CodeSVG } from '@assets/svg/code.svg'
import { ReactComponent as EmailLinkSVG } from '@assets/svg/email-link.svg'
import { ReactComponent as EmailSVG } from '@assets/svg/email.svg'
import { ReactComponent as ChangeEmailStepperSVG } from '@assets/svg/illustrations/change-email-stepper.svg'
import { ReactComponent as PasswordSVG } from '@assets/svg/password.svg'

import s from './change-password-stepper.module.scss'

const steps = [
	{
		id: 0,
		title: 'Enter profile email',
		type: 'enter-profile-email',
		icon: <EmailSVG />,
		component: ChangePasswordStepperFormEmail,
	},
	{
		id: 1,
		title: 'Enter code',
		type: 'verify-profile-email',
		icon: <CodeSVG />,
		component: ChangePasswordStepperFormCode,
	},
	{
		id: 2,
		title: 'Click link',
		type: 'check-email-link',
		icon: <EmailLinkSVG />,
		component: ChangePasswordStepperCheckMail,
	},
	{
		id: 3,
		title: 'Enter new password',
		type: 'reset-password',
		icon: <PasswordSVG />,
		component: ChangePasswordStepperFormPasswords,
	},
]

export const ChangePasswordStepper = () => {
	const [step, setStep] = useLocalStorage('change-password-stepper', { step: 0 })
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState({})

	useEffect(() => {
		if (step.step === 'finish') setStep({ step: 0 })
	}, [])

	const handleSubmit = async (type, value) => {
		setIsLoading(true)

		switch (type) {
			case 'enter-profile-email': {
				const res = await verificationsAPI.changePassword(value)

				if (res.statusCode !== 200) {
					setIsLoading(false)
					setError({ message: 'Check is email correct.' })
					break
				}

				setIsLoading(false)
				setStep({ step: 1 })
				break
			}

			case 'verify-profile-email': {
				const res = await verificationsAPI.verifyCode(value)

				if (res.statusCode !== 200) {
					setIsLoading(false)
					setError({ message: res.message })
					break
				}

				setIsLoading(false)
				setStep({ step: 2 })
				break
			}

			case 'reset-password': {
				const res = await verificationsAPI.resetPassword(value)

				if (res.statusCode !== 200) {
					setIsLoading(false)
					setError({ message: res.message })
					break
				}

				setIsLoading(false)
				setStep({ step: 'finish' })
				break
			}

			default: {
				setIsLoading(false)
				setError({ message: 'Something went wrong.' })
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
						<CurrentStepComponent
							onSubmit={handleSubmit}
							type={steps[step.step].type}
							isLoading={isLoading}
							error={error}
						/>
					)}
					{step.step === 'finish' && <StepperFinish title='Password changed successfully!' />}
				</div>
			</div>
			<Space space={70} />
		</section>
	)
}
