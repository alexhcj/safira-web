import { useEffect } from 'react'

import { useVerifications } from '@hooks/services/useVerifications'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'

import { ChangeEmailStepperFormCode } from '@components/StepForms/ChangeEmailStepperForms/ChangeEmailStepperFormCode'
import { ChangeEmailStepperFormEmail } from '@components/StepForms/ChangeEmailStepperForms/ChangeEmailStepperFormEmail'
import { ChangeEmailStepperFormPassword } from '@components/StepForms/ChangeEmailStepperForms/ChangeEmailStepperFormPassword'

import { Space } from '@shared/components/UI/Spacing/Space'
import { Stepper } from '@shared/components/UI/Stepper/Stepper'

import { StepperFinish } from '../StepperFinish/StepperFinish'

import CodeSVG from '@assets/svg/code.svg?react'
import EmailSVG from '@assets/svg/email.svg?react'
import ChangeEmailStepperSVG from '@assets/svg/illustrations/change-email-stepper.svg?react'
import PasswordSVG from '@assets/svg/password.svg?react'

import s from './change-email-stepper.module.scss'

const steps = [
	{
		id: 0,
		title: 'Enter new email',
		type: 'new-email',
		icon: <EmailSVG />,
		component: ChangeEmailStepperFormEmail,
	},
	{
		id: 1,
		title: 'Enter code',
		type: 'verify-new-email',
		icon: <CodeSVG />,
		component: ChangeEmailStepperFormCode,
	},
	{
		id: 2,
		title: 'Enter password',
		type: 'validate-password',
		icon: <PasswordSVG />,
		component: ChangeEmailStepperFormPassword,
	},
]

export const ChangeEmailStepper = () => {
	const { changeEmail, verifyNewEmail, validatePassword, isLoading } = useVerifications()
	const [step, setStep] = useLocalStorage('change-email-stepper', { step: 0, email: '' })

	useEffect(() => {
		if (step.step === 'finish') setStep({ step: 0, email: '' })
	}, [])

	const handleSubmit = async (type, value) => {
		switch (type) {
			case 'new-email': {
				const res = await changeEmail(value)

				if (res && res.success && res.statusCode === 200) {
					setStep({ step: 1, email: value.email })
				}
				break
			}

			case 'verify-new-email': {
				const res = await verifyNewEmail(value)

				if (res && res.success && res.statusCode === 200) {
					setStep((prev) => ({ ...prev, step: 2 }))
				}
				break
			}

			case 'validate-password': {
				const res = await validatePassword(value)

				if (res && res.success) {
					setStep({ step: 'finish', email: '' })
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
					{step.step === 'finish' && <StepperFinish title='Email verified successfully!' />}
				</div>
			</div>
			<Space space={70} />
		</section>
	)
}
