import { useState } from 'react'

import { verificationsAPI } from '@api/verifications'

import { useAuthContext } from '@context/AuthContext'
import { useErrorContext } from '@context/ErrorContext'

export function useVerifications() {
	const { updateUserCreds } = useAuthContext()
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const verifyEmail = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await verificationsAPI.verifyEmail(data)

			return {
				success: true,
				code: res,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const changeEmail = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await verificationsAPI.changeEmail(data)

			return {
				success: true,
				...res,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const verifyNewEmail = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await verificationsAPI.verifyNewEmail(data)

			return {
				success: true,
				...res,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const validatePassword = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const { message, statusCode, accessToken } = await verificationsAPI.validatePassword(data)

			updateUserCreds({ accessToken })

			return {
				success: true,
				message,
				statusCode,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const changePassword = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const { statusCode } = await verificationsAPI.changePassword(data)

			return {
				success: true,
				statusCode,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const verifyCode = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const { statusCode } = await verificationsAPI.verifyCode(data)

			return {
				success: true,
				statusCode,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const resetPassword = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const { statusCode } = await verificationsAPI.resetPassword(data)

			return {
				success: true,
				statusCode,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	/**
	 * @param {Object} data
	 * @param {string} data.type - Type of email verification (VERIFY_EMAIL enum)
	 */
	const resendVerifyEmail = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await verificationsAPI.resendVerifyEmail(data)

			return {
				success: true,
				...res,
			}
		} catch (error) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return {
		verifyEmail,
		changeEmail,
		verifyNewEmail,
		validatePassword,
		changePassword,
		verifyCode,
		resetPassword,
		resendVerifyEmail,
		isLoading,
	}
}
