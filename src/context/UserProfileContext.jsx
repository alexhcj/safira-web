import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { useAuthStateContext } from '@context/AuthContext'

import { useProfile } from '@hooks/services/useProfile'

const UserProfileContext = createContext(null)

// Vite HMR - use function declaration instead of arrow function
export function useUserProfileContext() {
	const context = useContext(UserProfileContext)

	if (context === null) {
		throw new Error('useUserProfileContext must be used within an UserProfileProvider')
	}

	return context
}

export const UserProfileProvider = ({ children }) => {
	const { isAuthenticated } = useAuthStateContext()
	const { findProfile, updateProfile, isLoading } = useProfile()
	const [profile, setProfile] = useState(null)

	// Fetch once on login, clear on logout. Nothing else should call
	// refreshProfile on every render — it's only for explicit re-syncs.
	useEffect(() => {
		if (isAuthenticated) {
			refreshProfile()
		} else {
			setProfile(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	const refreshProfile = useCallback(async () => {
		const res = await findProfile()

		if (res.success) setProfile(res.profile)

		return res
	}, [findProfile])

	const saveProfile = useCallback(
		async (data) => {
			const res = await updateProfile(data)

			if (res.success) setProfile((prev) => ({ ...prev, ...res.profile }))

			return res
		},
		[updateProfile],
	)

	// Cheap local merge — e.g. after a verify-email-code flow succeeds and
	// you don't want a full round trip just to flip `emailVerified: true`.
	const patchProfile = useCallback((data) => {
		setProfile((prev) => ({ ...prev, ...data }))
	}, [])

	return (
		<UserProfileContext.Provider
			value={{ profile, refreshProfile, updateProfile: saveProfile, patchProfile, isLoading }}
		>
			{children}
		</UserProfileContext.Provider>
	)
}
