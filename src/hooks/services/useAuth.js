import { useCallback, useState } from 'react'

import { authAPI } from '@api/auth'

import { useErrorContext } from '@context/ErrorContext'

/**
 * Pure API-calling layer. Doesn't know about global auth state - just
 * talks to the API and reports { success, data } | { success, error }.
 * The context layer decides what to do with the result.
 *
 * Every returned function is wrapped in useCallback. Without this, a new
 * function identity is created every render, which cascades upward:
 * AuthContext's registerUser/loginUser/etc are useCallback'd too, but with
 * an unstable dependency (these), so THEY get new identities every render
 * as well - silently defeating the whole point of splitting state/actions
 * into separate contexts to avoid unnecessary re-renders.
 *
 * Assumes useErrorContext().clearErrors is itself stable (useCallback'd) -
 * worth double-checking ErrorContext if actionsValue in AuthContext still
 * changes identity every render after this fix.
 */
export function useAuth() {
	const { clearErrors } = useErrorContext()
	const [loading, setLoading] = useState({
		register: false,
		login: false,
		logout: false,
		'logout-all': false,
		refresh: false,
		me: false,
	})

	const request = useCallback(
		async (key, apiCall) => {
			setLoading((prev) => ({ ...prev, [key]: true }))
			try {
				clearErrors()
				const data = await apiCall()
				return { success: true, data }
			} catch (error) {
				return { success: false, error }
			} finally {
				setLoading((prev) => ({ ...prev, [key]: false }))
			}
		},
		[clearErrors],
	)

	const register = useCallback((data) => request('register', () => authAPI.register(data)), [request])
	const login = useCallback((data) => request('login', () => authAPI.login(data)), [request])
	const logout = useCallback(() => request('logout', () => authAPI.logout()), [request])
	const logoutAll = useCallback(() => request('logout-aLl', () => authAPI.logoutAll()), [request])
	// Cookie-guarded (httpOnly refresh token) - this is the reload/bootstrap
	// call, since it's the only credential that survives a page reload.
	const refresh = useCallback(() => request('refresh', () => authAPI.refresh()), [request])
	// Access-token-guarded (JwtAuthGuard) - validates the CURRENT in-memory
	// token and returns fresh profile fields. Not usable for bootstrap.
	const me = useCallback(() => request('me', () => authAPI.me()), [request])

	return {
		register,
		login,
		logout,
		logoutAll,
		refresh,
		me,
		isRegistering: loading.register,
		isLoggingIn: loading.login,
		isLoggingOut: loading.logout,
		isLoggingOutAll: loading.logoutAll,
	}
}
