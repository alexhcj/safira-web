import { useState } from 'react'

import { emailerAPI } from '@api/emailer'

import { useErrorContext } from '@context/ErrorContext'

export const useEmailer = () => {
	const { clearErrors } = useErrorContext()
	const [isLoading, setIsLoading] = useState(false)

	const findSubscription = async () => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await emailerAPI.findSubscription()

			return {
				success: true,
				subscription: res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const subscribe = async ({ email }) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await emailerAPI.subscribe({ email })

			return {
				success: true,
				res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const updateSubscription = async (data) => {
		setIsLoading(true)
		try {
			clearErrors()
			const res = await emailerAPI.update(data)

			return {
				success: true,
				res,
			}
		} catch (err) {
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return {
		subscribe,
		findSubscription,
		updateSubscription,
		isLoading,
	}
}
