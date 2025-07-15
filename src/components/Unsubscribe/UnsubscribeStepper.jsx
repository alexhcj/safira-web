import { useUnsubscribeContext } from '@context/UnsubscribeContext'

import { Unsubscribe } from '@components/Unsubscribe/Unsubscribe/Unsubscribe'
import { UnsubscribeFeedback } from '@components/Unsubscribe/UnsubscribeFeedback/UnsubscribeFeedback'
import { UnsubscribeThanks } from '@components/Unsubscribe/UnsubscribeThanks/UnsubscribeThanks'

import s from './unsubscribe-stepper.module.scss'

const steps = [
	{
		step: 0,
		component: Unsubscribe,
	},
	{
		step: 1,
		component: UnsubscribeFeedback,
	},
	{
		step: 2,
		component: UnsubscribeThanks,
	},
]

export const UnsubscribeStepper = () => {
	const { unsubscribeContext } = useUnsubscribeContext()

	const UnsubscribeStepperComponent = steps[unsubscribeContext.step]?.component

	return (
		<div className={s.wrapper}>
			<div className={s.box}>
				<h3 className={s.title}>Unsubscribe</h3>
				<UnsubscribeStepperComponent />
			</div>
		</div>
	)
}
