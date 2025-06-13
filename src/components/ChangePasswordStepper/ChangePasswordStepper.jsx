import { useEffect } from 'react'

import { useVerifications } from '@hooks/services/useVerifications'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { ChangePasswordStepperCheckMail } from '@components/StepForms/ChangePasswordStepperForms/ChangePasswordStepperCheckMail'
import { ChangePasswordStepperFormCode } from '@components/StepForms/ChangePasswordStepperForms/ChangePasswordStepperFormCode'
import { ChangePasswordStepperFormEmail } from '@components/StepForms/ChangePasswordStepperForms/ChangePasswordStepperFormEmail'
import { ChangePasswordStepperFormPasswords } from '@components/StepForms/ChangePasswordStepperForms/ChangePasswordStepperFormPasswords'

import { Space } from '@shared/components/UI/Spacing/Space'
import { Stepper } from '@shared/components/UI/Stepper/Stepper'

import { StepperFinish } from '../StepperFinish/StepperFinish'

import CodeSVG from '@assets/svg/code.svg?react'
import EmailLinkSVG from '@assets/svg/email-link.svg?react'
import EmailSVG from '@assets/svg/email.svg?react'
import ChangeEmailStepperSVG from '@assets/svg/illustrations/change-email-stepper.svg?react'
import PasswordSVG from '@assets/svg/password.svg?react'

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
	const { changePassword, verifyCode, resetPassword, isLoading } = useVerifications()
	const [step, setStep] = useLocalStorage('change-password-stepper', { step: 0 })

	useEffect(() => {
		if (step.step === 'finish') setStep({ step: 0 })
	}, [])

	const handleSubmit = async (type, value) => {
		switch (type) {
			case 'enter-profile-email': {
				const res = await changePassword(value)

				if (res && res.statusCode === 200) {
					setStep({ step: 1 })
				}
				break
			}

			case 'verify-profile-email': {
				const res = await verifyCode(value)

				if (res && res.statusCode === 200) {
					setStep({ step: 2 })
				}
				break
			}

			case 'on-valid-link': {
				setStep({ step: 3 })
				break
			}

			case 'reset-password': {
				const res = await resetPassword(value)

				if (res && res.statusCode === 200) {
					setStep({ step: 'finish' })
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
					{step.step === 'finish' && <StepperFinish title='Password changed successfully!' />}
				</div>
			</div>
			<Space space={70} />
		</section>
	)
}
