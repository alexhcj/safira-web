import { UnsubscribeStepperProvider } from '@context/UnsubscribeContext'

import { UnsubscribeStepper } from '@components/Unsubscribe/UnsubscribeStepper'

export const UnsubscribePage = () => {
	return (
		<UnsubscribeStepperProvider>
			<UnsubscribeStepper />
		</UnsubscribeStepperProvider>
	)
}
