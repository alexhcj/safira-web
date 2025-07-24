import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const UnsubscribeContext = createContext(null)

export const UnsubscribeStepperProvider = ({ children }) => {
	const [unsubscribeContext, setUnsubscribeContext] = useLocalStorage('unsubscribe-stepper', { step: 0 })

	return (
		<UnsubscribeContext.Provider value={{ unsubscribeContext, setUnsubscribeContext }}>
			{children}
		</UnsubscribeContext.Provider>
	)
}

export const useUnsubscribeContext = () => useContext(UnsubscribeContext)
