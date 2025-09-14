import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const ResetPasswordStepperContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useResetPasswordStepperContext() {
	const context = useContext(ResetPasswordStepperContext)

	if (context === undefined) {
		throw new Error('useResetPasswordStepperContext must be used within an ResetPasswordStepperProvider')
	}

	return context
}

export const ResetPasswordStepperProvider = ({ children }) => {
	const [step, setStep] = useLocalStorage('reset-password-stepper', { step: 0, email: '' })

	return (
		<ResetPasswordStepperContext.Provider value={{ step, setStep }}>{children}</ResetPasswordStepperContext.Provider>
	)
}
