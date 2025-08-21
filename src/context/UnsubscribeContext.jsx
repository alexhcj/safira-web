import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const UnsubscribeContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useUnsubscribeContext() {
	const context = useContext(UnsubscribeContext)

	if (context === undefined) {
		throw new Error('useUnsubscribeContext must be used within an UnsubscribeStepperProvider')
	}

	return context
}

export const UnsubscribeStepperProvider = ({ children }) => {
	const [unsubscribeContext, setUnsubscribeContext] = useLocalStorage('unsubscribe-stepper', { step: 0 })

	return (
		<UnsubscribeContext.Provider value={{ unsubscribeContext, setUnsubscribeContext }}>
			{children}
		</UnsubscribeContext.Provider>
	)
}
