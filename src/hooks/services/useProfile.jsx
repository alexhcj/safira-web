import { useState } from 'react'

import { profilesAPI } from '@api/profiles'
import { verificationsAPI } from '@api/verifications'

import { useErrorContext } from '@context/ErrorContext'

export const useProfile = () => {
	const [isLoading, setIsLoading] = useState(true)
	const { clearErrors } = useErrorContext()

	const findProfile = async () => {
		try {
			clearErrors()
			const [profile, emailStatus] = await Promise.all([profilesAPI.findProfile(), verificationsAPI.emailStatus()])

			return {
				success: true,
				profile: {
					...profile,
					...emailStatus,
				},
			}
		} catch (err) {
			return { success: false, err }
		} finally {
			setIsLoading(false)
		}
	}

	const updateProfile = async (data) => {
		try {
			clearErrors()
			const profile = await profilesAPI.update(data)

			return {
				success: true,
				profile,
			}
		} catch (err) {
			return { success: false, err }
		} finally {
			setIsLoading(false)
		}
	}

	return { findProfile, updateProfile, isLoading }
}
