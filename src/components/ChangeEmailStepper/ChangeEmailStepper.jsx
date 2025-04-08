import { useEffect, useState } from 'react'

import { verificationsAPI } from '@api/verifications'
import { useAuthContext } from '@context/AuthContext'
import { useLocalStorage } from '@hooks/useLocalStorage.hook'
import { Space } from '@shared/components/UI/Spacing/Space'
import { Stepper } from '@shared/components/UI/Stepper/Stepper'

import { ChangeEmailStepperFormCode } from '../../Forms/ChangeEmailStepperForms/ChangeEmailStepperFormCode'
import { ChangeEmailStepperFormEmail } from '../../Forms/ChangeEmailStepperForms/ChangeEmailStepperFormEmail'
import { ChangeEmailStepperFormPassword } from '../../Forms/ChangeEmailStepperForms/ChangeEmailStepperFormPassword'
import { StepperFinish } from '../StepperFinish/StepperFinish'

import { ReactComponent as CodeSVG } from '@assets/svg/code.svg'
import { ReactComponent as EmailSVG } from '@assets/svg/email.svg'
import { ReactComponent as ChangeEmailStepperSVG } from '@assets/svg/illustrations/change-email-stepper.svg'
import { ReactComponent as PasswordSVG } from '@assets/svg/password.svg'

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
	const { updateUserCreds } = useAuthContext()
	const [step, setStep] = useLocalStorage('change-email-stepper', { step: 0, email: '' })
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState({})

	useEffect(() => {
		if (step.step === 'finish') setStep({ step: 0, email: '' })
	}, [])

	const handleSubmit = async (type, value) => {
		setIsLoading(true)

		switch (type) {
			case 'new-email': {
				const res = await verificationsAPI.changeEmail(value)

				if (res.statusCode !== 200) {
					setIsLoading(false)
					setError({ message: 'Check is email correct.' })
					break
				}

				setIsLoading(false)
				setStep({ step: 1, email: value.email })
				break
			}

			case 'verify-new-email': {
				const res = await verificationsAPI.verifyNewEmail(value)

				if (res.statusCode !== 200) {
					setIsLoading(false)
					setError({ message: res.message })
					break
				}

				setIsLoading(false)
				setStep((prev) => ({ ...prev, step: 2 }))
				break
			}

			case 'validate-password': {
				const res = await verificationsAPI.validatePassword(value)

				if (res.statusCode !== 200) {
					setIsLoading(false)
					setError({ message: res.message })
					break
				}

				setIsLoading(false)
				setStep({ step: 'finish', email: '' })
				updateUserCreds(res.creds)
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
					{step.step === 'finish' && <StepperFinish title='Email verified successfully!' />}
				</div>
			</div>
			<Space space={70} />
		</section>
	)
}
