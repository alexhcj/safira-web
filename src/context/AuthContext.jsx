import { createContext, useContext } from 'react'

import { useLocalStorage } from '@hooks/useLocalStorage.hook'

const AuthContext = createContext(null)

export const useAuthContext = () => useContext(AuthContext)

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
		setState((prev) => ({ ...prev, id: data.id, accessToken: data.accessToken }))
	}

	return (
		<AuthContext.Provider value={{ user: state, login, logout, updateEmailVerifiedStatus, updateUserCreds }}>
			{children}
		</AuthContext.Provider>
	)
}
