import { useState } from 'react'

import { authAPI } from '@api/auth'

import { useAuthContext } from '@context/AuthContext'
import { useErrorContext } from '@context/ErrorContext'

// TODO: refactor: hooks and context interaction => hooks should use context methods and values and through from self. In hooks data could be transformed | additional handled by errors
export function useAuth() {
	const { login: contextLogin, logout, user } = useAuthContext()
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const register = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await authAPI.register(data)
			contextLogin(res)

			return {
				success: true,
				user: res,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const login = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await authAPI.login(data)
			contextLogin(res)

			return {
				success: true,
				user: res,
				isEmailVerified: res.isEmailVerified,
			}
		} catch (error) {
			// TODO: consider to handle form validation errors. EX: wrong email => mark email field as invalid
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return {
		user,
		register,
		login,
		logout,
		isLoading,
	}
}
