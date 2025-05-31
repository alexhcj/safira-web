import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const EmailStepperContext = createContext(null)

export const EmailStepperProvider = ({ children }) => {
	const [step, setStep] = useLocalStorage('change-email-stepper', { step: 0, email: '' })

	return <EmailStepperContext.Provider value={{ step, setStep }}>{children}</EmailStepperContext.Provider>
}

export const useEmailStepperContext = () => useContext(EmailStepperContext)
