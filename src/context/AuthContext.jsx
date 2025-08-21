import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const AuthContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useAuthContext() {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}

	return context
}

export const AuthProvider = ({ children }) => {
	const [state, setState] = useLocalStorage('user', null)

	const login = (user) => {
		setState(user)
	}

	const logout = () => {
		setState(null)
	}

	const updateEmailVerifiedStatus = (status) => {
		setState((prev) => ({
			...prev,
			isEmailVerified: status,
		}))
	}

	const updateUserCreds = (data) => {
		setState((prev) => ({ ...prev, ...data }))
	}

	return (
		<AuthContext.Provider value={{ user: state, login, logout, updateEmailVerifiedStatus, updateUserCreds }}>
			{children}
		</AuthContext.Provider>
	)
}
