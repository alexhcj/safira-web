import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.hook'

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

	return <AuthContext.Provider value={{ user: state, login, logout }}>{children}</AuthContext.Provider>
}
