import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useReducer, useRef } from 'react'

import { configureAuthInterceptors } from '@api/api'

import { useAuth } from '@hooks/services/useAuth'

// Split into two contexts so components that only dispatch actions
// (forms, buttons) don't re-render every time auth state changes.
const AuthStateContext = createContext(null)
const AuthActionsContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useAuthStateContext() {
	const context = useContext(AuthStateContext)

	if (context === null) {
		throw new Error('useAuthState must be used within an AuthProvider')
	}

	return context
}

// Vite HMR - use function declaration instead of arrow function
export function useAuthActionsContext() {
	const context = useContext(AuthActionsContext)

	if (context === null) {
		throw new Error('useAuthActions must be used within an AuthProvider')
	}

	return context
}

const initialState = {
	user: null,
	accessToken: null,
	status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
}

function authReducer(state, action) {
	switch (action.type) {
		case 'auth/loading':
			return { ...state, status: 'loading' }
		case 'auth/success': {
			// register/login/refresh all return { id, accessToken }.
			// Split the token out so it never has to be read as state.user.accessToken.
			const { accessToken, ...user } = action.payload
			return { ...state, user, accessToken, status: 'authenticated' }
		}
		case 'auth/logout':
			return { ...state, user: null, accessToken: null, status: 'unauthenticated' }
		case 'auth/patch':
			// Cheap local profile-field patches only (e.g. after changing
			// email/password) - never routes a token through here.
			return { ...state, user: { ...state.user, ...action.payload } }
		default:
			return state
	}
}

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState)
	const { register, login, refresh, logout, logoutAll, isRegistering, isLoggingIn, isLoggingOut, isLoggingOutAll } =
		useAuth()

	// Lets the axios interceptors (module-level, outside React) always read
	// the latest token/dispatch without this effect needing to re-run - and
	// therefore without ever re-registering the interceptors - every time
	// the token changes.
	const stateRef = useRef(state)
	useEffect(() => {
		stateRef.current = state
	}, [state])

	const hasBootstrapped = useRef(false)

	useEffect(() => {
		configureAuthInterceptors({
			getToken: () => stateRef.current.accessToken,
			refresh,
			onExpired: () => dispatch({ type: 'auth/logout' }),
		})

		if (hasBootstrapped.current) return
		hasBootstrapped.current = true

		// This is the ONLY page-reload recovery path. The access token is
		// in-memory only and never survives a reload - the httpOnly refresh
		// cookie (sent automatically via withCredentials) is what does.
		// Deliberately calling refresh() here, not me(): me() requires an
		// access token that doesn't exist yet at this point.
		const bootstrap = async () => {
			dispatch({ type: 'auth/loading' })
			const res = await refresh()
			dispatch(res.success ? { type: 'auth/success', payload: res.data } : { type: 'auth/logout' })
		}

		bootstrap()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const registerUser = useCallback(
		async (data) => {
			dispatch({ type: 'auth/loading' })
			const res = await register(data)

			if (res.success) dispatch({ type: 'auth/success', payload: res.data })

			return res
		},
		[register],
	)

	const loginUser = useCallback(
		async (data) => {
			dispatch({ type: 'auth/loading' })
			const res = await login(data)

			if (res.success) dispatch({ type: 'auth/success', payload: res.data })

			return res
		},
		[login],
	)

	const logoutUser = useCallback(async () => {
		const res = await logout()

		if (res.success) dispatch({ type: 'auth/logout' })

		return res
	}, [logout])

	const logoutAllUsers = useCallback(async () => {
		const res = await logoutAll()

		if (res.success) dispatch({ type: 'auth/logout' })

		return res
	}, [logoutAll])

	// For cheap local patches, e.g. after changing email/password successfully
	const updateUserCreds = useCallback((data) => {
		dispatch({ type: 'auth/update', payload: data })
	}, [])

	const stateValue = useMemo(
		// accessToken is intentionally NOT exposed here - the interceptor
		// reads it internally via stateRef. Consumers only need to know
		// whether a session exists, never the raw token.
		() => ({ user: state.user, status: state.status, isAuthenticated: Boolean(state.accessToken) }),
		[state],
	)

	const actionsValue = useMemo(
		() => ({
			registerUser,
			loginUser,
			logoutUser,
			logoutAllUsers,
			updateUserCreds,
			isRegistering,
			isLoggingIn,
			isLoggingOut,
			isLoggingOutAll,
		}),
		[
			registerUser,
			loginUser,
			logoutUser,
			logoutAllUsers,
			updateUserCreds,
			isRegistering,
			isLoggingIn,
			isLoggingOut,
			isLoggingOutAll,
		],
	)

	return (
		<AuthStateContext.Provider value={stateValue}>
			<AuthActionsContext.Provider value={actionsValue}>{children}</AuthActionsContext.Provider>
		</AuthStateContext.Provider>
	)
}
