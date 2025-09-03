import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const EmailStepperContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useEmailStepperContext() {
	const context = useContext(EmailStepperContext)

	if (context === undefined) {
		throw new Error('useEmailStepperContext must be used within an EmailStepperProvider')
	}

	return context
}

export const EmailStepperProvider = ({ children }) => {
	const [step, setStep] = useLocalStorage('change-email-stepper', { step: 0, email: '' })

	return <EmailStepperContext.Provider value={{ step, setStep }}>{children}</EmailStepperContext.Provider>
}
